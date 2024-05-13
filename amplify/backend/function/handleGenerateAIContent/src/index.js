import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import httpSecurityHeaders from '@middy/http-security-headers';
import cors from '@middy/http-cors';
// import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
// import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import jsonBodyParser from '@middy/http-json-body-parser';
import createError from 'http-errors';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env['ANTHROPIC_API_KEY'],
});

// const client = new DynamoDBClient({});
// const TABLE_NAME = `UserStoreProducts-${process.env.ENV}`;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const handleGenerateAiContent = async (event) => {
  try {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    const products = event.body.products;

    let productInfo = '';
    const storeUrl = 'items[0].store_url';
    const storeName = 'items[0].store_name';
    for (let product of products) {
      var images_html = '';
      if (product.images !== undefined) {
        images_html = product.images
          .map(function (image) {
            return '<img src="' + image.src + '" style="width: 100%;">';
          })
          .join('');
      }
      productInfo += 'Title: ' + (product.title || 'N/A') + '<br>';
      productInfo += 'Handle: ' + (product.handle || 'N/A') + '<br>';
      productInfo += 'Images: ' + images_html + '<br>';
      productInfo +=
        'Product Type: ' + (product.product_type || 'N/A') + '<br>';
      productInfo += 'Tags: ' + (product.tags || 'N/A') + '<br>';
      productInfo +=
        'Description: ' + (product.body_html || 'N/A').trim() + '<br><br>';
    }
    console.log(productInfo);

    const message = await anthropic.messages.create({
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: generatePrompt(storeUrl, storeName, productInfo),
        },
      ],
      model: 'claude-3-opus-20240229',
    });
    console.log(message.content);
    return {
      statusCode: 200,
      body: JSON.stringify(message.content),
    };
  } catch (error) {
    console.error('Error', error);
    throw new createError(500, 'Error while generating blog post.', {
      expose: true,
    });
  }
};

function generatePrompt(storeUrl, storeName, productInfo) {
  return `
  write a blog article with 1000 word minimum for my store ${storeName} based on our product information below these instructions

Instructions:
- generate a blog article with html tags and not a complete html file with head and body, we only need the html tags wrapped around the content. Include images and links too. Just use the h2, h3, h4, p, links, images html only. Don't include the blog title in the output at the top. Exclude it.
- Links to the product(s)
- don't mention anything about getting the product now because supplies are limited and may not be available by the time they read this.
- don't include price, sku or weight or category in the details/specifications.
- don't say "view more information" or anything similar since the link pages might not actually have more information.
- using the image(s), describe the details of the product(s)
- please make sure the image tags have a style added to it of width: 100%;
- make sure the landing page links do not have the main url ${storeUrl}, and instead start with /products to have the full URL from that point. The main domain part is not needed.
- the image urls can be the full thing
product information: ${productInfo}
  `;
}

export const handler = middy()
  .use(cors())
  .use(httpSecurityHeaders())
  .use(jsonBodyParser())
  .use(httpErrorHandler())
  .handler(handleGenerateAiContent);
