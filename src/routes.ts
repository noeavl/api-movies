import { Router } from "express";
import movieRoutes from "./modules/movies/index.js";
import directorRoutes from "./modules/directors/index.js";
import categoryRoutes from "./modules/categories/index.js";

const router: Router = Router();

/**
 * @openapi
 * /health:
 *   get:
 *     tags: [Health]
 *     summary: Verificar estado del servicio
 *     responses:
 *       200:
 *         description: Servicio funcionando correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 */
router.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

router.use("/movies", movieRoutes);
router.use("/directors", directorRoutes);
router.use("/categories", categoryRoutes);

export default router;