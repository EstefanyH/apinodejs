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

    /**
     * @swagger
     * /almacenar:
     *   post:
     *     summary: Almacena datos en la base de datos
     *     description: Guarda un nuevo registro en la tabla FusionadosData y elimina la caché relacionada.
     *     tags:
     *       - Storage
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               id:
     *                 type: string
     *                 example: "12345"
     *               nombre:
     *                 type: string
     *                 example: "Ejemplo"
     *               valor:
     *                 type: number
     *                 example: 100
     *     responses:
     *       201:
     *         description: Datos almacenados exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               example:
     *                 id: "12345"
     *                 nombre: "Ejemplo"
     *                 valor: 100
     *       400:
     *         description: Error en la solicitud (datos requeridos o vacíos)
     *       500:
     *         description: Error interno del servidor
     */
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
