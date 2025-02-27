import { Router } from "express";
import upload from "../../config/multer";
import signUp from "../../controllers/user/signUp.controller";
import validateSignUp from "../../validations/auth/signUp.validation";

const authRoutes = Router();

authRoutes.post(
  "/sign-up",
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "bannerImage",
      maxCount: 1,
    },
  ]),
  validateSignUp,
  signUp
);

export default authRoutes;
