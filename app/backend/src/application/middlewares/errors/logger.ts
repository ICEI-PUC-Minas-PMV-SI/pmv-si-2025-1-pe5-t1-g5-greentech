import { NextFunction, Request, Response } from "express";

export default function errorLogger<Req extends Request, Res extends Response>(
  error: unknown,
  req: Req,
  _res: Res,
  next: NextFunction,
) {
  console.warn("ERROR: ", error);
  console.warn("URL: ", req.url);
  console.warn("PARAMS PARAMS:", req.params);
  console.warn("BODY PARAMS:", req.body);
  console.warn("QUERY PARAMS:", req.query);
  next(error);
}