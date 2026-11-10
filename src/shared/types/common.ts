import { z } from "zod";

// validateParams parsea req.params (objeto { id }), no un string suelto
export const uuidSchema = z.object({
  id: z.string().uuid({ message: "ID inválido" }),
});

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});

export type PaginationQuery = z.infer<typeof paginationSchema>;

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}