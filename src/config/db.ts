import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Successfully connected to DB");
    });

    mongoose.connection.on("error", (error) => {
      console.error("Failed to connect to DB: ", error);
    });

    await mongoose.connect(process.env.MONGO_URI as string);
  } catch (error) {
    console.error("Failed to connect to DB: ", error);
    process.exit(1);
  }
};

export default connectDB;
