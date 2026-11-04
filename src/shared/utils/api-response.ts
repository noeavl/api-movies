export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: unknown;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export function successResponse<T>(data: T, meta?: ApiResponse["meta"]): ApiResponse<T> {
  return { success: true, data, meta };
}

export function errorResponse(message: string, code?: string, details?: unknown): ApiResponse {
  return { success: false, error: { message, code, details } };
}