import { Router } from "express";
import healthRouter from "../../modules/health/health.route.js";
const router = Router();
router.use("/healthz", healthRouter);
export default router;
