import type { Server } from "node:http";
import app from "./app/app.js";
import { config } from "./app/config/env.js";
import { logger } from "./app/config/logger.js";

let server: Server;

async function start() {
  try {
    server = app.listen(config.PORT, () => {
      logger.info(
        {
          port: config.PORT,
          env: config.NODE_ENV,
        },
        "Server Started",
      );
    });
    process.on("SIGINT", () => {
      logger.info("SIGINT received. Shutting down...");
      server.close(() => process.exit(0));
    });

    process.on("SIGTERM", () => {
      logger.info("SIGTERM received. Shutting down...");
      server.close(() => process.exit(0));
    });
  } catch (error) {
    logger.fatal({ error }, "Failed to start server");
    process.exit(1);
  }
}
void start();
