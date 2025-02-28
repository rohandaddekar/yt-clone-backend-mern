import { Document } from "mongoose";

interface IUserSchema extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
  bannerImage: string;
  bio: string;
  isActive: boolean;
  role: "SUPER_ADMIN" | "USER";
  refreshToken: string;

  // CUSTOM METHODS
  comparePassword(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

export { IUserSchema };
