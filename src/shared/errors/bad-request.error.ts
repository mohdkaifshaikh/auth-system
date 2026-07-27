import { AppError } from "./app.error.js";

export class BadRequestError extends AppError {
  constructor(message = "Bad Request", details?: unknown) {
    super({
      statusCode: 400,
      message,
      code: "BAD_REQUEST",
      details,
    });
  }
}
