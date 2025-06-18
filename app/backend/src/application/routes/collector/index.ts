import CollectorController from "@controllers/collector";
import validator from "@middlewares/validator";
import validatorSingle from "@middlewares/validator/single";
import { unique } from "@schemas/collector";
import { Router } from "express";

const UniqueRouter = Router({ mergeParams: true })
  .get("/variables", validator(unique), CollectorController.getVariables);

const CollectorRouter = Router({ mergeParams: true })
  .param("collectorId", validatorSingle(unique))
  .use("/:collectorId", UniqueRouter);

export default CollectorRouter;