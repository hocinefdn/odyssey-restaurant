import { defineConfig } from "orval";

export default defineConfig({
  restaurantApi: {
    // where to find the OpenAPI spec
    input: "../../services/backend/openapi.json",

    // where to output the generated client code
    output: {
      mode: "split", // Sépare les types, les fonctions et les hooks
      target: "./src/generated/endpoints.ts", // Fichier principal cible
      schemas: "./src/generated/model", // Dossier pour les types TypeScript (Zod -> TS)
      client: "react-query", // 👈 Génère automatiquement des hooks React Query
      mock: false,
    },
  },
});
