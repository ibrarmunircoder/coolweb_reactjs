import { createProductBlogs, updateProductBlogs } from '@/graphql/mutations';
import { execute } from './api-utils';
import { CreateProductBlogsInput } from '@/API';

export const updateProductBlogMetadata = async (
  blogId: string,
  metadata: string
) => {
  const blog = await execute(
    {
      statement: updateProductBlogs,
      name: 'updateProductBlogs',
    },
    {
      input: {
        id: blogId,
        metadata,
      },
    }
  );
  return blog;
};

export const saveProductBlogContent = async (
  input: CreateProductBlogsInput
) => {
  const response = await execute(
    {
      statement: createProductBlogs,
      name: 'createProductBlogs',
    },
    {
      input,
    }
  );

  return response;
};
