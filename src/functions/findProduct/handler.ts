import { defaultResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import  * as AWS from 'aws-sdk';
const tableName=  process.env.PRODUCT_TABLE;
const region=  process.env.REGION;
const documentClient = new AWS.DynamoDB.DocumentClient({ region: region });

const findProduct:any = async (event) => {  
  try {
    const params = {
      TableName:tableName      
    }
    console.log(JSON.stringify(params));
  
    try {   
      let response = await documentClient.scan(params).promise();
      console.log(JSON.stringify(response));    
      return defaultResponse(200,{response});  
    } catch (error) {
      console.log(error);
      return defaultResponse(500,error);
    }
  } catch (error) {
    throw new Error(`Error : ${error.message}`);
  }
  
};

export const main = middyfy(findProduct);
