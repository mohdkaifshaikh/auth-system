// src/app/middleware/http-logger.middleware.ts

import { pinoHttp } from "pino-http";
import type { IncomingMessage, ServerResponse } from "http";

import logger from "../config/logger.js";

const httpLogger = pinoHttp({
  logger,

  // Log level based on response status
  customLogLevel: (_req, res, err) => {
    if (err || res.statusCode >= 500) {
      return "error";
    }

    if (res.statusCode >= 400) {
      return "warn";
    }

    return "info";
  },

  // Human-readable messages (useful with pino-pretty)
  customSuccessMessage: (req, res) => `${req.method} ${req.url} ${res.statusCode}`,

  customErrorMessage: (req, _res, err) => `${req.method} ${req.url} - ${err.message}`,

  // Only log the fields you actually need
  serializers: {
    req: (req: IncomingMessage) => ({
      method: req.method,
      url: req.url,
      ip: req.socket.remoteAddress,
      userAgent: req.headers["user-agent"],
    }),

    res: (res: ServerResponse) => ({
      statusCode: res.statusCode,
    }),
  },

  // Don't log request bodies, passwords, or tokens
  autoLogging: {
    ignore: (req) => req.url === "/health",
  },
});

export default httpLogger;
