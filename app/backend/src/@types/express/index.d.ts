import { Request } from "express";

import User from "@@types/user";
import { SessionData } from "express-session";
import { z } from "zod";

declare module "express-serve-static-core" {
  interface Request {
    session?: {
      user?: User;
    } & SessionData;
    user: User;
  }
}

export type UnknownRequest = Request<unknown, unknown, unknown, unknown>;

interface BaseRequest {
  headers?: unknown,
  params?: unknown,
  body?: unknown,
  query?: unknown,
}

// aceitar objetos Zod com métodos .transform e .or
type AllowedZodTypes =
  | z.AnyZodObject
  | z.ZodEffects<z.AnyZodObject>
  | z.ZodUnion<z.ZodObject>
  | z.ZodIntersection<z.ZodObject, z.ZodObject>
  | z.ZodArray<z.AnyZodObject>;

type RequestSchema = z.ZodObject<Partial<{
  params: AllowedZodTypes;
  body: AllowedZodTypes;
  query: AllowedZodTypes;
}>>;

type OriginalData<D> = { _: D };

export type ZodToExpress<S extends RequestSchema> =
  Request<
  z.output<S>["params"] & OriginalData<z.input<S>["params"]>,
  unknown,
  z.output<S>["body"] & OriginalData<z.input<S>["body"]>,
  z.output<S>["query"] & OriginalData<z.input<S>["query"]>
  >;