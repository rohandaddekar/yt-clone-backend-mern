import createHttpError from "http-errors";
import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      createHttpError(400, {
        message: "All fields are required",
        errors: errors.array(),
      })
    );
  }

  try {
    const { firstName, lastName, email, username, password } = req.body;

    res.status(200).json({ message: "User signed up successfully" });
  } catch (error) {
    console.error("Failed to sign up: ", error);
  }
};

export default signUp;
