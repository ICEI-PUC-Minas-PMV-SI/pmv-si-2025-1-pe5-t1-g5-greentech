import WorkerController from "@controllers/worker";
import validator from "@middlewares/validator";
import validatorSingle from "@middlewares/validator/single";
import { unique } from "@schemas/worker";
import { Router } from "express";
import ErrorLogRouter from "@routes/error-log";

const UniqueRouter = Router({ mergeParams: true })
  .get("/", validator(unique), WorkerController.getCollectors)
  .get("/config-version", validator(unique), WorkerController.getConfigVersion)
  .use("/error-log", ErrorLogRouter);

const WorkerRouter = Router({ mergeParams: true })
  .param("workerId", validatorSingle(unique))
  .use("/:workerId", UniqueRouter);

export default WorkerRouter;