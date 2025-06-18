import { ZodToExpress } from "@@types/express";
import * as schemas from "@schemas/worker";

export type WorkerRequest = ZodToExpress<typeof schemas["unique"]>;
export type GetCollectors = WorkerRequest & ZodToExpress<typeof schemas["getCollectors"]>;
export type GetConfigVersion = WorkerRequest & ZodToExpress<typeof schemas["getConfigVersion"]>;
