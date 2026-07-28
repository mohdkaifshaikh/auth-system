import express from "express";
import cors from "cors";
import helmet from "helmet";
import httpLogger from "./middleware/httpLogger.middleware.js";
import testRouter from "../modules/test/test.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { notFoundHandler } from "./middleware/notFound.middleware.js";
import router from "./routes/index.js";
import { config } from "./config/env.js";
import healthRouter from "../modules/health/health.route.js";

const app = express();

// Trust the first proxy hop so req.ip reflects the real client IP behind
// Nginx, ELB, Cloudflare, etc. Required for correct rate-limit key generation and CSRF session binding.
app.set("trust proxy", 1);
app.disable("x-powered-by");
// Security middlewares:
app.use(helmet());
app.use(cors());

app.use(httpLogger);

// Body parser
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Root Health Check Alias (For K8s / Cloud Ingress Probes)
app.use("/healthz", healthRouter);
// Application Route
app.use("/api/v1", router);

if (config.NODE_ENV !== "production") {
  app.use("/test", testRouter);
}
app.use(notFoundHandler);
app.use(errorHandler);
export default app;
