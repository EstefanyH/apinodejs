import store from '../../application/usecases/store_data.js';
import db from '../../infrastructure/database/db.js';

const tbName = 'FusionadosData';

class StorageController {
    static async almacenar(e) {
        try {
            const data = JSON.parse(e.body);
            const storedData = await store(db, tbName, data);
            return { statusCode: 201, body: JSON.stringify({ message: "Datos almacenados", storedData }) };
        } catch (xe) {
            return { statusCode: 500, body: JSON.stringify({ message: "Error al almacenar datos", xe }) };
        }
    }
}
export default StorageController;