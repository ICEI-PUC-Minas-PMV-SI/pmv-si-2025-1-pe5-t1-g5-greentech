import { ZodToExpress } from "@@types/express";
import * as schemas from "@schemas/error-log";
import { unique } from "@schemas/worker";

export type WorkerRequest = ZodToExpress<typeof unique>;
export type LogError = WorkerRequest & ZodToExpress<typeof schemas["errorLog"]>;
