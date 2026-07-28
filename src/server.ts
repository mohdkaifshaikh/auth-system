import type { Server } from "node:http";
import app from "./app/app.js";
import { config } from "./app/config/env.js";
import logger from "./app/config/logger.js";
import { pool, prisma } from "./infra/database/prisma.js";

let server: Server | null = null;
let isShuttingDown: boolean = false;
async function shutdown(reason: string): Promise<void> {
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
    if (server) {
      // Drains idle persistent HTTP keep-alive connections
      server.closeIdleConnections();

      await new Promise<void>((resolve, reject) => {
        server!.close((err) => (err ? reject(err) : resolve()));
      });
      logger.info("HTTP server closed");
    }

    // Future cleanup
    await prisma.$disconnect();
    await pool.end();
    logger.info("Database pool closed");
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
    // await redis.connect();
    // await queue.start();

    server = app.listen(config.PORT, () => {
      logger.info(
        {
          port: config.PORT,
          env: config.NODE_ENV,
        },
        "Server Started",
      );
    });
  } catch (error) {
    logger.fatal({ error }, "Failed to start server");
    process.exit(1);
  }
}

process.on("SIGINT", () => void shutdown("SIGINT"));

process.on("SIGTERM", () => void shutdown("SIGTERM"));

// Unexpected promise errors
process.on("unhandledRejection", (reason) => {
  logger.fatal({ reason }, "Unhandled promise rejection");

  void shutdown("unhandledRejection");
});

// Unexpected synchronous errors
process.on("uncaughtException", (error) => {
  logger.fatal({ error }, "Uncaught exception - Exiting process immediately");

  process.exit(1);
});
void start();
