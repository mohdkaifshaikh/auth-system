import { config } from "../../app/config/env.js";
import logger from "../../app/config/logger.js";
import { prisma } from "../../infra/database/prisma.js";
interface HealthCheckResult {
  status: "ok" | "degraded" | "error";
  service: string;
  environment: string;
  uptime: number;
  timestamp: string;
  nodeVersion: string;
  checks: {
    database: "up" | "down";
    // redis?: "up" | "down";
  };
}
const getHealth = async (): Promise<HealthCheckResult> => {
  let isDbHealthy: boolean;
  try {
    await prisma.$queryRaw`SELECT 1`;
    isDbHealthy = true;
  } catch (error) {
    logger.error({ error }, "Health check failed: Database unreachable");
    isDbHealthy = false;
  }
  const isHealthy = isDbHealthy;

  return {
    status: isHealthy ? "ok" : "degraded",
    service: config.APP_NAME,
    environment: config.NODE_ENV,
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    checks: {
      database: isDbHealthy ? "up" : "down",
    },
  };
};
export const healthService = { getHealth };
