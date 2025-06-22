import { ZodToExpress } from "@@types/express";
import * as schemas from "@schemas/login";

export type LoginRequest = ZodToExpress<typeof schemas["credentials"]>;