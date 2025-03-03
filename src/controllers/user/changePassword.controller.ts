import createHttpError from "http-errors";
import User from "../../models/user.model";
import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import sendApiResponse from "../../utils/sendApiResponse";

const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return next(
      createHttpError(400, "All fields are required", {
        errors: validationErrors.array(),
      })
    );
  }

  const { oldPassword, newPassword } = req.body;

  try {
    // FIND USER BY USER ID
    const user = await User.findById(req.user?._id);
    if (!user) return next(createHttpError(400, "User not found"));

    // MATCH OLD PASSWORD
    const isPasswordMatch = await user.comparePassword(oldPassword);
    if (!isPasswordMatch)
      return next(createHttpError(400, "Old password is incorrect"));

    // UPDATE NEW PASSWORD
    user.password = newPassword;
    await user.save();

    sendApiResponse(res, {
      success: true,
      statusCode: 200,
      message: "Password changed successfully",
      data: user,
    });
  } catch (error) {
    console.error("Failed to change password: ", error);
    next(createHttpError(500, "Failed to change password"));
  }
};

export default changePassword;
