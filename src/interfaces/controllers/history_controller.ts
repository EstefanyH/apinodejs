import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import HistoryData from '../../application/usecases/history_data';
import { DB } from "../../infrastructure/database/db";

const tbName = "FusionadosData";

export class HistoryController {
    private getHistory: HistoryData;
    private dbInstance: DB; // ✅ Instancia de DB

    constructor() {
        this.dbInstance = new DB(); // ✅ Crear instancia
        this.getHistory = new HistoryData(this.dbInstance); // ✅ Pasar instancia de DB
    }

    /**
     * @swagger
     * /historial:
     *   get:
     *     summary: Obtener historial
     *     description: Retorna la lista de historial desde DynamoDB.
     *     responses:
     *       200:
     *         description: Lista obtenida correctamente
     *       500:
     *         description: Error interno del servidor
     */
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
