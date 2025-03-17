
const GetHistory = async (repository, tableName) => {
    return await repository.all(tableName);
};

module.exports = GetHistory;