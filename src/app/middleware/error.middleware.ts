// src/app/middleware/error.middleware.ts

import type { NextFunction, Request, Response } from "express";

import { config } from "../config/env.js";
import { parseHttpError } from "../../shared/errors/index.js";

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction): void {
  const error = parseHttpError(err);

  req.log.error(
    {
      err: error,
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
    },
    error.message,
  );

  res.status(error.statusCode).json({
    success: false,
    requestId: req.id,
    code: error.code,
    message: error.message,
    details: error.details ?? null,
    ...(config.NODE_ENV !== "production" && {
      stack: error.stack,
    }),
  });
}
