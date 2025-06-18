import cors from "cors";
import express from "express";

import { ALLOWED_ORIGINS } from "@config/env";

import { app } from "./http";

import errorHandler from "@middlewares/errors/handler";
import errorLogger from "@middlewares/errors/logger";

import routes from "./routes";

app
  .use(
    cors({
      origin: ALLOWED_ORIGINS,
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type"],
      credentials: true,
    }),
  )
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use("/api/v1/greentech/crud-func", routes)
  .use(errorLogger)
  .use(errorHandler);