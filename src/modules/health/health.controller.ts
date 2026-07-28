import { asyncHandler } from "../../app/middleware/asyncHandler.middleware.js";
import type { Request, Response } from "express";
import { healthService } from "./health.service.js";
import { sendSuccess } from "../../shared/utils/response.js";
import { ServiceUnavailableError } from "../../shared/errors/serviceUnavailable.error.js";
export const healthController = asyncHandler(
  async (_req: Request, res: Response): Promise<void> => {
    const health = await healthService.getHealth();

    if (health.status !== "ok") {
      throw new ServiceUnavailableError("Server is degraded");
    }

    sendSuccess(res, { message: "Server is Healthy", data: health });
  },
);
