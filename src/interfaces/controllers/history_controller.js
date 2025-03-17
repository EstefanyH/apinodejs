import history from '../../application/usecases/history_data.js';
import db from '../../infrastructure/database/db.js';

const tbName = "FusionadosData";

class HistoryController {
    static async historial(e) {
        try {
            const data = await history(db, tbName);
            return { statusCode: 200, body: JSON.stringify(data) };
        } catch (xe) {
            return { statusCode: 500, body: JSON.stringify({ message: "Error al obtener historial", xe }) };
        }
    }
}
export default HistoryController;