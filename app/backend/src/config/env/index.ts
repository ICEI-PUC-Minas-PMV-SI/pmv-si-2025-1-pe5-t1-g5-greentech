import { envConfig } from "@utils/env";
import { z } from "zod";

export const {
  PORT,
  DEVELOPMENT,
  ALLOWED_ORIGINS,
} = envConfig({
  PORT: ["PORT", z.coerce.number().int().min(1000).parse],
  DEVELOPMENT: ["NODE_ENV",
    z.enum(["production", "development"])
      .default("development")
      .transform((value) => value === "development")
      .parse,
  ],
  ALLOWED_ORIGINS: ["ALLOWED_ORIGINS",
    z.string()
      .regex(/^(\S\s{0,1})+$/)
      .transform((value) => value.split(" "))
      .parse,
  ],
});
