import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"] ?? "";

  const decodeduserId = jwt.verify(token, JWT_SECRET);
  if (decodeduserId) {
    // @ts-ignore added a gobal types updated the reqst obj in express
    req.userId = decodeduserId.userId;
    next();
  } else {
    res.status(403).json({
      message: "unauthorized",
    });
  }
};
