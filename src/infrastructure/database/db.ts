import "dotenv/config";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

// Definir interfaz genérica para los datos a almacenar
export interface DynamoDBItem {
    [key: string]: any;
}

// Configurar el cliente de DynamoDB con credenciales y región
const client = new DynamoDBClient({
    region: process.env.AWS_REGION as string,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
    }
});

const dynamoDB = DynamoDBDocumentClient.from(client);

export class DB {
    /**
     * Guarda un ítem en la tabla de DynamoDB.
     * @param tbName Nombre de la tabla
     * @param item Objeto a guardar
     */
    static async save(tbName: string, item: DynamoDBItem): Promise<void> {
        console.log("Guardando en la tabla DynamoDB:", tbName);
        const command = new PutCommand({ TableName: tbName, Item: item });
        await dynamoDB.send(command);
    }

    /**
     * Obtiene todos los ítems de una tabla de DynamoDB.
     * @param tbName Nombre de la tabla
     * @returns Array de objetos obtenidos
     */
    static async all(tbName: string): Promise<DynamoDBItem[]> {
        console.log("Consultando tabla DynamoDB:", tbName);
        const command = new ScanCommand({ TableName: tbName });
        const result = await dynamoDB.send(command);
        return result.Items ?? [];
    }
}
