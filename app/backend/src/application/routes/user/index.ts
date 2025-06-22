import LoginController from "@controllers/login";
import validator from "@middlewares/validator";
import { verifyToken } from "@middlewares/verify-token";
import { credentials } from "@schemas/login";
import { Router } from "express";

const UserRouter = Router({ mergeParams: true })
    .get("/", verifyToken, validator(credentials), LoginController.authenticateUser);

export default UserRouter;