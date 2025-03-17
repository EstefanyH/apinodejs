import aws from 'aws-sdk';
import dynamoDB from aws.DynamoDB.DocumentClient();

class DB {
    static async save (tbName, item) {
        await dynamoDB.put({ TableName: tbName, Item: item }).promise();
    }

    static async all(tbName) {
        const result = await dynamoDB.scan({ TableName: tbName }).promise();
        return result.Items;
    }
}

export default DB;
