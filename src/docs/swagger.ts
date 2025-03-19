import swaggerJsdoc from "swagger-jsdoc";

const stage ="v1"; // ✅ Usar "v1" como prefijo
const apiGatewayId = process.env.API_GATEWAY_ID; // ⚠️ Asegúrate de definir esto en el entorno


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
        url: `http://localhost:3000/${stage}`,  // ✅ Para desarrollo local con Serverless Offline
        description: "Servidor Local con Serverless Offline",
      },
      apiGatewayId
        ? {
            url: `https://${apiGatewayId}.execute-api.us-west-2.amazonaws.com/${stage}`,
            description: "API Gateway en AWS",
          }
        : null,
    ].filter(Boolean), //
  },
  apis: ["./src/handler.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
