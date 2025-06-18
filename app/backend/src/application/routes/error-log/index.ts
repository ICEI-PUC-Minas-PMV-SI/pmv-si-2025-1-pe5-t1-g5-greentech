import ErrorLogController from "@controllers/error-log";
import validator from "@middlewares/validator";
import { errorLog } from "@schemas/error-log";
import { Router } from "express";

const ErrorLogRouter = Router({ mergeParams: true })
  .post("/", validator(errorLog), ErrorLogController.logError);

export default ErrorLogRouter;