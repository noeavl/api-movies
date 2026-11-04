import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1, "El nombre es requerido").max(100),
  description: z.string().optional(),
});

export const updateCategorySchema = createCategorySchema.partial();

export const categoryQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().optional(),
  sortBy: z.enum(["name", "createdAt"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type CreateCategoryDto = z.infer<typeof createCategorySchema>;
export type UpdateCategoryDto = z.infer<typeof updateCategorySchema>;
export type CategoryQueryDto = z.infer<typeof categoryQuerySchema>;