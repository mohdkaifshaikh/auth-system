import { ErrorCode } from "../constants/errorCode.js";
import { AppError } from "./app.error.js";

export class ValidationError extends AppError {
  constructor(message = "Validation Failed", details?: unknown) {
    super({
      statusCode: 422,
      message,
      code: ErrorCode.VALIDATION_ERROR,
      details,
    });
  }
}
