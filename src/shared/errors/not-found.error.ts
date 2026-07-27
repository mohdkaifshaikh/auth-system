import { AppError } from "./app.error.js";

export class NotFoundError extends AppError {
  constructor(message = "Resource Not Found") {
    super({
      statusCode: 404,
      message,
      code: "NOT_FOUND",
    });
  }
}
