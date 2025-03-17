
const StoreData = async (repository, tableName, data) => {
    const item = { id: require("uuid").v4(), ...data };
    await repository.save(tableName, item);
    return item;
};

module.exports = StoreData;