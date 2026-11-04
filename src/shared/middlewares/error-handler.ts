import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error.js";
import { errorResponse } from "../utils/api-response.js";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error("Error:", err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json(
      errorResponse(err.message, err.code, err.details)
    );
  }

  if (err.name === "ZodError") {
    return res.status(400).json(
      errorResponse("Datos de entrada inválidos", "VALIDATION_ERROR", err)
    );
  }

  const prismaError = err as { code?: string; meta?: { target?: string[] } };
  if (prismaError.code === "P2002") {
    const field = prismaError.meta?.target?.[0] || "campo";
    return res.status(409).json(
      errorResponse(`${field} ya existe`, "DUPLICATE_ENTRY")
    );
  }
  if (prismaError.code === "P2025") {
    return res.status(404).json(
      errorResponse("Registro no encontrado", "NOT_FOUND")
    );
  }

  return res.status(500).json(
    errorResponse("Error interno del servidor", "INTERNAL_ERROR")
  );
}

export function notFoundHandler(_req: Request, res: Response) {
  res.status(404).json(
    errorResponse("Ruta no encontrada", "NOT_FOUND")
  );
}

export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}