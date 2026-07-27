import { AppError } from "./app.error.js";
import { InternalServerError } from "./internal-server.error.js";

export function parseHttpError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    return new InternalServerError(error.message);
  }

  return new InternalServerError();
}
