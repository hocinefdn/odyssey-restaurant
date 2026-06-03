import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import app from "./index";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// On récupère l'objet OpenAPI généré par Hono
const openapiDoc = app.getOpenAPIDocument({
  openapi: "3.0.0",
  info: {
    title: "Odyssey Restaurant API",
    version: "1.0.0",
  },
});

// On écrit le fichier openapi.json à la racine du dossier backend
const outputPath = join(__dirname, "../openapi.json");
writeFileSync(outputPath, JSON.stringify(openapiDoc, null, 2));

console.log(
  "✨ Fichier openapi.json généré avec succès dans services/backend !",
);
