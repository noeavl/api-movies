import { Router } from "express";
import { categoryController } from "./controllers/category.controller.js";
import { validate, validateQuery, validateParams } from "../../shared/middlewares/validate.js";
import { createCategorySchema, updateCategorySchema, categoryQuerySchema, uuidSchema } from "./dto/category.dto.js";

const router = Router();

router.post("/", validate(createCategorySchema), categoryController.create);
router.get("/", validateQuery(categoryQuerySchema), categoryController.findAll);
router.get("/:id", validateParams(uuidSchema), categoryController.findById);
router.patch("/:id", validateParams(uuidSchema), validate(updateCategorySchema), categoryController.update);
router.delete("/:id", validateParams(uuidSchema), categoryController.delete);

export default router;