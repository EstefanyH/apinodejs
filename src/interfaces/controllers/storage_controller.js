import storeModel from '../../application/usecases/store_data.js';
import db from '../../infrastructure/database/db.js';

const tbName = 'FusionadosData';

class StorageController {
    
    constructor() {
        this.storeData = new storeModel(db);
    }

    async almacenar(e) {
        const body = JSON.parse(e.body);
        if (!body || Object.keys(body).length === 0) {
            return { statusCode: 400, body: JSON.stringify({ error: "Datos requeridos" }) };
        }

        const response = await this.storeData.execute(tbName, body);
        return { statusCode: 201, body: JSON.stringify(response) };
    }
}
export default StorageController;