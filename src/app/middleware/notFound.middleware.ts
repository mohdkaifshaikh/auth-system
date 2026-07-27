import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../../shared/errors/index.js";

export function notFoundHandler(req: Request, _res: Response, next: NextFunction) {
  next(new NotFoundError(`Route ${req.originalUrl} not found`));
}
