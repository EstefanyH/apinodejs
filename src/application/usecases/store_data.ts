export interface Database {
    save(tableName: string, data: Record<string, any>): Promise<void>;
    deleteCache(tableName: string, cacheKey: string): Promise<void>; // 🗑 Nuevo método para limpiar caché
}

class StoreData {
    private db: Database;

    constructor(db: Database) {
        this.db = db;
    }

    async execute(tableName: string, data: Record<string, any>): Promise<{ message: string; data: Record<string, any> }> {
        await this.db.save(tableName, data);

        // 🗑 Eliminar caché después de almacenar nuevos datos
        const cacheKey = "fusionados-cache";
        await this.db.deleteCache(tableName, cacheKey);
        console.log(`🚀 Caché "${cacheKey}" eliminado después de almacenar datos.`);

        return { message: "Datos almacenados correctamente", data };
    }
}

export default StoreData;
