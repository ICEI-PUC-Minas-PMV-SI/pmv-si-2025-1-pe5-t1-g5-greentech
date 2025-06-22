import LoginService from "@services/login";
import { NextFunction, Response } from "express";
import { LoginRequest } from "./types"

export default class LoginController {
  public static async authenticateUser(req: LoginRequest, res: Response, next: NextFunction) {
    try {
      const { body: { credentials } } = req;
      const result = await LoginService.authenticateUser(credentials);

      res.json(result);
    } catch (error) {
      next(error);    
    }
  }
}
