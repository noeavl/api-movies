import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import { AppError } from "../utils/app-error.js";

export function validate(schema: ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        next(AppError.badRequest("Datos de entrada inválidos", err.flatten()));
      } else {
        next(err);
      }
    }
  };
}

export function validateQuery(schema: ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.query = schema.parse(req.query);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        next(AppError.badRequest("Parámetros de consulta inválidos", err.flatten()));
      } else {
        next(err);
      }
    }
  };
}

export function validateParams(schema: ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.params = schema.parse(req.params);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        next(AppError.badRequest("Parámetros de ruta inválidos", err.flatten()));
      } else {
        next(err);
      }
    }
  };
}