import fs from "fs";
import path from "path";
import app from "./index";

async function exportSpecs() {
  // On simule un appel sur l'endpoint configuré dans index.ts
  const response = await app.request("/openapi.json");
  const doc = await response.json();

  const outputPath = path.join(__dirname, "../openapi.json");
  fs.writeFileSync(outputPath, JSON.stringify(doc, null, 2), "utf-8");

  console.log(
    "✅ OpenAPI spec exportée avec succès dans services/backend/openapi.json",
  );
}

exportSpecs().catch(console.error);
