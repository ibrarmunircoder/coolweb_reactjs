// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { UserStores, Product, ProductImage } = initSchema(schema);

export {
  UserStores,
  Product,
  ProductImage
};