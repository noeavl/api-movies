import express from "express";
import cors from "cors";
import routes from "./routes.js";
import { errorHandler, notFoundHandler } from "./shared/middlewares/error-handler.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;