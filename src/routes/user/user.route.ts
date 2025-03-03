import { Router } from "express";
import upload from "../../config/multer";
import signUp from "../../controllers/user/signUp.controller";
import signIn from "../../controllers/user/signIn.controller";
import authMiddleware from "../../middlewares/auth.middleware";
import signOut from "../../controllers/user/signOut.controller";
import validateSignUp from "../../validations/user/signUp.validation";
import validateSignIn from "../../validations/user/signIn.validation";
import refreshToken from "../../controllers/user/refreshToken.controller";
import changePassword from "../../controllers/user/changePassword.controller";
import validateChangePassword from "../../validations/user/changePassword.validation";

const userRoutes = Router();

// PUBLIC ROUTES
userRoutes.post(
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

userRoutes.post("/sign-in", validateSignIn, signIn);

userRoutes.post("/refresh-token", refreshToken);

// PROTECTED ROUTES
userRoutes.post("/sign-out", authMiddleware, signOut);

userRoutes.post(
  "/change-password",
  authMiddleware,
  validateChangePassword,
  changePassword
);

export default userRoutes;
