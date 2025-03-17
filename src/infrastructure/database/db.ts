import "dotenv/config";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";

// Definir interfaz para la base de datos
export interface Database {
    save(tableName: string, data: Record<string, any>): Promise<void>;
    all(tableName: string): Promise<Record<string, any>[]>;
    getCache(tableName: string, cacheKey: string): Promise<Record<string, any> | null>;
    setCache(tableName: string, cacheKey: string, data: any): Promise<void>;
    deleteCache(tableName: string, cacheKey: string): Promise<void>;
}

// Configurar cliente DynamoDB
const client = new DynamoDBClient({
    region: process.env.AWS_REGION as string,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
    }
});

const dynamoDB = DynamoDBDocumentClient.from(client);

export class DB implements Database {
    private CACHE_DURATION = 30 * 60; // ⏳ 30 minutos

    async save(tableName: string, data: Record<string, any>): Promise<void> {
        console.log(`💾 Guardando en DynamoDB: ${tableName}`);
        await dynamoDB.send(new PutCommand({ TableName: tableName, Item: data }));
    }
    
    async all(tableName: string): Promise<Record<string, any>[]> {
        console.log(`🔍 Escaneando tabla: ${tableName}`);
        const response = await dynamoDB.send(new ScanCommand({ TableName: tableName }));
        return response.Items || [];
    }

    async getCache(tableName: string, cacheKey: string): Promise<Record<string, any> | null> {
        console.log(`🔎 Buscando en caché: ${cacheKey}`);
        const now = Math.floor(Date.now() / 1000);

        const cacheResult = await dynamoDB.send(new GetCommand({
            TableName: tableName,
            Key: { id: cacheKey }
        }));

        if (cacheResult.Item && cacheResult.Item.expiresAt > now) {
            console.log("📌 Caché válido encontrado");
            return cacheResult.Item.data;
        }

        console.log("⚠️ Caché expirado o no encontrado");
        return null;
    }

    async setCache(tableName: string, cacheKey: string, data: any): Promise<void> {
        console.log(`💾 Guardando en caché: ${cacheKey}`);
        const now = Math.floor(Date.now() / 1000);

        await dynamoDB.send(new PutCommand({
            TableName: tableName,
            Item: {
                id: cacheKey,
                data: data,
                expiresAt: now + this.CACHE_DURATION, // ⏳ Expira en 30 min
            }
        }));
    }

    async deleteCache(tableName: string, cacheKey: string): Promise<void> {
        console.log(`🗑 Eliminando caché: ${cacheKey}`);
        await dynamoDB.send(new DeleteCommand({ TableName: tableName, Key: { id: cacheKey } }));
    }
}
