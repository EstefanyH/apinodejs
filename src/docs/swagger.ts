import swaggerJsdoc from "swagger-jsdoc";

const stage ="v1"; // ✅ Usar "v1" como prefijo
 
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
        url: `http://localhost:3000/${stage}`,  // ✅ Prefijo correcto para Serverless Offline
        description: "Servidor Local con Serverless Offline",
      },
      {
        url:  `https://{your-api-gateway-id}.execute-api.{region}.amazonaws.com/${stage}`,
        description: "API Gateway en AWS",
      },
    ],
  },
  apis: ["./src/handler.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
