import dotenv from "dotenv";

dotenv.config();

import serverless from "serverless-http";
import app from "./server";

import FusionController from "../src/interfaces/controllers/fusion_controller";
import { StorageController } from "../src/interfaces/controllers/storage_controller";
import { HistoryController } from "../src/interfaces/controllers/history_controller";
import { SwapiService } from "../src/infrastructure/services/swapi_services";
import { WeatherService } from "../src/infrastructure/services/weather_services";
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";


const swapiService = new SwapiService();
const weatherService = new WeatherService();
const fusionController = new FusionController(swapiService, weatherService);
const storageController = new StorageController();
const historyController = new HistoryController();

/**
 * @swagger
 * /fusionados:
 *   get:
 *     summary: Fusiona datos de Star Wars y el clima.
 *     description: Obtiene información de la API de Star Wars y del clima y los fusiona.
 *     responses:
 *       200:
 *         description: Respuesta exitosa con los datos fusionados.
 */
export const fusionados = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  return fusionController.fusionados(event);
};

/**
 * @swagger
 * /almacenar:
 *   post:
 *     summary: Almacena datos en la base de datos.
 *     description: Guarda la información procesada en la base de datos.
 *     responses:
 *       201:
 *         description: Datos almacenados correctamente.
 */
export const almacenar = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  console.log("📩 Evento recibido COMPLETO:", JSON.stringify(event, null, 2));
  /*
  const rawBody = event.body || event;
  let parsedBody;  
  try {
    parsedBody = typeof rawBody === "string" ? JSON.parse(rawBody) : rawBody;
  } catch (error) {
    console.error("❌ Error al parsear el body:", error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Error al procesar el body de la petición" }),
    };
  }

  console.log("✅ Body parseado correctamente:", parsedBody); */
  /*
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Body recibido correctamente", data: parsedBody }),
  };*/
  return storageController.almacenar(event);
};

/**
 * @swagger
 * /historial:
 *   get:
 *     summary: Obtiene el historial de datos almacenados.
 *     description: Devuelve una lista con el historial de datos procesados.
 *     responses:
 *       200:
 *         description: Lista del historial de datos.
 */
export const historial = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  return historyController.historial(event);
};

export const appHandler = serverless(app);

export const swagger = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  const response = (await appHandler(event, {})) as APIGatewayProxyResult; // 👈 Cast explícito
  return response;
};