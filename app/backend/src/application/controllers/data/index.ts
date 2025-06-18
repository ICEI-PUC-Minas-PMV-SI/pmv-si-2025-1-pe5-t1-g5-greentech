import DataService from "@services/data";
import { NextFunction, Response } from "express";
import { PostData } from "./types";

export default class DataController {
  public static async receiveData(req: PostData, res: Response, next: NextFunction) {
    try {
      const { 
        params: { collectorId },
        body: { reads },
      } = req;

      const response = await DataService.receiveData(collectorId, reads);
      res.status(response.status).json({ message: response.message });
    } catch (error) {
      next(error);
    }
  }
}