import { model, Schema } from "mongoose";
import { IUserSchema } from "../types/user";

const schema = new Schema<IUserSchema>(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

const User = model<IUserSchema>("User", schema);
export default User;
