import { Router } from "express";
import userRoutes from "./user/user.route";

const apiRoutes = Router();

apiRoutes.use("/users", userRoutes);

export default apiRoutes;
