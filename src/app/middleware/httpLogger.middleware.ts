// src/app/middleware/http-logger.middleware.ts

import { pinoHttp } from "pino-http";
import type { IncomingMessage, ServerResponse } from "http";

import logger from "../config/logger.js";
import { randomUUID } from "crypto";

const httpLogger = pinoHttp({
  logger,

  // generate request id:
  genReqId(req, res) {
    const incomingId = req.headers["x-request-id"];

    const requestId =
      typeof incomingId === "string" && incomingId.length > 0 ? incomingId : randomUUID();

    res.setHeader("X-Request-Id", requestId);

    return requestId;
  },

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
      id: req.id,
      method: req.method,
      url: req.url,
      ip: req.socket?.remoteAddress,
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
