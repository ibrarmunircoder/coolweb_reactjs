import {
  customListUserStores,
  customGetUserStoreProducts,
} from '@/graphql/custom-queries';
import { execute } from '@/services/api/coolweb-graphql/api-utils';

export const fetchUserStoreProducts = async (storeName: string) => {
  const response = await execute(
    {
      statement: customGetUserStoreProducts,
      name: 'getUserStoreProducts',
    },
    {
      store_name: storeName,
    }
  );

  return response.items[0]?.products || [];
};
export const fetchUserStores = async (userId: string) => {
  const response = await execute(
    {
      statement: customListUserStores,
      name: 'listUserStores',
    },
    {
      user_id: userId,
    }
  );

  return response.items;
};
