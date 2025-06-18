import ErrorLogService from "@services/error-log";
import { NextFunction, Response } from "express";
import { LogError } from "./types";

export default class WorkerAuthController {
  public static async logError(req: LogError, res: Response, next: NextFunction) {
    try {
      const { 
        params: { workerId },
        body: data,
      } = req;
      const log = await ErrorLogService.logError({ workerId, ...data });
      res.json(log);
    } catch (error) {
      next(error);
    }
  }
}