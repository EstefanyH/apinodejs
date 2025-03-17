import dotenv from "dotenv";
import FusionController from "../src/interfaces/controllers/fusion_controller"; // Revisa la capitalización
import { StorageController } from "../src/interfaces/controllers/storage_controller";
import { HistoryController } from "../src/interfaces/controllers/history_controller";

import { SwapiService } from "../src/infrastructure/services/swapi_services";
import { WeatherService } from "../src/infrastructure/services/weather_services";
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";

dotenv.config();

const swapiService = new SwapiService();
const weatherService = new WeatherService();

const fusionController = new FusionController(swapiService, weatherService);
const storageController = new StorageController();
const historyController = new HistoryController();

export const fusionados = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  return fusionController.fusionados(event);
};

export const almacenar = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  return storageController.almacenar(event);
};

export const historial = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  return historyController.historial(event);
};
