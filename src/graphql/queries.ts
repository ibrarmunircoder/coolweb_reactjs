/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getUserStores = /* GraphQL */ `query GetUserStores($user_id: String!, $timestamp: AWSDateTime!) {
  getUserStores(user_id: $user_id, timestamp: $timestamp) {
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
` as GeneratedQuery<
  APITypes.GetUserStoresQueryVariables,
  APITypes.GetUserStoresQuery
>;
export const listUserStores = /* GraphQL */ `query ListUserStores(
  $user_id: String
  $timestamp: ModelStringKeyConditionInput
  $filter: ModelUserStoresFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listUserStores(
    user_id: $user_id
    timestamp: $timestamp
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      user_id
      timestamp
      store_name
      store_url
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserStoresQueryVariables,
  APITypes.ListUserStoresQuery
>;
export const getUserStoreProducts = /* GraphQL */ `query GetUserStoreProducts(
  $store_name: String!
  $sortDirection: ModelSortDirection
  $filter: ModelUserStoresFilterInput
  $limit: Int
  $nextToken: String
) {
  getUserStoreProducts(
    store_name: $store_name
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      user_id
      timestamp
      store_name
      store_url
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetUserStoreProductsQueryVariables,
  APITypes.GetUserStoreProductsQuery
>;
export const getProductBlogs = /* GraphQL */ `query GetProductBlogs($id: ID!) {
  getProductBlogs(id: $id) {
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
    id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetProductBlogsQueryVariables,
  APITypes.GetProductBlogsQuery
>;
export const listProductBlogs = /* GraphQL */ `query ListProductBlogs(
  $filter: ModelProductBlogsFilterInput
  $limit: Int
  $nextToken: String
) {
  listProductBlogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      content
      user_id
      metadata
      store_name
      store_url
      id
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListProductBlogsQueryVariables,
  APITypes.ListProductBlogsQuery
>;
export const getUserProductsBlogs = /* GraphQL */ `query GetUserProductsBlogs(
  $user_id: String!
  $sortDirection: ModelSortDirection
  $filter: ModelProductBlogsFilterInput
  $limit: Int
  $nextToken: String
) {
  getUserProductsBlogs(
    user_id: $user_id
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      content
      user_id
      metadata
      store_name
      store_url
      id
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetUserProductsBlogsQueryVariables,
  APITypes.GetUserProductsBlogsQuery
>;
