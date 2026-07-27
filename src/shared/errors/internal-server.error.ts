import { ErrorCode } from "../constants/errorCode.js";
import { AppError } from "./app.error.js";

export class InternalServerError extends AppError {
  constructor(message = "Internal Server Error") {
    super({
      statusCode: 500,
      message,
      code: ErrorCode.INTERNAL_SERVER_ERROR,
      isOperational: false,
    });
  }
}
