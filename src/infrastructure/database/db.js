import "dotenv/config";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const dynamoDB = DynamoDBDocumentClient.from(client);

class DB {
    static async save(tbName, item) {
        console.log("Consultando tabla DynamoDB:", tbName);
        const command = new PutCommand({ TableName: tbName, Item: item });
        await dynamoDB.send(command);
    }

    static async all(tbName) {
        console.log("Consultando tabla DynamoDB:", tbName);
        const command = new ScanCommand({ TableName: tbName });
        const result = await dynamoDB.send(command);
        return result.Items;
    }
}

export default DB;
