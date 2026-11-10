import { prisma } from "../../../config/database.js";
import { AppError } from "../../../shared/utils/app-error.js";
import type { DirectorQueryDto } from "../dto/director.dto.js";
import type { PaginatedResult } from "../../../shared/types/common.js";

export class DirectorService {
  async create(data: {
    name: string;
    bio?: string;
    birthDate?: Date | null;
    nationality?: string;
  }) {
    return prisma.director.create({ data });
  }

  async findAll(query: DirectorQueryDto): Promise<PaginatedResult<any>> {
    const { page, limit, search, nationality, sortBy, sortOrder } = query;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (search) where.name = { contains: search };
    if (nationality) where.nationality = { contains: nationality };

    const [data, total] = await Promise.all([
      prisma.director.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: { _count: { select: { movies: true } } },
      }),
      prisma.director.count({ where }),
    ]);

    return {
      data,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async findById(id: string) {
    const director = await prisma.director.findUnique({
      where: { id },
      include: { movies: { include: { category: true } } },
    });
    if (!director) throw AppError.notFound("Director no encontrado");
    return director;
  }

  async update(id: string, data: Partial<{
    name: string;
    bio?: string;
    birthDate?: Date | null;
    nationality?: string;
  }>) {
    await this.findById(id);
    return prisma.director.update({ where: { id }, data });
  }

  async delete(id: string) {
    await this.findById(id);
    return prisma.director.delete({ where: { id } });
  }
}

export const directorService = new DirectorService();