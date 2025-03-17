import fetch_data from '../../application/usecases/fetch_fusion_data.js'
import db from '../../infrastructure/database/db.js';
import swapi_service from '../../infrastructure/services/swapi_services.js';
import weather_service from '../../infrastructure/services/weather_services.js';

const tbName = 'FusionadosData';

class FusionController {

    static async fusionados(e) {
        try{
            const fusionData = await fetch_data(swapi_service, weather_service);
            await db.save(tbName, fusionData);
        }catch(xe){
            return { statusCode: 500, body: JSON.stringify({ message: "Error al fusionar datos", xe }) };
        }
    }

}
export default FusionController;