import { body } from "express-validator";

const validateChangePassword = [
  body("oldPassword")
    .notEmpty()
    .withMessage("Old Password is required")
    .trim()
    .withMessage("Old Password is required"),
  body("newPassword")
    .notEmpty()
    .withMessage("New Password is required")
    .bail()
    .isLength({ min: 6 })
    .trim()
    .withMessage("New Password must be at least 6 characters long"),
];

export default validateChangePassword;
