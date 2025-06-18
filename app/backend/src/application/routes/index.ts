import { Router } from "express";
import TesteRouter from "./teste";
import CollectorRouter from "./collector";
import WorkerRouter from "./worker";
import DataRouter from "./data";

const routes = Router({ mergeParams: true })
  .use("/teste", TesteRouter)
  .use("/collector", CollectorRouter)
  .use("/worker", WorkerRouter)
  .use("/data", DataRouter);

export default routes;