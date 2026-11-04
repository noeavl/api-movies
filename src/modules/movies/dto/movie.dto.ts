import { z } from "zod";

export const createMovieSchema = z.object({
  title: z.string().min(1, "El título es requerido").max(200),
  synopsis: z.string().optional(),
  releaseYear: z.number().int().min(1888).max(new Date().getFullYear() + 5),
  duration: z.number().int().positive().optional(),
  posterUrl: z.string().url().optional().or(z.literal("")),
  rating: z.number().min(0).max(10).optional(),
  categoryId: z.string().uuid("ID de categoría inválido"),
  directorId: z.string().uuid("ID de director inválido"),
});

export const updateMovieSchema = createMovieSchema.partial();

export const movieQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().optional(),
  categoryId: z.string().uuid().optional(),
  directorId: z.string().uuid().optional(),
  releaseYear: z.coerce.number().int().optional(),
  minRating: z.coerce.number().min(0).max(10).optional(),
  sortBy: z.enum(["title", "releaseYear", "rating", "createdAt"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type CreateMovieDto = z.infer<typeof createMovieSchema>;
export type UpdateMovieDto = z.infer<typeof updateMovieSchema>;
export type MovieQueryDto = z.infer<typeof movieQuerySchema>;