import historyModel from '../../application/usecases/history_data.js';
import db from '../../infrastructure/database/db.js';

const tbName = "FusionadosData";

class HistoryController {
    constructor() {
        this.getHistory = new historyModel(db);
    }

    async historial(event) {
        const data = await this.getHistory.execute(tbName);
        return { statusCode: 200, body: JSON.stringify(data) };
    }
}
export default HistoryController;