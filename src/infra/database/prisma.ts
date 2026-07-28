import { PrismaPg } from "@prisma/adapter-pg";
import { type Prisma, PrismaClient } from "../../generated/prisma/client.js";

import { config } from "../../app/config/env.js";
import logger from "../../app/config/logger.js";

const adapter = new PrismaPg({
  connectionString: config.DATABASE_URL,
});

export const prisma = new PrismaClient({
  adapter,
  log: [
    { emit: "event", level: "query" },
    { emit: "event", level: "error" },
    { emit: "event", level: "warn" },
  ],
});

type QueryEvent = Prisma.QueryEvent;
type LogEvent = Prisma.LogEvent;

const SLOW_QUERY_THRESHOLD_MS = 200;
if (config.NODE_ENV === "development") {
  prisma.$on("query", (event: QueryEvent) => {
    if (event.duration > SLOW_QUERY_THRESHOLD_MS) {
      logger.warn(
        {
          duration: event.duration,
          query: event.query,
        },
        "Slow Prisma query",
      );
    }
    logger.debug(
      {
        query: event.query,
        params: event.params,
        duration: event.duration,
        timestamp: event.timestamp,
      },
      "Prisma query",
    );
  });
}

prisma.$on("error", (event: LogEvent) => {
  logger.error(
    {
      message: event.message,
      timestamp: event.timestamp,
    },
    "Prisma error",
  );
});

prisma.$on("warn", (event: LogEvent) => {
  logger.warn(
    {
      message: event.message,
      timestamp: event.timestamp,
    },
    "Prisma warning",
  );
});
