# API Movies

API modular para gestión de películas, directores y categorías construida con Express, TypeScript, Prisma y MySQL.

## Arquitectura

```
src/
├── app.ts                    # Express app + middlewares + Swagger UI
├── server.ts                 # Entry point
├── routes.ts                 # Router principal (/health + modules)
├── config/
│   ├── env.ts               # Variables de entorno tipadas
│   ├── database.ts          # Prisma Client singleton
│   └── swagger.ts           # Configuración OpenAPI 3.0
├── modules/
│   ├── movies/
│   │   ├── controllers/     # movieController (CRUD + handlers)
│   │   ├── services/        # movieService (lógica de negocio + Prisma)
│   │   ├── routes/          # Rutas con JSDoc @openapi
│   │   ├── dto/             # Zod schemas (createMovieSchema, etc.)
│   │   └── index.ts
│   ├── directors/           # Mismo patrón
│   └── categories/          # Mismo patrón
└── shared/
    ├── middlewares/
    │   ├── error-handler.ts # AppError, asyncHandler, notFound
    │   └── validate.ts      # validate, validateQuery, validateParams
    ├── utils/
    │   ├── api-response.ts  # successResponse, errorResponse
    │   └── app-error.ts     # AppError class
    └── types/common.ts      # uuidSchema, pagination, PaginatedResult
```

### Patrones utilizados

- **Services + Controllers**: Separación clara entre lógica de negocio (services) y manejo HTTP (controllers)
- **Modular por dominio**: Cada entidad (movies, directors, categories) es un módulo independiente
- **Validación con Zod**: Schemas tipados para body, query y params
- **Manejo de errores centralizado**: `AppError` + `errorHandler` middleware
- **Documentación OpenAPI**: JSDoc `@openapi` en routes + Swagger UI

## Scripts

| Comando                          | Descripción                                       |
| -------------------------------- | ------------------------------------------------- |
| `pnpm run dev`                   | Servidor en desarrollo con hot-reload (tsx watch) |
| `pnpm run build`                 | Compila TypeScript a `dist/`                      |
| `pnpm start`                     | Ejecuta `dist/server.js` (producción)             |
| `pnpm run prisma:generate`       | Genera Prisma Client                              |
| `pnpm run prisma:migrate`        | Ejecuta migraciones en desarrollo                 |
| `pnpm run prisma:studio`         | Abre Prisma Studio (UI visual)                    |
| `pnpm run prisma:push`           | Sincroniza schema sin migraciones                 |
| `pnpm run lint`                  | Ejecuta ESLint                                    |

## Variables de entorno

Copia `.env.example` a `.env` y configura:

```env
DATABASE_URL="mysql://root:root@localhost:3306/api_movies"
PORT=3000
NODE_ENV=development
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"
```

## Documentación interactiva

Swagger UI disponible en: `http://localhost:3000/api/docs`

Incluye:

- Todos los endpoints con parámetros y schemas
- Modelos de datos (Movie, Director, Category, DTOs)
- Autenticación Bearer (JWT)
- Posibilidad de ejecutar requests directamente

## Base de datos

```prisma
model Category {
  id          String    @id @default(uuid())
  name        String    @unique
  description String?
  movies      Movie[]
}

model Director {
  id          String   @id @default(uuid())
  name        String
  bio         String?
  birthDate   DateTime?
  nationality String?
  movies      Movie[]
}

model Movie {
  id          String   @id @default(uuid())
  title       String
  synopsis    String?
  releaseYear Int
  duration    Int?
  posterUrl   String?
  rating      Float?   @default(0)
  categoryId  String
  category    Category @relation(fields: [categoryId], references: [id])
  directorId  String
  director    Director @relation(fields: [directorId], references: [id])
}
```

## Setup inicial

```bash
# 1. MySQL 8 en Docker (si no lo tienes ya)
docker run -d --name mysql-movies --restart unless-stopped \
  -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=api_movies \
  -v mysql_movies_data:/var/lib/mysql mysql:8

# 2. Instalar dependencias
pnpm install

# 3. Configurar .env
cp .env.example .env   # con el contenedor de arriba, el ejemplo ya funciona tal cual

# 4. Generar Prisma Client y aplicar migraciones
pnpm run prisma:generate
pnpm exec prisma migrate deploy

# 5. Desarrollo (http://localhost:3000/api, health en /api/health)
pnpm run dev
```

La base arranca vacía: crea categorías, directores y películas desde Swagger UI (`http://localhost:3000/api/docs`) o con `POST /api/categories`, `POST /api/directors` y `POST /api/movies`.

## Tech Stack

- **Runtime**: Node.js 20+ (ESM)
- **Framework**: Express 5
- **Language**: TypeScript 5 (strict mode)
- **ORM**: Prisma 5 (MySQL 8)
- **Validación**: Zod 4
- **Docs**: swagger-jsdoc + swagger-ui-express
- **Dev**: tsx (hot reload), tsc (build)
- **Package Manager**: pnpm 12.x
