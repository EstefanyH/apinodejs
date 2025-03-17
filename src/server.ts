import express from "express";
import cors from "cors"; // Asegurar compatibilidad con CORS
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger";

const app = express();

app.use(cors()); // Habilitar CORS

// Ruta para ver Swagger UI en el navegador
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Ruta para obtener el JSON de Swagger (para verificar que Swagger está bien generado)
app.get("/swagger.json", (req, res) => {
  res.json(swaggerSpec);
});

// Endpoint de prueba
app.get("/", (req, res) => {
  res.send("Servidor Express con Swagger UI funcionando 🚀");
});

export default app;
