import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

export default app;
