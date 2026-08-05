import z from "zod";
import { ValidationError } from "../../shared/errors/validation.error.js";
import type { Request, Response, NextFunction, RequestHandler } from "express";
const buildValidationError = (error: z.ZodError): ValidationError => {
  const details = error.issues.map((issue) => ({
    field: issue.path.join(".") || "unknown",
    message: issue.message,
  }));

  return new ValidationError("Validation Failed", details);
};

export const validateBody = <T extends z.ZodType>(schema: T): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      next(buildValidationError(result.error));
      return;
    }
    req.body = result.data as Record<string, unknown>;
    next();
  };
};
export const validateQuery = <T extends z.ZodType>(schema: T): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      next(buildValidationError(result.error));
      return;
    }
    Object.defineProperty(req, "query", {
      value: result.data,
      writable: true,
      configurable: true,
      enumerable: true,
    });
    next();
  };
};

export const validateparams = <T extends z.ZodType>(schema: T): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.params);
    if (!result.success) {
      next(buildValidationError(result.error));
      return;
    }
    req.params = result.data as Record<string, string>;
    next();
  };
};
