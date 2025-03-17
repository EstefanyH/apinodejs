import FetchFusionData from '../../application/usecases/fetch_fusion_data.js'
import db from '../../infrastructure/database/db.js'; 

const tbName = 'FusionadosData';

class FusionController {

    constructor(swapiService, weatherService) {
        this.fetchFusionData = new FetchFusionData(swapiService, weatherService);
    }

    async fusionados(e) {
        console.log("Solicitud recibida:", e);

        const { planetName } = e.queryStringParameters || {};
        
        if (!planetName) {
            return { statusCode: 400, body: JSON.stringify({ error: "planetName es requerido" }) };
        }

        console.log("Buscando datos para el planeta:", planetName);

        const data = await this.fetchFusionData.execute(planetName);
        console.log("Datos obtenidos:", data);

        await db.save(tbName, data);
        console.log("Datos guardados en la BD.");

        return { statusCode: 200, body: JSON.stringify(data) };
    }

}
export default FusionController;