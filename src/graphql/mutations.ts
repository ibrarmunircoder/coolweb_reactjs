/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createUserStores = /* GraphQL */ `mutation CreateUserStores(
  $input: CreateUserStoresInput!
  $condition: ModelUserStoresConditionInput
) {
  createUserStores(input: $input, condition: $condition) {
    user_id
    timestamp
    store_name
    store_url
    products {
      product_id
      title
      handle
      body_html
      __typename
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserStoresMutationVariables,
  APITypes.CreateUserStoresMutation
>;
export const updateUserStores = /* GraphQL */ `mutation UpdateUserStores(
  $input: UpdateUserStoresInput!
  $condition: ModelUserStoresConditionInput
) {
  updateUserStores(input: $input, condition: $condition) {
    user_id
    timestamp
    store_name
    store_url
    products {
      product_id
      title
      handle
      body_html
      __typename
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserStoresMutationVariables,
  APITypes.UpdateUserStoresMutation
>;
export const deleteUserStores = /* GraphQL */ `mutation DeleteUserStores(
  $input: DeleteUserStoresInput!
  $condition: ModelUserStoresConditionInput
) {
  deleteUserStores(input: $input, condition: $condition) {
    user_id
    timestamp
    store_name
    store_url
    products {
      product_id
      title
      handle
      body_html
      __typename
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUserStoresMutationVariables,
  APITypes.DeleteUserStoresMutation
>;
export const createProductBlogs = /* GraphQL */ `mutation CreateProductBlogs(
  $input: CreateProductBlogsInput!
  $condition: ModelProductBlogsConditionInput
) {
  createProductBlogs(input: $input, condition: $condition) {
    content
    user_id
    metadata
    store_name
    store_url
    products {
      product_id
      title
      handle
      body_html
      __typename
    }
    created_at
    id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateProductBlogsMutationVariables,
  APITypes.CreateProductBlogsMutation
>;
export const updateProductBlogs = /* GraphQL */ `mutation UpdateProductBlogs(
  $input: UpdateProductBlogsInput!
  $condition: ModelProductBlogsConditionInput
) {
  updateProductBlogs(input: $input, condition: $condition) {
    content
    user_id
    metadata
    store_name
    store_url
    products {
      product_id
      title
      handle
      body_html
      __typename
    }
    created_at
    id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateProductBlogsMutationVariables,
  APITypes.UpdateProductBlogsMutation
>;
export const deleteProductBlogs = /* GraphQL */ `mutation DeleteProductBlogs(
  $input: DeleteProductBlogsInput!
  $condition: ModelProductBlogsConditionInput
) {
  deleteProductBlogs(input: $input, condition: $condition) {
    content
    user_id
    metadata
    store_name
    store_url
    products {
      product_id
      title
      handle
      body_html
      __typename
    }
    created_at
    id
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteProductBlogsMutationVariables,
  APITypes.DeleteProductBlogsMutation
>;
