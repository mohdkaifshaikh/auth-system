import express from "express";
import cors from "cors";
import helmet from "helmet";
import httpLogger from "./middleware/httpLogger.middleware.js";
import testRouter from "../modules/test/test.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { notFoundHandler } from "./middleware/notFound.middleware.js";
import router from "./routes/index.js";

const app = express();

// Trust the first proxy hop so req.ip reflects the real client IP behind
// Nginx, ELB, Cloudflare, etc. Required for correct rate-limit key generation and CSRF session binding.
app.set("trust proxy", 1);

// Security middlewares:
app.use(helmet());
app.use(cors());

app.use(httpLogger);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Temporary route
app.use("/api/v1", router);
app.use("/test", testRouter);

app.use(notFoundHandler);
app.use(errorHandler);
export default app;
