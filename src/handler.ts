import dotenv from "dotenv";
import FusionController from "../src/interfaces/controllers/fusion_controller";
import { StorageController } from "../src/interfaces/controllers/storage_controller";
import { HistoryController } from "../src/interfaces/controllers/history_controller";
import { SwapiService } from "../src/infrastructure/services/swapi_services";
import { WeatherService } from "../src/infrastructure/services/weather_services";
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import serverless from "serverless-http";
import app from "./server";

dotenv.config();

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

/**
 * @swagger
 * /api-docs:
 *   get:
 *     summary: Accede a Swagger UI.
 *     description: Devuelve la documentación Swagger en una interfaz gráfica.
 *     responses:
 *       200:
 *         description: Página de Swagger UI.
 */
export const swaggerUI = serverless(app);
