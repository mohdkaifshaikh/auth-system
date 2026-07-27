import { config } from "../../app/config/env.js";

const getHealth = async () => {
  return {
    status: "ok",
    service: config.APP_NAME,
    environment: config.NODE_ENV,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
  };
};
export const healthService = { getHealth };
