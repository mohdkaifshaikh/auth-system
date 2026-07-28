import type { Server } from "node:http";
import app from "./app/app.js";
import { config } from "./app/config/env.js";
import logger from "./app/config/logger.js";
import { prisma } from "./infra/database/prisma.js";
let isShuttingDown: boolean = false;
async function shutdown(server: Server, reason: string): Promise<void> {
  if (isShuttingDown) {
    logger.warn("Shutdown already in progress...");
    return;
  }

  isShuttingDown = true;

  logger.info({ reason }, "Shutting down server");

  const forceShutdown = setTimeout(() => {
    logger.fatal("Could not shutdown connection in time. Forcing shutdown");
    process.exit(1);
  }, 10_000);
  forceShutdown.unref();
  try {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
    logger.info("HTTP server closed");

    // Future cleanup
    await prisma.$disconnect();
    // await redis.quit();
    // await queue.close();

    clearTimeout(forceShutdown);
    logger.info("Shutdown completed successfully");
    process.exit(0);
  } catch (error) {
    clearTimeout(forceShutdown);
    logger.fatal({ error }, "Error during graceful shutdown");
    process.exit(1);
  }
}
async function start(): Promise<void> {
  try {
    // Startup initialization
    await prisma.$connect();
    // await redis.connect();
    // await queue.start();

    const server: Server = app.listen(config.PORT, () => {
      logger.info(
        {
          port: config.PORT,
          env: config.NODE_ENV,
        },
        "Server Started",
      );
    });
    process.on("SIGINT", () => void shutdown(server, "SIGINT"));

    process.on("SIGTERM", () => void shutdown(server, "SIGTERM"));

    // Unexpected promise errors
    process.on("unhandledRejection", (reason) => {
      logger.fatal({ reason }, "Unhandled promise rejection");

      void shutdown(server, "unhandledRejection");
    });

    // Unexpected synchronous errors
    process.on("uncaughtException", (error) => {
      logger.fatal({ error }, "Uncaught exception");

      void shutdown(server, "uncaughtException");
    });
  } catch (error) {
    logger.fatal({ error }, "Failed to start server");
    process.exit(1);
  }
}
void start();
