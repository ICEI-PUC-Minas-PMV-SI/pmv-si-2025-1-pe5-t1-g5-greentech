import { Router } from "express";
import LoginRouter from "@routes/login";
import UserRouter from "@routes/user";

const routes = Router({ mergeParams: true })
  .use("/login", LoginRouter)
  .use("/user", UserRouter);

export default routes;