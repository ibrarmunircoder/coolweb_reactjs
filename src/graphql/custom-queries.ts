/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from '../API';
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const customGetUserStoreProducts =
  /* GraphQL */ `query CustomGetUserStoreProducts(
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
      products {
        product_id
        title
        handle
        body_html
        images {
        id
        width
        height
        src
        __typename
      }
        __typename
      }
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
    APITypes.GetUserStoreProductsQueryVariables,
    APITypes.GetUserStoreProductsQuery
  >;

export const customListUserStores = /* GraphQL */ `query CustomListUserStores(
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
       
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
  ` as GeneratedQuery<
  APITypes.ListUserStoresQueryVariables,
  APITypes.ListUserStoresQuery
>;
