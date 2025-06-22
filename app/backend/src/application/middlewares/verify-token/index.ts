import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "@config/env";

export const authToken = async <
    Req extends Request<any, any, any, any>,
    Res extends Response,
    Next extends NextFunction,
    >(
    req: Req,
    res: Res,
    next: Next,
) => {
    const authHeader = (req.headers as { authorization?: string }).authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    try {
        jwt.verify(token, JWT_SECRET);
        next();
    } catch {
        return res.status(401).json({ message: "Invalid token" });
    }
}
