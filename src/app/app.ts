import express from "express";
import cors from "cors";
import helmet from "helmet";
import httpLogger from "./middleware/httpLogger.middleware.js";

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
app.get("/test", (req, res) => {
  res.json({
    message: "Logger working",
  });
});
export default app;
