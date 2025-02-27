import bcrypt from "bcryptjs";
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
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dgkkdtamu/image/upload/v1740648029/youtube-clone-mern/default/avatar.png",
    },
    bannerImage: {
      type: String,
      default:
        "https://res.cloudinary.com/dgkkdtamu/image/upload/v1740647990/youtube-clone-mern/default/banner_image.jpg",
    },
    bio: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// HASH PASSWORD BEFORE SAVING
schema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// REMOVE PASSWORD FROM RESPONSE
schema.set("toJSON", {
  transform: (_doc, ret) => {
    delete ret.password;
    return ret;
  },
});

const User = model<IUserSchema>("User", schema);
export default User;
