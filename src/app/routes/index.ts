import { Router } from "express";
import healthRouter from "../../modules/health/health.route.js";
import authrouter from "../../modules/auth/routes/auth.routes.js";
const router = Router();
router.use("/healthz", healthRouter);
router.use("/auth", authrouter);
export default router;
