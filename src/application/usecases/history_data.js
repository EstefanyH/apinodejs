class HistoryData {
    constructor(db) {
        this.db = db;
    }

    async execute(tableName) {
        const items = await this.db.all(tableName);
        return items.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Orden cronológico
    }
}

export default HistoryData;