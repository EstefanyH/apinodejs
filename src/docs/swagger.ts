import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Fusión de Datos",
      version: "1.0.0",
      description: "Documentación de la API para fusionar, almacenar y consultar datos.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor Local",
      },
      {
        url: "https://{your-api-gateway-id}.execute-api.{region}.amazonaws.com/dev",
        description: "API Gateway en AWS",
      },
    ],
  },
  apis: ["./src/handlers.ts"], // 📌 Revisa que la ruta sea correcta
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
