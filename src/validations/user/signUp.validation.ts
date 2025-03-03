import { body } from "express-validator";

const validateSignUp = [
  body("firstName").trim().notEmpty().withMessage("First name is required"),
  body("lastName").trim().notEmpty().withMessage("Last name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required") // Ensure email field is not empty
    .bail() // Stop further validation if empty
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Valid email is required"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 6 })
    .trim()
    .withMessage("Password must be at least 6 characters long"),
  body("bio").optional().trim(),
  body("isActive").optional().isBoolean(),
];

export default validateSignUp;
