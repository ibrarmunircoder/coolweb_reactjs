import { get } from 'aws-amplify/api';
import { Amplify } from 'aws-amplify';

const RestConfig = Amplify.getConfig().API!.REST!;
const ApiName = Object.keys(RestConfig)[0];

export const getUserProducts = async () => {
  const getOperation = get({
    apiName: ApiName,
    path: '/user/list-products',
  });
  const { body } = await getOperation.response;
  const response = await body.json();
  return response;
};
