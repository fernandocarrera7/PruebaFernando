import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { defaultResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { Product } from "../../entities/Product";
import { v4 as uuidv4 } from "uuid";
import * as AWS from "aws-sdk";
//var dynamo = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.PRODUCT_TABLE;
const region = process.env.REGION;
var product: Product = new Product();
const documentClient = new AWS.DynamoDB.DocumentClient({ region: region });

import schema from "./schema";

const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  try {
    product = event.body;
    console.log(JSON.stringify(product));

    product.id = uuidv4();
    const params = {
      TableName: tableName,
      Item: {
        ...product,
      },
    };
    console.log(JSON.stringify(params));

    try {
      let response = await documentClient.put(params).promise();
      console.log(JSON.stringify(response));
      return defaultResponse(200, { ...product });
    } catch (error) {
      console.log(error);
      return defaultResponse(500, error);
    }
  } catch (error) {
    throw new Error(`Error : ${error.message}`);
  }
};

export const main = middyfy(createProduct);
