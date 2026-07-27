import { asyncHandler } from "../../app/middleware/asyncHandler.middleware.js";
import type { Request, Response } from "express";
import { healthService } from "./health.service.js";
import { sendSuccess } from "../../shared/utils/response.js";
export const healthController = asyncHandler(
  async (_req: Request, res: Response): Promise<void> => {
    const health = await healthService.getHealth();
    sendSuccess(res, { message: "Server is Healthy", data: health });
  },
);
