import type { Response } from "express";

interface SuccessResponse<T> {
  success?: boolean;
  message?: string;
  data?: T;
  meta?: Record<string, unknown>;
  statusCode?: number;
}

export function sendSuccess<T>(
  res: Response,
  { statusCode = 200, success = true, message = "Success", data, meta }: SuccessResponse<T>,
) {
  return res.status(statusCode).json({
    success,
    message,
    data,
    ...(meta && { meta }),
  });
}
