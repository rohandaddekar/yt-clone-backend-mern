import { HttpError } from "http-errors";
import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const success = false;
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  const errors = err.errors || [];
  const errorStack =
    process.env.NODE_ENV === "development" ? err.stack : undefined;

  res.status(statusCode).json({
    success,
    message,
    errors,
    errorStack,
  });
};

export default globalErrorHandler;
