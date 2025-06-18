import WorkerService from "@services/worker";
import { NextFunction, Response } from "express";
import { GetCollectors, GetConfigVersion } from "./types";

export default class WorkerController {
  public static async getCollectors(req: GetCollectors, res: Response, next: NextFunction) {
    try {
      const { params: { workerId } } = req;
      console.log(workerId);
      res.json({msg:"caraca resposta legal"});
    } catch (error) {
      next(error);    
    }
  }

  public static async getConfigVersion (req: GetConfigVersion, res: Response, next: NextFunction) {
    try {
      const { params: { workerId } } = req;
      const configVersion = await WorkerService.getConfigVersion(workerId);

      res.json(configVersion);
    } catch (error) {
      next(error);
    }
  }
}