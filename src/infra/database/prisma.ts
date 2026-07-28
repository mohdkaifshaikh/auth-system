import { PrismaPg } from "@prisma/adapter-pg";
import { type Prisma, PrismaClient } from "../../generated/prisma/client.js";
import pg from "pg";
import { config } from "../../app/config/env.js";
import logger from "../../app/config/logger.js";

export const pool = new pg.Pool({
  connectionString: config.DATABASE_URL,
  max: config.NODE_ENV === "production" ? 20 : 10,
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
});

pool.on("error", (error) => {
  logger.error({ error }, "Unexpected error on idle PostgreSQL connection pool client");
});

const adapter = new PrismaPg(pool);

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

prisma.$on("query", (event: QueryEvent) => {
  if (event.duration > SLOW_QUERY_THRESHOLD_MS) {
    logger.warn(
      {
        duration: event.duration,
        query: event.query,
        params: config.NODE_ENV === "development" ? event.params : undefined,
        // Omit params in prod for security/PII
      },
      "Slow Prisma query detected",
    );
  }
  if (config.NODE_ENV === "development") {
    logger.debug(
      {
        query: event.query,
        params: event.params,
        duration: event.duration,
        timestamp: event.timestamp,
      },
      "Prisma query",
    );
  }
});

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
