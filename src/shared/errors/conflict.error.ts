import { ErrorCode } from "../constants/errorCode.js";
import { AppError } from "./app.error.js";

export class ConflictError extends AppError {
  constructor(message = "Conflict") {
    super({
      statusCode: 409,
      message,
      code: ErrorCode.CONFLICT,
    });
  }
}
