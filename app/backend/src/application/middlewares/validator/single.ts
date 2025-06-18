/* eslint-disable @typescript-eslint/no-explicit-any */
import ValidationError from "@models/errors/validation";
import { NextFunction, Request, Response } from "express";
import { ZodError, z } from "zod";
import { setUnderscoreParamsProp, setUnderscoreProp } from "./utils";

const validatorSingle = (schema: z.Schema) => <
  Req extends Request<any, any, any, any>,
  Res extends Response,
  Next extends NextFunction,
>(
  req: Req,
  _res: Res,
  next: Next,
) => {
  req.params = setUnderscoreParamsProp(req.params);
  req.body = setUnderscoreProp(req.body);
  req.query = setUnderscoreProp(req.query);

  try {
    const baseData = {
      headers: req.headers,
      params: req.params._,
      body: req.body._,
      query: req.query._,
    };

    const {
      query,
      params,
      body,
      headers,
    } = schema.parse(baseData);

    req.params = { ...req.params, ...params };
    req.body = { ...req.body, ...body };
    req.query = { ...req.query, ...query };
    req.headers = { ...req.headers, ...headers };

    next();
  } catch (error) {
    if (error instanceof ZodError) {
      next(new ValidationError("Erro durante validação de parâmetros", error.issues));
      return;
    }
    next(error);
  }
};

export default validatorSingle;