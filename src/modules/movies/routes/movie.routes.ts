import { Router } from "express";
import { movieController } from "../controllers/movie.controller.js";
import { validate, validateQuery, validateParams } from "../../../shared/middlewares/validate.js";
import { createMovieSchema, updateMovieSchema, movieQuerySchema } from "../dto/movie.dto.js";
import { uuidSchema } from "../../../shared/types/common.js";

const router: Router = Router();

/**
 * @openapi
 * /movies:
 *   post:
 *     tags: [Movies]
 *     summary: Crear una nueva película
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateMovieDto'
 *     responses:
 *       201:
 *         description: Película creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Datos de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Conflicto - Categoría o Director no existen
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/", validate(createMovieSchema), movieController.create);

/**
 * @openapi
 * /movies:
 *   get:
 *     tags: [Movies]
 *     summary: Listar películas con paginación y filtros
 *     parameters:
 *       - $ref: '#/components/parameters/page'
 *       - $ref: '#/components/parameters/limit'
 *       - name: search
 *         in: query
 *         schema:
 *           type: string
 *         description: Buscar por título
 *       - name: categoryId
 *         in: query
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filtrar por categoría
 *       - name: directorId
 *         in: query
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filtrar por director
 *       - name: releaseYear
 *         in: query
 *         schema:
 *           type: integer
 *         description: Filtrar por año de estreno
 *       - name: minRating
 *         in: query
 *         schema:
 *           type: number
 *           minimum: 0
 *           maximum: 10
 *         description: Rating mínimo
 *       - name: sortBy
 *         in: query
 *         schema:
 *           type: string
 *           enum: [title, releaseYear, rating, createdAt]
 *           default: createdAt
 *       - name: sortOrder
 *         in: query
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *     responses:
 *       200:
 *         description: Lista de películas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 */
router.get("/", validateQuery(movieQuerySchema), movieController.findAll);

/**
 * @openapi
 * /movies/{id}:
 *   get:
 *     tags: [Movies]
 *     summary: Obtener una película por ID
 *     parameters:
 *       - $ref: '#/components/parameters/id'
 *     responses:
 *       200:
 *         description: Película encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Película no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/:id", validateParams(uuidSchema), movieController.findById);

/**
 * @openapi
 * /movies/{id}:
 *   patch:
 *     tags: [Movies]
 *     summary: Actualizar una película
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateMovieDto'
 *     responses:
 *       200:
 *         description: Película actualizada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Película no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Categoría o Director no existen
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.patch("/:id", validateParams(uuidSchema), validate(updateMovieSchema), movieController.update);

/**
 * @openapi
 * /movies/{id}:
 *   delete:
 *     tags: [Movies]
 *     summary: Eliminar una película
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/id'
 *     responses:
 *       204:
 *         description: Película eliminada
 *       404:
 *         description: Película no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete("/:id", validateParams(uuidSchema), movieController.delete);

export default router;