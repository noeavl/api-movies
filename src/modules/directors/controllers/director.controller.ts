import { Request, Response } from "express";
import { directorService } from "../services/director.service.js";
import { successResponse } from "../../../shared/utils/api-response.js";
import { asyncHandler } from "../../../shared/middlewares/error-handler.js";
import { validate, validateQuery, validateParams } from "../../../shared/middlewares/validate.js";
import { createDirectorSchema, updateDirectorSchema, directorQuerySchema } from "../dto/director.dto.js";
import { uuidSchema } from "../../../shared/types/common.js";

export class DirectorController {
  create = asyncHandler(async (req: Request, res: Response) => {
    const director = await directorService.create(req.body);
    res.status(201).json(successResponse(director));
  });

  findAll = asyncHandler(async (req: Request, res: Response) => {
    const result = await directorService.findAll(req.query as any);
    res.json(successResponse(result.data, result.meta));
  });

  findById = asyncHandler(async (req: Request, res: Response) => {
    const director = await directorService.findById(req.params.id as string);
    res.json(successResponse(director));
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const director = await directorService.update(req.params.id as string, req.body);
    res.json(successResponse(director));
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    await directorService.delete(req.params.id as string);
    res.status(204).send();
  });
}

export const directorController = new DirectorController();