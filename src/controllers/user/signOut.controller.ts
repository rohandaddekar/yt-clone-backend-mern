import createHttpError from "http-errors";
import { NextFunction, Request, Response } from "express";

const signOut = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (!user) return next(createHttpError(401, "Unauthorized"));

    user.refreshToken = undefined;
    await user.save();

    res
      .status(200)
      .clearCookie("accessToken", { httpOnly: true, secure: true })
      .clearCookie("refreshToken", { httpOnly: true, secure: true })
      .json({ success: true, message: "Signed out successfully" });
  } catch (error) {
    console.error("Failed to sign out: ", error);
    next(createHttpError(500, "Failed to sign out"));
  }
};

export default signOut;
