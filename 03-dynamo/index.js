import { DeleteItemCommand, GetItemCommand, PutItemCommand, ScanCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import DBClient from "./dbClient.js";
import { v4 as uuidv4 } from 'uuid';

export const handler = async (event)=>{

  //console.log("request", JSON.stringify(event, undefined,2))
  let body = {};

  try {
    switch (event.httpMethod) {
      case "GET":
        body = (event.pathParameters) 
          ? await getDataById(event.pathParameters.id)
          : await getData();
        break;
      case "POST":
        body = await createData(event);
        break;
      case "PUT":
        body = await updateData(event);
        break;
      case "DELETE":
        body = await deleteData(event.pathParameters.id);
        break;
      default:
        throw new Error("ruta no soportada")
    }
  
    const response= {
      statusCode: 200,
      body: JSON.stringify({"resp": body})
    }
    return response;
  } catch (error) {
    return {
      statusCode: 500, 
      body: JSON.stringify({
        message: "Error en lambda",
        errorMesage: error.message,
        errorStack: error.stack
      })
    }
  }

}

const getDataById = async (id) => {
  try {
    const params = {TableName: process.env.DYNAMODB_TABLE,
      Key: marshall({id:id})}

      const {Item} = await DBClient.send(new GetItemCommand(params));
      return Item? unmarshall(Item): {};
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const getData = async () => {
  try {
    const params = {TableName: process.env.DYNAMODB_TABLE}

      const {Items} = await DBClient.send(new ScanCommand(params));
      return (Items) ? Items.map((item) => unmarshall(item)) : {}
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const createData = async (event) =>{
  try {
    const dataToCreate = JSON.parse(event.body)
    const id = uuidv4();
    dataToCreate.id = id;

    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: marshall(dataToCreate || {})
    }

    const createResult = await DBClient.send(new PutItemCommand(params))
    return createResult;

  } catch (error) {
    console.error(error);
    throw error;
  }
}

const updateData = async (event) =>{
  try {
    const dataToUpdate = JSON.parse(event.body);
    const keys = Object.keys(dataToUpdate);

    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: marshall({id: event.pathParameters.id}),
      UpdateExpression: `SET ${keys.map((_, index) => `#key${index} = :value${index}`).join(", ")}`,
      ExpressionAttributeNames: keys.reduce((acc, key, index) => ({
          ...acc,
          [`#key${index}`]: key,
      }), {}),
      ExpressionAttributeValues: marshall(keys.reduce((acc, key, index) => ({
          ...acc,
          [`:value${index}`]: dataToUpdate[key],
      }), {})),
    }

    const updateResult = await DBClient.send(new UpdateItemCommand(params));
    return updateResult;
  } catch (error) {
    console.error(error);
    throw error;    
  }
}

const deleteData = async (id) => {
  try {
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: marshall({id:id})
    }

      const deleteResult = await DBClient.send(new DeleteItemCommand(params));
      return deleteResult;
  } catch (error) {
    console.error(error);
    throw error;
  }
}