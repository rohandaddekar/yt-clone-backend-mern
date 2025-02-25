import { Router } from "express";
import signUp from "../../controllers/user/signUp.controller";
import validateSignUp from "../../validations/auth/signUp.validation";

const userRouter = Router();

userRouter.post("/sign-up", validateSignUp, signUp);

export default userRouter;
