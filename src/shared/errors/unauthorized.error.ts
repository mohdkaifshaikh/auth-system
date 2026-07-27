import { AppError } from "./app.error.js";

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super({
      statusCode: 401,
      message,
      code: "UNAUTHORIZED",
    });
  }
}
