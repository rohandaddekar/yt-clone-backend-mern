import { Router } from "express";
import authRoutes from "./auth/auth.route";

const apiRoutes = Router();

apiRoutes.use("/auth", authRoutes);

export default apiRoutes;
