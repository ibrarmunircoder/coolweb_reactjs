import { ModelSortDirection } from '@/API';
import {
  customListUserStores,
  customGetUserStoreProducts,
} from '@/graphql/custom-queries';
import { getProductBlogs, getUserProductsBlogs } from '@/graphql/queries';
import { execute } from '@/services/api/coolweb-graphql/api-utils';

export const getProductBlogById = async (id: string) => {
  const blog = await execute(
    {
      statement: getProductBlogs,
      name: 'getProductBlogs',
    },
    {
      id,
    }
  );

  return blog;
};

export const getUserBlogs = async (userId: string) => {
  const blogs = await execute(
    {
      statement: getUserProductsBlogs,
      name: 'getUserProductsBlogs',
    },
    {
      user_id: userId,
      sortDirection: ModelSortDirection.DESC,
    }
  );

  return blogs.items || [];
};

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
