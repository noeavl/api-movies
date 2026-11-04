import { Router } from "express";
import { directorController } from "../controllers/director.controller.js";
import { validate, validateQuery, validateParams } from "../../../shared/middlewares/validate.js";
import { createDirectorSchema, updateDirectorSchema, directorQuerySchema } from "../dto/director.dto.js";
import { uuidSchema } from "../../../shared/types/common.js";

const router: Router = Router();

/**
 * @openapi
 * /directors:
 *   post:
 *     tags: [Directors]
 *     summary: Crear un nuevo director
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDirectorDto'
 *     responses:
 *       201:
 *         description: Director creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Director'
 *       400:
 *         description: Datos de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/", validate(createDirectorSchema), directorController.create);

/**
 * @openapi
 * /directors:
 *   get:
 *     tags: [Directors]
 *     summary: Listar directores con paginación y filtros
 *     parameters:
 *       - $ref: '#/components/parameters/page'
 *       - $ref: '#/components/parameters/limit'
 *       - name: search
 *         in: query
 *         schema:
 *           type: string
 *         description: Buscar por nombre
 *       - name: nationality
 *         in: query
 *         schema:
 *           type: string
 *         description: Filtrar por nacionalidad
 *       - name: sortBy
 *         in: query
 *         schema:
 *           type: string
 *           enum: [name, birthDate, createdAt]
 *           default: createdAt
 *       - name: sortOrder
 *         in: query
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *     responses:
 *       200:
 *         description: Lista de directores
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 */
router.get("/", validateQuery(directorQuerySchema), directorController.findAll);

/**
 * @openapi
 * /directors/{id}:
 *   get:
 *     tags: [Directors]
 *     summary: Obtener un director por ID
 *     parameters:
 *       - $ref: '#/components/parameters/id'
 *     responses:
 *       200:
 *         description: Director encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Director'
 *       404:
 *         description: Director no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/:id", validateParams(uuidSchema), directorController.findById);

/**
 * @openapi
 * /directors/{id}:
 *   patch:
 *     tags: [Directors]
 *     summary: Actualizar un director
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateDirectorDto'
 *     responses:
 *       200:
 *         description: Director actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Director'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Director no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.patch("/:id", validateParams(uuidSchema), validate(updateDirectorSchema), directorController.update);

/**
 * @openapi
 * /directors/{id}:
 *   delete:
 *     tags: [Directors]
 *     summary: Eliminar un director
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/id'
 *     responses:
 *       204:
 *         description: Director eliminado
 *       404:
 *         description: Director no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete("/:id", validateParams(uuidSchema), directorController.delete);

export default router;