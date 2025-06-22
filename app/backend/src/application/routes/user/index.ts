import UserController from "@controllers/user";
import validator from "@middlewares/validator";
import validatorSingle from "@middlewares/validator/single";
import { verifyToken } from "@middlewares/verify-token";
import { unique, update, create } from "@schemas/user";
import { Router } from "express";

const UniqueRouter = Router({ mergeParams: true })
    .get("/", validator(unique), UserController.get)
    .delete("/", validator(unique), UserController.remove)
    .put("/", validator(update), UserController.update);

const UserRouter = Router({ mergeParams: true })
    // .use(verifyToken)
    .param("userId", validatorSingle(unique))
    .use("/:userId", UniqueRouter)
    .get("/", UserController.getAll)
    .post("/", validator(create), UserController.create);

export default UserRouter;