import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  API_VERSION: z.enum(["v1"]).default("v1"),
  APP_NAME: z.string().default("auth-system"),
  BASE_URL: z.string().startsWith("/").default("/api"),
  CORS_ORIGIN: z.url().default("http://localhost:5173"),
  LOG_LEVEL: z.enum(["trace", "debug", "info", "warn", "error", "fatal"]).default("info"),
});
export type Config = z.infer<typeof envSchema>;

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment configuration");
  console.error(z.flattenError(parsed.error).fieldErrors);
  process.exit(1);
}
export const config = parsed.data;
