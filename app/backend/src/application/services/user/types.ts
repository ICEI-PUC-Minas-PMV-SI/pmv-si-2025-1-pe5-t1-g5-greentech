import * as schemas from "@schemas/user";
import z from "zod";

export type CreateUser = z.infer<typeof schemas["create"]>["body"]["user"];
export type UpdateUser = z.infer<typeof schemas["update"]>["body"]["user"];
