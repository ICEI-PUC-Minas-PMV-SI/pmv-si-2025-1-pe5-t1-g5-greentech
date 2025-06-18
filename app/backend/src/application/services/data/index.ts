import prisma from "@database/postgresql";
import { $Enums, Collector } from "@prisma/client";
import { Reads } from "./types";

export default class DataService {
  public static async receiveData(collectorId: Collector["id"], readData: Reads) {
    const collector = await prisma.collector.findFirst({ where: { id: collectorId } });

    if (!collector) {
      return {
        status: 404,
        message: "Collector not found",
      };
    }

    if (!readData || readData.length === 0) {
      return {
        status: 400,
        message: "Read data cannot be empty",
      };
    }

    const { failure, type, failures } = await DataService.validateReading(collectorId, readData);

    if (failure) {
      switch (type) {
        case "machine":
          return {
            status: 400,
            message: `Provided machine IDs do not belong to this collector. Invalid machine IDs found: ${failures.join(", ")}`,
          };
        case "name":
          return {
            status: 400,
            message: `Provided variable names do not belong to this collector. Invalid variable names found: ${failures.join(", ")}`,
          };
        case "type":
          return {
            status: 400,
            message: `Provided variable value does not match its expected data type. Invalid types found for the following variables: ${failures.join(", ")}`,
          };
        default:
          return {
            status: 400,
            message: "Provided data was considered invalid, but the reason associated with this case is not mapped.",
          };
      }
    }

    await DataService.persistData(collectorId, readData);

    return {
      status: 200,
      message: "Data received successfully",
    };
  }

  private static async persistData(collectorId: Collector["id"], readData: Reads) {
    readData.forEach(async (read) => {
      await prisma.data.create({
        data: {
          variable: read.var,
          value: `${read.value}`,
          timestamp: read.timestamp,
          machineId: read.machine,
          collectorId,
        },
      });
    });
  }

  private static async validateReading(collectorId: Collector["id"], readData: Reads) {
    const variables = await prisma.variable.findMany({
      select: {
        machineId: true,
        name: true,
        dataType: true,
      },
      where: {
        collectorId
      }
    });

    const validMachineIds = new Set<number>(variables.map(variable => variable.machineId));
    const { failureMachine, failedMachineIds } = DataService.validateMachineIds(validMachineIds, readData);
    if (failureMachine) return { failure: true, type: "machine", failures: failedMachineIds };
    
    const validVarNames = new Set<string>(variables.map(variable => variable.name));
    const { failureVarName, failedVarNames } = DataService.validateVarNames(validVarNames, readData);
    if (failureVarName) return { failure: true, type: "name", failures: failedVarNames };
    
    const validVarTypes: Record<string, $Enums.VariableDataType> = Object.fromEntries(variables.map(variable => [variable.name, variable.dataType]));
    const { failureVarType, failedVarTypes } = DataService.validateVarTypes(validVarTypes, readData);
    if (failureVarType) return { failure: true, type: "type", failures: failedVarTypes };
    
    return { failure: false, type: "", failures: [] };
  }

  private static validateMachineIds(ids: Set<number>, readData: Reads) {
    let failureMachine = false;
    const failedMachineIds: number[] = [];

    for (const read of readData) {
      const { machine } = read;
      if (!ids.has(machine)) {
        failureMachine = true;
        failedMachineIds.push(machine);
      }
    }

    return { failureMachine, failedMachineIds };
  }

  private static validateVarNames(validVarNames: Set<string>, readData: Reads) {
    let failureVarName = false;
    const failedVarNames: string[] = [];

    for (const read of readData) {
      const { var: variableName } = read;
      if (!validVarNames.has(variableName)) {
        failureVarName = true;
        failedVarNames.push(variableName);
      }
    }

    return { failureVarName, failedVarNames };
  }

  private static validateVarTypes(validVarTypes: Record<string, $Enums.VariableDataType>, readData: Reads) {
    let failureVarType = false;
    const failedVarTypes: string[] = [];

    for (const read of readData) {
      const { var: variableName, value: variableValue } = read;
      const expectedType = DataService.mapPlcType(validVarTypes[variableName]);
      const actualType = typeof variableValue;

      if (expectedType && actualType !== expectedType) {
        failureVarType = true;
        failedVarTypes.push(`Var: ${variableName}, Expected type: ${validVarTypes[variableName]}, Received: ${actualType}`);
      }
    }

    return { failureVarType, failedVarTypes };
  }

  private static mapPlcType(type: $Enums.VariableDataType): string {
    return type === "String" ? "string" : "number";
  }
}
