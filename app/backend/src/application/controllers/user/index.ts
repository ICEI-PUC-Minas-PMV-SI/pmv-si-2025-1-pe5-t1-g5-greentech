import UserService from "@services/user";
import { NextFunction, Response } from "express";
import { CreateRequest, UpdateRequest, UniqueRequest, } from "./types"

export default class UserController {
  public static async get(req: UniqueRequest, res: Response, next: NextFunction) {
    try {
      const { params: { userId } } = req;
      const result = await UserService.get(userId);
      res.json(result);
    } catch (error) {
      next(error);    
    }
  }

  public static async getAll(_: UniqueRequest, res: Response, next: NextFunction) {
    try {
      const result = await UserService.getAll();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  public static async update(req: UpdateRequest, res: Response, next: NextFunction) {
    try {
      const { params: { userId }, body: { user } } = req;
      const result = await UserService.update(userId, user);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  public static async remove(req: UniqueRequest, res: Response, next: NextFunction) {
    try {
      const { params: { userId } } = req;
      const result = await UserService.remove(userId);
      res.json(result);
    } catch (error) {
      next(error);    
    }
  }

  public static async create(req: CreateRequest, res: Response, next: NextFunction) {
    try {
      const { body: { user } } = req;
      const result = await UserService.create(user);
      res.json(result);
    } catch (error) {
      next(error);    
    }
  }
}
