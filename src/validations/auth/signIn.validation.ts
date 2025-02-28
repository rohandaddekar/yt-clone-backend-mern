import { body } from "express-validator";

const validateSignIn = [
  body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Valid email is required"),

  body("password").notEmpty().trim().withMessage("Password is required"),
];

export default validateSignIn;
