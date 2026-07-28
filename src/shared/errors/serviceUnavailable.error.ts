import { ErrorCode } from "../constants/errorCode.js";
import { AppError } from "./app.error.js";

export class ServiceUnavailableError extends AppError {
  constructor(message = "Service Unavailable") {
    super({
      statusCode: 503,
      message,
      code: ErrorCode.SERVICE_UNAVAILABLE,
    });
  }
}
