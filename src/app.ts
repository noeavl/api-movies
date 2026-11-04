import express, { Application } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import routes from "./routes.js";
import { swaggerSpec } from "./config/swagger.js";
import { errorHandler, notFoundHandler } from "./shared/middlewares/error-handler.js";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

app.use(notFoundHandler);
app.use(errorHandler);

export default app;