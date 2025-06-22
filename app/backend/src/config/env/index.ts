import { envConfig } from "@utils/env";
import { z } from "zod";

const expirationSchema = z.custom<`${number}${"s" | "m" | "h" | "d"}`>((val) => {
  return typeof val === "string" && /^\d+[smhd]$/.test(val);
}, "Invalid JWT expiration");

export const {
  PORT,
  ALLOWED_ORIGINS,
  JWT_SECRET,
  JWT_EXPIRATION,
} = envConfig({
  PORT: ["PORT", z.coerce.number().int().min(1000).parse],
  ALLOWED_ORIGINS: [
    "ALLOWED_ORIGINS",
    z
      .string()
      .regex(/^(\S\s{0,1})+$/)
      .transform((value) => value.split(" "))
      .parse,
  ],
  JWT_SECRET: [
    "JWT_SECRET",
    z.string().min(10, "JWT_SECRET must be at least 10 characters long").parse,
  ],
  JWT_EXPIRATION: ["JWT_EXPIRATION", expirationSchema.parse],
});
