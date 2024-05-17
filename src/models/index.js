// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { UserStores, ProductBlogs, Product, ProductImage } = initSchema(schema);

export {
  UserStores,
  ProductBlogs,
  Product,
  ProductImage
};