import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import StoreData from "../../application/usecases/store_data";
import { DB } from "../../infrastructure/database/db";

const tbName = "FusionadosData";

export class StorageController {
    private storeData: StoreData;
    private dbInstance: DB; // Guardamos la instancia de DB

    constructor() {
        this.dbInstance = new DB(); // Crear una instancia
        this.storeData = new StoreData(this.dbInstance);
    }
    
    async almacenar(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
        try {

            const rawBody = event.body || event;
            /*try {
            parsedBody = typeof rawBody === "string" ? JSON.parse(rawBody) : rawBody;
            } catch (error) {
            console.error("❌ Error al parsear el body:", error);
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Error al procesar el body de la petición" }),
            };
            } */
            
            console.log("✅ Datos event:", event);
            console.log("✅ Datos event body:", event.body);
            console.log("✅ Datos rawBody", rawBody);
            
            var test = rawBody.toString().length == 0;
            if (test) {
                return { statusCode: 400, body: JSON.stringify({ error: "Datos requeridos" }) };
            }

            let body = typeof rawBody === "string" ? JSON.parse(rawBody) : rawBody;

            if (Object.keys(body).length === 0) {
                return { statusCode: 400, body: JSON.stringify({ error: "El cuerpo de la solicitud no puede estar vacío" }) };
            }

            const response = await this.storeData.execute(tbName, body);

            // ✅ Usamos la instancia para llamar deleteCache
            await this.dbInstance.deleteCache(tbName, "fusionados-cache");
            console.log("🚀 Caché eliminado después de almacenar datos.");

            return { statusCode: 201, body: JSON.stringify(response) };
        } catch (error) {
            console.error("❌ Error al almacenar datos:", error);
            return { statusCode: 500, body: JSON.stringify({ error: "Error interno del servidor" }) };
        }
    }
}
