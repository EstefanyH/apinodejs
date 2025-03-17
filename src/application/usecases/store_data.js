class StoreData {
    constructor(db) {
        this.db = db;
    }

    async execute(tableName, data) {
        await this.db.save(tableName, data);
        return { message: "Datos almacenados correctamente", data };
    }
}

export default StoreData;