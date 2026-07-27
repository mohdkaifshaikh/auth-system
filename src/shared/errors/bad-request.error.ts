import { ErrorCode } from "../constants/errorCode.js";
import { AppError } from "./app.error.js";

export class BadRequestError extends AppError {
  constructor(message = "Bad Request", details?: unknown) {
    super({
      statusCode: 400,
      message,
      code: ErrorCode.BAD_REQUEST,
      details,
    });
  }
}
