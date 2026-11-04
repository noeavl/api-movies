import { Router } from "express";
import movieRoutes from "../modules/movies/index.js";
import directorRoutes from "../modules/directors/index.js";
import categoryRoutes from "../modules/categories/index.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

router.use("/movies", movieRoutes);
router.use("/directors", directorRoutes);
router.use("/categories", categoryRoutes);

export default router;