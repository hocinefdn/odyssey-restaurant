import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import menuRouter from "./routes/menu";

const app = new OpenAPIHono();

// On définit le schéma de réponse avec Zod
const HealthResponseSchema = z
  .object({
    status: z.string().openapi({ example: "ok" }),
  })
  .openapi("HealthResponse");

// 2. On crée la configuration de la route de manière fortement typée
const healthRoute = createRoute({
  method: "get",
  path: "/api/health",
  summary: "Vérification de la santé de l'API",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: HealthResponseSchema,
        },
      },
      description: "L'API fonctionne parfaitement",
    },
  },
});

// 3. On implémente la route (TypeScript va valider que le JSON correspond au schéma Zod !)
app.openapi(healthRoute, (c) => {
  return c.json(
    {
      status: "ok",
    },
    200,
  );
});

// Endpoint pour le contrat
app.doc("/openapi.json", {
  openapi: "3.0.0",
  info: { title: "Odyssey Restaurant API", version: "1.0.0" },
});

// Swagger UI to visualize the OpenAPI spec
app.get("/docs", swaggerUI({ url: "/openapi.json" }));

// Mount our menu lifecycle domains
app.route("/api", menuRouter);

export default app;
