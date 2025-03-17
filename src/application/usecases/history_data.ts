interface HistoryItem {
    id: string;
    timestamp: string; // o Date si prefieres
    [key: string]: any; // Permite propiedades adicionales
}

class HistoryData {
    private db: { all: (tableName: string) => Promise<Record<string, any>[]> };

    constructor(db: { all: (tableName: string) => Promise<Record<string, any>[]> }) {
        this.db = db;
    }

    async execute(tableName: string): Promise<HistoryItem[]> {
        const items = await this.db.all(tableName);

        // Asegurar que cada item tenga 'timestamp'
        const historyItems: HistoryItem[] = items.map(item => ({
            id: item.id || "", // Manejar ID opcionalmente
            timestamp: item.timestamp || new Date().toISOString(), // Asegurar timestamp
            ...item
        }));

        return historyItems.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }
}

export default HistoryData;
