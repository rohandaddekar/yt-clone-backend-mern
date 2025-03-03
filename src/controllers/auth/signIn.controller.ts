import User from "../../models/user.model";
import createHttpError from "http-errors";
import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

const signIn = async (req: Request, res: Response, next: NextFunction) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return next(
      createHttpError(400, {
        message: "All fields are required",
        errors: validationErrors.array(),
      })
    );
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(
        createHttpError(400, {
          message: "Invalid credentials",
        })
      );
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return next(
        createHttpError(400, {
          message: "Invalid credentials",
        })
      );
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    res
      .status(200)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json({
        success: true,
        message: "Sign In successful",
        data: {
          ...user.toObject(),
          accessToken,
        },
      });
  } catch (error) {
    console.error("Failed to Sign In: ", error);
    next(
      createHttpError(500, {
        message: "Failed to Sign In",
      })
    );
  }
};

export default signIn;
