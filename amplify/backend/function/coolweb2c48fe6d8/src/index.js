/* Amplify Params - DO NOT EDIT
	API_COOLWEB2_GRAPHQLAPIENDPOINTOUTPUT
	API_COOLWEB2_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */ import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import httpSecurityHeaders from '@middy/http-security-headers';
import jsonBodyParser from '@middy/http-json-body-parser';
import cors from '@middy/http-cors';
import he from 'he';
import axios from 'axios';
import { handleError } from './helpers.js';
import { addUserStore } from './api.js';

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
      user_id: userId, // Use User from the event body directly
      store_name: storeName,
      products: storeProducts,
      store_url: shopifyUrl,
      timestamp: new Date().toISOString(),
    };
    // Save to DynamoDB
    await addUserStore(input);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Data saved to DynamoDB successfully!' }),
    };
  } catch (error) {
    console.error(error);
    handleError(error);
  }
};

export const handler = middy()
  .use(cors())
  .use(jsonBodyParser())
  .use(httpSecurityHeaders())
  .use(httpErrorHandler())
  .handler(handleUserStoreProducts);
