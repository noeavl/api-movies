import { prisma } from "../../config/database.js";
import { AppError } from "../../shared/utils/app-error.js";
import type { MovieQueryDto } from "./dto/movie.dto.js";
import type { PaginatedResult } from "../../shared/types/common.js";

export class MovieService {
  async create(data: {
    title: string;
    synopsis?: string;
    releaseYear: number;
    duration?: number;
    posterUrl?: string;
    rating?: number;
    categoryId: string;
    directorId: string;
  }) {
    const category = await prisma.category.findUnique({ where: { id: data.categoryId } });
    if (!category) throw AppError.notFound("Categoría no encontrada");

    const director = await prisma.director.findUnique({ where: { id: data.directorId } });
    if (!director) throw AppError.notFound("Director no encontrado");

    return prisma.movie.create({ data });
  }

  async findAll(query: MovieQueryDto): Promise<PaginatedResult<any>> {
    const { page, limit, search, categoryId, directorId, releaseYear, minRating, sortBy, sortOrder } = query;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (search) where.title = { contains: search, mode: "insensitive" };
    if (categoryId) where.categoryId = categoryId;
    if (directorId) where.directorId = directorId;
    if (releaseYear) where.releaseYear = releaseYear;
    if (minRating) where.rating = { gte: minRating };

    const [data, total] = await Promise.all([
      prisma.movie.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: { category: true, director: true },
      }),
      prisma.movie.count({ where }),
    ]);

    return {
      data,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async findById(id: string) {
    const movie = await prisma.movie.findUnique({
      where: { id },
      include: { category: true, director: true },
    });
    if (!movie) throw AppError.notFound("Película no encontrada");
    return movie;
  }

  async update(id: string, data: Partial<{
    title: string;
    synopsis?: string;
    releaseYear: number;
    duration?: number;
    posterUrl?: string;
    rating?: number;
    categoryId: string;
    directorId: string;
  }>) {
    await this.findById(id);

    if (data.categoryId) {
      const category = await prisma.category.findUnique({ where: { id: data.categoryId } });
      if (!category) throw AppError.notFound("Categoría no encontrada");
    }

    if (data.directorId) {
      const director = await prisma.director.findUnique({ where: { id: data.directorId } });
      if (!director) throw AppError.notFound("Director no encontrado");
    }

    return prisma.movie.update({ where: { id }, data, include: { category: true, director: true } });
  }

  async delete(id: string) {
    await this.findById(id);
    return prisma.movie.delete({ where: { id } });
  }
}

export const movieService = new MovieService();