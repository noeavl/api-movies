import { prisma } from "../../../config/database.js";
import { AppError } from "../../../shared/utils/app-error.js";
import type { CategoryQueryDto } from "../dto/category.dto.js";
import type { PaginatedResult } from "../../../shared/types/common.js";

export class CategoryService {
  async create(data: { name: string; description?: string }) {
    return prisma.category.create({ data });
  }

  async findAll(query: CategoryQueryDto): Promise<PaginatedResult<any>> {
    const { page, limit, search, sortBy, sortOrder } = query;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (search) where.name = { contains: search };

    const [data, total] = await Promise.all([
      prisma.category.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: { _count: { select: { movies: true } } },
      }),
      prisma.category.count({ where }),
    ]);

    return {
      data,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async findById(id: string) {
    const category = await prisma.category.findUnique({
      where: { id },
      include: { movies: { include: { director: true } } },
    });
    if (!category) throw AppError.notFound("Categoría no encontrada");
    return category;
  }

  async update(id: string, data: Partial<{ name: string; description?: string }>) {
    await this.findById(id);
    return prisma.category.update({ where: { id }, data });
  }

  async delete(id: string) {
    await this.findById(id);
    return prisma.category.delete({ where: { id } });
  }
}

export const categoryService = new CategoryService();