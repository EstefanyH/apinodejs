interface Database {
    save(tableName: string, data: Record<string, any>): Promise<void>;
}

class StoreData {
    private db: Database;

    constructor(db: Database) {
        this.db = db;
    }

    async execute(tableName: string, data: Record<string, any>): Promise<{ message: string; data: Record<string, any> }> {
        await this.db.save(tableName, data);
        return { message: "Datos almacenados correctamente", data };
    }
}

export default StoreData;
