import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { FetchFusionData } from "../../application/usecases/fetch_fusion_data";
import { DB } from "../../infrastructure/database/db";
import { SwapiService } from "../../infrastructure/services/swapi_services";
import { WeatherService } from "../../infrastructure/services/weather_services";
import { FusionData } from "../../domain/models/fusion_data";

const tbName = "FusionadosData";

class FusionController {
    private fetchFusionData: FetchFusionData;
    private dbInstance: DB; // Instancia de DB

    constructor(swapiService: SwapiService, weatherService: WeatherService) {
        this.fetchFusionData = new FetchFusionData(swapiService, weatherService);
        this.dbInstance = new DB(); // ✅ Crear una instancia de DB
    }

   
    async fusionados(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
        console.log("Solicitud recibida:", event);

        const planetName = event.queryStringParameters?.planetName;
        if (!planetName) {
            return { statusCode: 400, body: JSON.stringify({ error: "planetName es requerido" }) };
        }

        console.log("🔍 Buscando datos para el planeta:", planetName);
        const cacheKey = `fusion-${planetName}`;

        try {
            // 1️⃣ Verificar si la información está en caché usando la instancia de DB
            const cachedData = await this.dbInstance.getCache(tbName, cacheKey);
            if (cachedData) {
                console.log("📌 Devolviendo datos desde la caché");
                return { statusCode: 200, body: JSON.stringify(cachedData) };
            }

            // 2️⃣ Obtener datos de las APIs externas
            const data: FusionData = await this.fetchFusionData.execute(planetName);
            console.log("🌍 Datos obtenidos:", data);

            // 3️⃣ Guardar en caché usando la instancia de DB
            await this.dbInstance.setCache(tbName, cacheKey, data);
            console.log("✅ Datos guardados en la caché");

            return { statusCode: 200, body: JSON.stringify(data) };
        } catch (error) {
            console.error("❌ Error en fusionados:", error);
            return { statusCode: 500, body: JSON.stringify({ error: "Error interno del servidor" }) };
        }
    }
}

export default FusionController;
