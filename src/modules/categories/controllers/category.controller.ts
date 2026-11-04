import { Request, Response } from "express";
import { categoryService } from "../services/category.service.js";
import { successResponse } from "../../../shared/utils/api-response.js";
import { asyncHandler } from "../../../shared/middlewares/error-handler.js";
import { validate, validateQuery, validateParams } from "../../../shared/middlewares/validate.js";
import { createCategorySchema, updateCategorySchema, categoryQuerySchema } from "../dto/category.dto.js";
import { uuidSchema } from "../../../shared/types/common.js";

export class CategoryController {
  create = asyncHandler(async (req: Request, res: Response) => {
    const category = await categoryService.create(req.body);
    res.status(201).json(successResponse(category));
  });

  findAll = asyncHandler(async (req: Request, res: Response) => {
    const result = await categoryService.findAll(req.query as any);
    res.json(successResponse(result.data, result.meta));
  });

  findById = asyncHandler(async (req: Request, res: Response) => {
    const category = await categoryService.findById(req.params.id as string);
    res.json(successResponse(category));
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const category = await categoryService.update(req.params.id as string, req.body);
    res.json(successResponse(category));
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    await categoryService.delete(req.params.id as string);
    res.status(204).send();
  });
}

export const categoryController = new CategoryController();