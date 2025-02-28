import createHttpError from "http-errors";
import User from "../../models/user.model";
import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import fileUploadToCloudinary from "../../utils/fileUploadToCloudinary";

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

  const { firstName, lastName, email, password, bio, isActive } = req.body;

  try {
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return next(
        createHttpError(400, {
          message: "User already exist",
        })
      );
    }

    let avatarUrl = "";
    let bannerImageUrl = "";

    if (req.files && "avatar" in req.files) {
      const file = req.files.avatar[0];

      const avatarFile = await fileUploadToCloudinary({
        file,
        folder: "youtube-clone-mern/avatars",
      });

      avatarUrl = avatarFile?.secure_url;
    }

    if (req.files && "bannerImage" in req.files) {
      const file = req.files.bannerImage[0];

      const bannerImageFile = await fileUploadToCloudinary({
        file,
        folder: "youtube-clone-mern/banner-images",
      });

      bannerImageUrl = bannerImageFile?.secure_url;
    }

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      avatar: avatarUrl,
      bannerImage: bannerImageUrl,
      bio,
      isActive: isActive ?? true,
    });

    const accessToken = newUser.generateAccessToken();
    const refreshToken = newUser.generateRefreshToken();

    newUser.refreshToken = refreshToken;
    await newUser.save();

    res
      .status(201)
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
        message: "User created successfully",
        data: {
          user: newUser,
          accessToken,
          refreshToken,
        },
      });
  } catch (error) {
    console.error("Failed to sign up: ", error);
    next(createHttpError(500, "Failed to sign up"));
  }
};

export default signUp;
