import swaggerJSDoc from "swagger-jsdoc";
import { env } from "./env.js";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Movies",
      version: "1.0.0",
      description: "API modular para gestión de películas, directores y categorías",
      contact: {
        name: "API Movies",
      },
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}/api`,
        description: "Servidor de desarrollo",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      parameters: {
        id: {
          name: "id",
          in: "path",
          required: true,
          description: "ID del recurso (UUID)",
          schema: { type: "string", format: "uuid" },
        },
        page: {
          name: "page",
          in: "query",
          description: "Número de página",
          schema: { type: "integer", minimum: 1, default: 1 },
        },
        limit: {
          name: "limit",
          in: "query",
          description: "Elementos por página",
          schema: { type: "integer", minimum: 1, maximum: 100, default: 10 },
        },
      },
      schemas: {
        Movie: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            title: { type: "string" },
            synopsis: { type: "string", nullable: true },
            releaseYear: { type: "integer" },
            duration: { type: "integer", nullable: true },
            posterUrl: { type: "string", format: "uri", nullable: true },
            rating: { type: "number", format: "float", nullable: true },
            categoryId: { type: "string", format: "uuid" },
            directorId: { type: "string", format: "uuid" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
            category: { $ref: "#/components/schemas/Category" },
            director: { $ref: "#/components/schemas/Director" },
          },
        },
        Director: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            name: { type: "string" },
            bio: { type: "string", nullable: true },
            birthDate: { type: "string", format: "date-time", nullable: true },
            nationality: { type: "string", nullable: true },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Category: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            name: { type: "string" },
            description: { type: "string", nullable: true },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        CreateMovieDto: {
          type: "object",
          required: ["title", "releaseYear", "categoryId", "directorId"],
          properties: {
            title: { type: "string", maxLength: 200 },
            synopsis: { type: "string" },
            releaseYear: { type: "integer", minimum: 1888 },
            duration: { type: "integer", minimum: 1 },
            posterUrl: { type: "string", format: "uri" },
            rating: { type: "number", minimum: 0, maximum: 10 },
            categoryId: { type: "string", format: "uuid" },
            directorId: { type: "string", format: "uuid" },
          },
        },
        UpdateMovieDto: {
          type: "object",
          properties: {
            title: { type: "string", maxLength: 200 },
            synopsis: { type: "string" },
            releaseYear: { type: "integer", minimum: 1888 },
            duration: { type: "integer", minimum: 1 },
            posterUrl: { type: "string", format: "uri" },
            rating: { type: "number", minimum: 0, maximum: 10 },
            categoryId: { type: "string", format: "uuid" },
            directorId: { type: "string", format: "uuid" },
          },
        },
        CreateDirectorDto: {
          type: "object",
          required: ["name"],
          properties: {
            name: { type: "string", maxLength: 150 },
            bio: { type: "string" },
            birthDate: { type: "string", format: "date-time" },
            nationality: { type: "string", maxLength: 100 },
          },
        },
        UpdateDirectorDto: {
          type: "object",
          properties: {
            name: { type: "string", maxLength: 150 },
            bio: { type: "string" },
            birthDate: { type: "string", format: "date-time" },
            nationality: { type: "string", maxLength: 100 },
          },
        },
        CreateCategoryDto: {
          type: "object",
          required: ["name"],
          properties: {
            name: { type: "string", maxLength: 100 },
            description: { type: "string" },
          },
        },
        UpdateCategoryDto: {
          type: "object",
          properties: {
            name: { type: "string", maxLength: 100 },
            description: { type: "string" },
          },
        },
        PaginatedResponse: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            data: { type: "array", items: {} },
            meta: {
              type: "object",
              properties: {
                page: { type: "integer" },
                limit: { type: "integer" },
                total: { type: "integer" },
                totalPages: { type: "integer" },
              },
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            error: {
              type: "object",
              properties: {
                message: { type: "string" },
                code: { type: "string" },
                details: {},
              },
            },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
    tags: [
      { name: "Movies", description: "Gestión de películas" },
      { name: "Directors", description: "Gestión de directores" },
      { name: "Categories", description: "Gestión de categorías" },
      { name: "Health", description: "Estado del servicio" },
    ],
  },
  apis: ["./src/modules/**/*.ts", "./src/routes.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);