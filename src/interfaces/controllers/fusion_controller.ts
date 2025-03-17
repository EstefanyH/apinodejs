import { FetchFusionData } from '../../application/usecases/fetch_fusion_data';
import { DB } from '../../infrastructure/database/db';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { SwapiService } from '../../infrastructure/services/swapi_services';
import { WeatherService } from '../../infrastructure/services/weather_services';
import { FusionData } from '../../domain/models/fusion_data';

const tbName = 'FusionadosData';

class FusionController {
    private fetchFusionData: FetchFusionData;

    constructor(swapiService: SwapiService, weatherService: WeatherService) {
        this.fetchFusionData = new FetchFusionData(swapiService, weatherService);
    }

    async fusionados(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
        console.log("Solicitud recibida:", event);

        const planetName = event.queryStringParameters?.planetName;
        
        if (!planetName) {
            return { statusCode: 400, body: JSON.stringify({ error: "planetName es requerido" }) };
        }

        console.log("Buscando datos para el planeta:", planetName);

        try {
            const data: FusionData = await this.fetchFusionData.execute(planetName);
            console.log("Datos obtenidos:", data);

            await DB.save(tbName, data);
            console.log("Datos guardados en la BD.");

            return { statusCode: 200, body: JSON.stringify(data) };
        } catch (error) {
            console.error("Error en fusionados:", error);
            return { statusCode: 500, body: JSON.stringify({ error: "Error interno del servidor" }) };
        }
    }
}

export default FusionController;
