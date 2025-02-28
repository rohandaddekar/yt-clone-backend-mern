import { Router } from "express";
import upload from "../../config/multer";
import signUp from "../../controllers/user/signUp.controller";
import signIn from "../../controllers/user/signIn.controller";
import validateSignUp from "../../validations/auth/signUp.validation";
import validateSignIn from "../../validations/auth/signIn.validation";

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

authRoutes.post("/sign-in", validateSignIn, signIn);

export default authRoutes;
