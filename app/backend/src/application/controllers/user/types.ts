import { ZodToExpress } from "@@types/express";
import * as schemas from "@schemas/user";

export type UniqueRequest = ZodToExpress<typeof schemas["unique"]>;
export type CreateRequest = ZodToExpress<typeof schemas["create"]>;
export type UpdateRequest = UniqueRequest & ZodToExpress<typeof schemas["update"]>;