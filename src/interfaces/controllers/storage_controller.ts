import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import StoreData  from '../../application/usecases/store_data';
import { DB } from "../../infrastructure/database/db";

const tbName = "FusionadosData";

export class StorageController {
    private storeData: StoreData;

    constructor() {
        this.storeData = new StoreData(DB);
    }

    async almacenar(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
        try {
            if (!event.body) {
                return { statusCode: 400, body: JSON.stringify({ error: "Datos requeridos" }) };
            }

            const body = JSON.parse(event.body);

            if (Object.keys(body).length === 0) {
                return { statusCode: 400, body: JSON.stringify({ error: "El cuerpo de la solicitud no puede estar vacío" }) };
            }

            const response = await this.storeData.execute(tbName, body);
            return { statusCode: 201, body: JSON.stringify(response) };
        } catch (error) {
            console.error("Error al almacenar datos:", error);
            return { statusCode: 500, body: JSON.stringify({ error: "Error interno del servidor" }) };
        }
    }
}
