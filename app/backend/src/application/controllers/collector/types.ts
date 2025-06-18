import { ZodToExpress } from "@@types/express";
import * as schemas from "@schemas/collector";

export type CollectorRequest = ZodToExpress<typeof schemas["unique"]>;
export type GetVariables = CollectorRequest & ZodToExpress<typeof schemas["getVariables"]>;
