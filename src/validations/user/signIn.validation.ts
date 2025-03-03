import { body } from "express-validator";

const validateSignIn = [
  body("email")
    .notEmpty()
    .withMessage("Email is required") // Ensure email field is not empty
    .bail() // Stop further validation if empty
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Valid email is required"),
  body("password").notEmpty().trim().withMessage("Password is required"),
];

export default validateSignIn;
