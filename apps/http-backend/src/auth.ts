import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"] ?? "";
  const decoded = jwt.verify(token, JWT_SECRET);
  if (decoded) {
    // @ts-ignore added a gobal types updated the reqst obj in express
    req.userId = decodeduserId;
    next();
  } else {
    res.status(403).json({
      message: "unauthorized",
    });
  }
};
