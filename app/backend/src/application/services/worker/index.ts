import prisma from "@database/postgresql";
import { Worker } from "@prisma/client";

export default class WorkerService {
  public static getCollectors(workerId: Worker["id"]) {
    return prisma.collector.findMany({ where: { workerId }});
  }

  public static async getConfigVersion(workerId: Worker["id"]) {
    const worker = await prisma.worker.findFirstOrThrow({
      select: { configVersion: true },
      where: { id: workerId }
    });

    return { version: worker.configVersion };
  }
}