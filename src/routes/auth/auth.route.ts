import { Router } from "express";
import upload from "../../config/multer";
import signUp from "../../controllers/auth/signUp.controller";
import signIn from "../../controllers/auth/signIn.controller";
import authMiddleware from "../../middlewares/auth.middleware";
import signOut from "../../controllers/auth/signOut.controller";
import validateSignUp from "../../validations/auth/signUp.validation";
import validateSignIn from "../../validations/auth/signIn.validation";
import refreshToken from "../../controllers/auth/refreshToken.controller";

const authRoutes = Router();

// PUBLIC ROUTES
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

authRoutes.post("/refresh-token", refreshToken);

// PROTECTED ROUTES
authRoutes.post("/sign-out", authMiddleware, signOut);

export default authRoutes;
