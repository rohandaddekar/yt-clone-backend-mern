import jwt from "jsonwebtoken";
import User from "../models/user.model";
import createHttpError from "http-errors";
import { IUserSchema } from "../types/user";
import { IJwtPayload } from "../types/jwt";
import { NextFunction, Request, Response } from "express";

declare module "express" {
  interface Request {
    user?: IUserSchema;
  }
}

const authMiddleware = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  try {
    const accessToken =
      req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
    if (!accessToken) return next(createHttpError(401, "Unauthorized"));

    const decodedAccessToken = jwt.verify(
      accessToken,
      process.env.JWT_SECRET as string
    ) as IJwtPayload;
    if (!decodedAccessToken)
      return next(createHttpError(401, "Invalid Access Token"));

    const user = await User.findById(decodedAccessToken._id);
    if (!user) return next(createHttpError(401, "User not found"));

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);

    if (error instanceof jwt.JsonWebTokenError)
      return next(createHttpError(401, "Invalid or expired token"));

    next(createHttpError(500, "Authentication failed"));
  }
};

export default authMiddleware;
