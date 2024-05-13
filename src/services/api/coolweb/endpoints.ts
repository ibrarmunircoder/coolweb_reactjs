import { get, post } from 'aws-amplify/api';
import { Amplify } from 'aws-amplify';
import { Product } from '@/types';

const RestConfig = Amplify.getConfig().API!.REST!;
const ApiName = Object.keys(RestConfig)[0];

export const getUserProducts = async () => {
  const getOperation = get({
    apiName: ApiName,
    path: '/user/list-products',
  });
  const { body } = await getOperation.response;
  const response = await body.json();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const products = response?.map((userStoreRecord) => userStoreRecord.products);
  return products?.flat() || [];
};

export const generateBlogPost = async (products: Product[]) => {
  const postOperation = post({
    apiName: ApiName,
    path: '/generate-content',
    options: {
      body: {
        products,
      },
    },
  });
  const { body } = await postOperation.response;
  const response = await body.json();
  return response;
};
