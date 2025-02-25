import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import createHttpError from "http-errors";
import express, { Request, Response } from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler.middleware";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/test", (req: Request, res: Response) => {
  const error = createHttpError(400, "Bad Request");
  throw error;
  // res.json({
  //   message: "Hello World",
  // });
});

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

export default app;
