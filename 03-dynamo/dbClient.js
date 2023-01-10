import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const region = "us-east-1"

const DBClient = new DynamoDBClient({region: region})
export default DBClient;
