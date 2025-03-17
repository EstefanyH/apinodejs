import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import HistoryData  from '../../application/usecases/history_data'; //"../../application/usecases/history_data";
import { DB } from "../../infrastructure/database/db";

const tbName = "FusionadosData";

export class HistoryController {
    private getHistory: HistoryData;

    constructor() {
        this.getHistory = new HistoryData(DB);
    }

    async historial(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
        try {
            const data = await this.getHistory.execute(tbName);
            return { statusCode: 200, body: JSON.stringify(data) };
        } catch (error) {
            console.error("Error al obtener el historial:", error);
            return { statusCode: 500, body: JSON.stringify({ error: "Error interno del servidor" }) };
        }
    }
}
