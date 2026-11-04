export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code?: string;
  public readonly details?: unknown;

  constructor(
    message: string,
    statusCode: number = 500,
    code?: string,
    details?: unknown
  ) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message: string, details?: unknown) {
    return new AppError(message, 400, "BAD_REQUEST", details);
  }

  static notFound(message: string = "Recurso no encontrado") {
    return new AppError(message, 404, "NOT_FOUND");
  }

  static internal(message: string = "Error interno del servidor") {
    return new AppError(message, 500, "INTERNAL_ERROR");
  }

  static conflict(message: string) {
    return new AppError(message, 409, "CONFLICT");
  }

  static unauthorized(message: string = "No autorizado") {
    return new AppError(message, 401, "UNAUTHORIZED");
  }

  static forbidden(message: string = "Prohibido") {
    return new AppError(message, 403, "FORBIDDEN");
  }
}