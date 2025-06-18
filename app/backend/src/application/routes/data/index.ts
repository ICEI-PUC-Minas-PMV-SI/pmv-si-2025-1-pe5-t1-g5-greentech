import DataController from "@controllers/data";
import validator from "@middlewares/validator";
import validatorSingle from "@middlewares/validator/single";
import { unique, postData } from "@schemas/data";
import { Router } from "express";

const UniqueRouter = Router({ mergeParams: true })
  .post("/", validator(postData), DataController.receiveData);

const DataRouter = Router({ mergeParams: true })
  .param("collectorId", validatorSingle(unique))
  .use("/:collectorId", UniqueRouter);

export default DataRouter;