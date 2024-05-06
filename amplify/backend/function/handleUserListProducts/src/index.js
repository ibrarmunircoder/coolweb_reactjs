import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import httpSecurityHeaders from '@middy/http-security-headers';
import cors from '@middy/http-cors';
import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import createError from 'http-errors';

const client = new DynamoDBClient({});
const TABLE_NAME = `UserStoreProducts-${process.env.ENV}`;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const handleListUserProducts = async (event) => {
  try {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    const IDP_REGEX = /.*\/.*,(.*)\/(.*):CognitoSignIn:(.*)/;
    const authProvider =
      event.requestContext.identity.cognitoAuthenticationProvider;
    const [, , , userId] = authProvider.match(IDP_REGEX);

    const params = {
      TableName: TABLE_NAME,
      KeyConditionExpression: 'user_id = :userId',
      ExpressionAttributeValues: marshall({
        ':userId': userId,
      }),
    };
    const command = new QueryCommand(params);
    const data = await client.send(command);
    const items = data.Items.map((item) => unmarshall(item));
    return {
      statusCode: 200,
      body: JSON.stringify(items),
    };
  } catch (error) {
    console.error('Product Listing Error', error);
    throw new createError(500, 'Product Listing Error', { expose: true });
  }
};

export const handler = middy()
  .use(cors())
  .use(httpSecurityHeaders())
  .use(httpErrorHandler())
  .handler(handleListUserProducts);
