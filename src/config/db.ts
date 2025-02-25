import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Successfully connected to DB");
  } catch (error) {
    console.log("Failed to connect to database: ", error);
    process.exit(1);
  }
};

export default connectDB;
