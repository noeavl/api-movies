import { Request, Response } from "express";
import { movieService } from "../services/movie.service.js";
import { successResponse } from "../../../shared/utils/api-response.js";
import { asyncHandler } from "../../../shared/middlewares/error-handler.js";
import { validate, validateQuery, validateParams } from "../../../shared/middlewares/validate.js";
import { createMovieSchema, updateMovieSchema, movieQuerySchema } from "../dto/movie.dto.js";
import { uuidSchema } from "../../../shared/types/common.js";

export class MovieController {
  create = asyncHandler(async (req: Request, res: Response) => {
    const movie = await movieService.create(req.body);
    res.status(201).json(successResponse(movie));
  });

  findAll = asyncHandler(async (req: Request, res: Response) => {
    const result = await movieService.findAll(req.query as any);
    res.json(successResponse(result.data, result.meta));
  });

  findById = asyncHandler(async (req: Request, res: Response) => {
    const movie = await movieService.findById(req.params.id as string);
    res.json(successResponse(movie));
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const movie = await movieService.update(req.params.id as string, req.body);
    res.json(successResponse(movie));
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    await movieService.delete(req.params.id as string);
    res.status(204).send();
  });
}

export const movieController = new MovieController();