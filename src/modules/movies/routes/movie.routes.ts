import { Router } from "express";
import { movieController } from "../controllers/movie.controller.js";
import { validate, validateQuery, validateParams } from "../../../shared/middlewares/validate.js";
import { createMovieSchema, updateMovieSchema, movieQuerySchema, uuidSchema } from "../dto/movie.dto.js";

const router = Router();

router.post("/", validate(createMovieSchema), movieController.create);
router.get("/", validateQuery(movieQuerySchema), movieController.findAll);
router.get("/:id", validateParams(uuidSchema), movieController.findById);
router.patch("/:id", validateParams(uuidSchema), validate(updateMovieSchema), movieController.update);
router.delete("/:id", validateParams(uuidSchema), movieController.delete);

export default router;