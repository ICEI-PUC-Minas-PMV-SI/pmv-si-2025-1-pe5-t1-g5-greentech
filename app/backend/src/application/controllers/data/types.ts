import { ZodToExpress } from "@@types/express";
import * as schemas from "@schemas/data";

export type CollectorRequest = ZodToExpress<typeof schemas["unique"]>;
export type PostData = CollectorRequest & ZodToExpress<typeof schemas["postData"]>;
