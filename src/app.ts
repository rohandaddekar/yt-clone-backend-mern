import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db";
import apiRoutes from "./routes/routes";
import { v2 as cloudinary } from "cloudinary";
import globalErrorHandler from "./middlewares/globalErrorHandler.middleware";

// CONFIGS
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// CONNECT TO DB
connectDB();

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use("/api/v1", apiRoutes);

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

export default app;
