import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger";

const app = express();
app.use(cors());

const basePath = "/v1"; // 🔥 Forzar el prefijo sin modificar serverless.yml

// 👇 Forzar el tipo para evitar el error en TypeScript
(swaggerSpec as Record<string, any>).servers = [{ url: "/v1" }];

app.use(
  `/api-docs`, 
  swaggerUi.serve, 
  swaggerUi.setup(swaggerSpec, { explorer: true })
);

app.get(
  `/swagger.json`, (req, res) => {
  res.json(swaggerSpec);
});
console.log(`Swagger UI disponible en http://localhost:3000${basePath}/api-docs`);
console.log(`Swagger JSON disponible en http://localhost:3000${basePath}/swagger.json`);

export default app;
