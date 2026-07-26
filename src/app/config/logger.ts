import pino from "pino";
import { config } from "./env.js";

const isDev = config.NODE_ENV === "development";
export const logger = pino({
  level: config.LOG_LEVEL || (isDev ? "debug" : "info"),
  base: { service: config.APP_NAME },
  timestamp: pino.stdTimeFunctions.isoTime,
  serializers: {
    err: pino.stdSerializers.err,
  },

  ...(isDev && {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "SYS:standard",
        ignore: "pid,hostname",
        singleLine: false,
        messageFormat: "{msg}",
        errorLikeObjectKeys: ["err", "error"],
      },
    },
  }),
});
