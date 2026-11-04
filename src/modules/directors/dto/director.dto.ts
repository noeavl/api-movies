import { z } from "zod";

export const createDirectorSchema = z.object({
  name: z.string().min(1, "El nombre es requerido").max(150),
  bio: z.string().optional(),
  birthDate: z.string().datetime().optional().nullable(),
  nationality: z.string().max(100).optional(),
});

export const updateDirectorSchema = createDirectorSchema.partial();

export const directorQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().optional(),
  nationality: z.string().optional(),
  sortBy: z.enum(["name", "birthDate", "createdAt"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type CreateDirectorDto = z.infer<typeof createDirectorSchema>;
export type UpdateDirectorDto = z.infer<typeof updateDirectorSchema>;
export type DirectorQueryDto = z.infer<typeof directorQuerySchema>;