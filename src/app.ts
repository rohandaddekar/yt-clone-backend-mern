import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db";
import userRouter from "./routes/auth/auth.route";
import globalErrorHandler from "./middlewares/globalErrorHandler.middleware";

dotenv.config();
connectDB();

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/v1/users", userRouter);

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

export default app;
