import prisma from "@database/postgresql";
import { Collector } from "@prisma/client";

export default class CollectorService {
  public static getVariables(collectorId: Collector["id"]) {
    return prisma.variable.findMany({
      where: {
        collectorId,
        // excluded: false,
      },
    });
  }
}