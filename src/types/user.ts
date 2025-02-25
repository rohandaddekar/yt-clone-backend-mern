import { Document } from "mongoose";

interface IUserSchema extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

export { IUserSchema };
