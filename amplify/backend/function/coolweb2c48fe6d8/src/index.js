import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import httpSecurityHeaders from '@middy/http-security-headers';
import jsonBodyParser from '@middy/http-json-body-parser';
import cors from '@middy/http-cors';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import createError from 'http-errors';
import he from 'he';
import axios from 'axios';

const client = new DynamoDBClient({});
const TABLE_NAME = `UserStoreProducts-${process.env.ENV}`;
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const handleUserStoreProducts = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const IDP_REGEX = /.*\/.*,(.*)\/(.*):CognitoSignIn:(.*)/;
  const authProvider =
    event.requestContext.identity.cognitoAuthenticationProvider;
  const [, , , userId] = authProvider.match(IDP_REGEX);
  const { shopifyUrl, storeName } = event.body;

  let storeProducts = [];
  let totalPages = 1; // You might want to determine this dynamically based on the API response

  let fetchCalls = [];
  for (let i = 1; i <= totalPages; i++) {
    fetchCalls.push(
      axios.get(`${shopifyUrl}/products.json/?limit=250&page=${i}`)
    );
  }

  try {
    const responses = await Promise.all(fetchCalls);
    responses.forEach((response) => {
      const filteredProducts = response.data.products.map((product) => {
        return {
          product_id: product.id,
          title: product.title,
          handle: product.handle,
          body_html: he.encode(product.body_html), // Encode HTML content
          images: product.images.map((image) => ({
            id: image.id,
            src: image.src,
            width: image.width,
            height: image.height,
          })),
        };
      });
      storeProducts = storeProducts.concat(filteredProducts);
    });

    // Prepare data for DynamoDB
    const input = {
      TableName: TABLE_NAME,
      Item: marshall({
        user_id: userId, // Use User from the event body directly
        store_name: storeName,
        products: storeProducts,
        timestamp: new Date().toISOString(),
      }),
    };
    // Save to DynamoDB
    const command = new PutItemCommand(input);
    await client.send(command);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Data saved to DynamoDB successfully!' }),
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    console.error('DynamoDB operation error:', error);
    throw new createError(500, 'Failed to fetch or save data', {
      expose: true,
    });
  }
};

export const handler = middy()
  .use(cors())
  .use(jsonBodyParser())
  .use(httpSecurityHeaders())
  .use(httpErrorHandler())
  .handler(handleUserStoreProducts);
