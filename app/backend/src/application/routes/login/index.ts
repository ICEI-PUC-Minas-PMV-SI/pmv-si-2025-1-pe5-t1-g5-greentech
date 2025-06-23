import LoginController from "@controllers/login";
import validator from "@middlewares/validator";
import { loginRateLimiter } from "@middlewares/login-rate-limit";
import { credentials } from "@schemas/login";
import { Router } from "express";

const LoginRouter = Router({ mergeParams: true })
    .use(loginRateLimiter)
    .post("/", validator(credentials), LoginController.authenticateUser);

export default LoginRouter;