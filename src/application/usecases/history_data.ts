import { randomUUID } from "crypto"; // Importa `randomUUID` para generar IDs únicos si faltan
import { DB } from "../../infrastructure/database/db";

interface HistoryItem {
    id: string;
    timestamp: string;
    [key: string]: any;
}

class HistoryData {
    private db: DB; // Ahora recibe una instancia de DB

    constructor(db: DB) {
        this.db = db;
    }

    async execute(tableName: string): Promise<HistoryItem[]> {
        const items = await this.db.all(tableName);

        return items
            .map(item => ({
                id: item.id || randomUUID(), // Generar un ID si no existe
                timestamp: item.timestamp || new Date().toISOString(), // Asegurar timestamp
                ...item
            }))
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()); // Ordenar por fecha descendente
    }
}

export default HistoryData;
