import prisma from "@database/postgresql";
import { LogData } from "./types";
import { create } from "@schemas/error-log";

export default class ErrorLogService {
  public static async logError(logData: LogData) {
    const { ...data } = create.parse(logData);
    return await prisma.workerErrorLog.create({ data });
  }
}