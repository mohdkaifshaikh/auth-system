export interface AppErrorOptions {
  statusCode: number;
  message: string;
  code?: string;
  details?: unknown;
  isOperational?: boolean;
}

export class AppError extends Error {
  readonly statusCode: number;
  readonly code: string;
  readonly details?: unknown;
  readonly isOperational: boolean;

  constructor({
    statusCode,
    message,
    code = "APP_ERROR",
    details,
    isOperational = true,
  }: AppErrorOptions) {
    super(message);

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}
