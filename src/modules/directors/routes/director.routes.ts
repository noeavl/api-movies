import { Router } from "express";
import { directorController } from "./controllers/director.controller.js";
import { validate, validateQuery, validateParams } from "../../shared/middlewares/validate.js";
import { createDirectorSchema, updateDirectorSchema, directorQuerySchema, uuidSchema } from "./dto/director.dto.js";

const router = Router();

router.post("/", validate(createDirectorSchema), directorController.create);
router.get("/", validateQuery(directorQuerySchema), directorController.findAll);
router.get("/:id", validateParams(uuidSchema), directorController.findById);
router.patch("/:id", validateParams(uuidSchema), validate(updateDirectorSchema), directorController.update);
router.delete("/:id", validateParams(uuidSchema), directorController.delete);

export default router;