import CollectorService from "@services/collector";
import { NextFunction, Response } from "express";
import { GetVariables } from "./types";

export default class CollectorController {
  public static async getVariables(req: GetVariables, res: Response, next: NextFunction) {
    try {
      const { params: { collectorId } } = req;
      const variables = await CollectorService.getVariables(collectorId);
      res.json(variables);
    } catch (error) {
      next(error);
    }
  }
}