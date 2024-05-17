/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateUserStores = /* GraphQL */ `subscription OnCreateUserStores(
  $filter: ModelSubscriptionUserStoresFilterInput
) {
  onCreateUserStores(filter: $filter) {
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
}
` as GeneratedSubscription<
  APITypes.OnCreateUserStoresSubscriptionVariables,
  APITypes.OnCreateUserStoresSubscription
>;
export const onUpdateUserStores = /* GraphQL */ `subscription OnUpdateUserStores(
  $filter: ModelSubscriptionUserStoresFilterInput
) {
  onUpdateUserStores(filter: $filter) {
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
}
` as GeneratedSubscription<
  APITypes.OnUpdateUserStoresSubscriptionVariables,
  APITypes.OnUpdateUserStoresSubscription
>;
export const onDeleteUserStores = /* GraphQL */ `subscription OnDeleteUserStores(
  $filter: ModelSubscriptionUserStoresFilterInput
) {
  onDeleteUserStores(filter: $filter) {
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
}
` as GeneratedSubscription<
  APITypes.OnDeleteUserStoresSubscriptionVariables,
  APITypes.OnDeleteUserStoresSubscription
>;
export const onCreateProductBlogs = /* GraphQL */ `subscription OnCreateProductBlogs(
  $filter: ModelSubscriptionProductBlogsFilterInput
) {
  onCreateProductBlogs(filter: $filter) {
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
      images {
        id
        width
        height
        src
        __typename
      }
      __typename
    }
    id
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateProductBlogsSubscriptionVariables,
  APITypes.OnCreateProductBlogsSubscription
>;
export const onUpdateProductBlogs = /* GraphQL */ `subscription OnUpdateProductBlogs(
  $filter: ModelSubscriptionProductBlogsFilterInput
) {
  onUpdateProductBlogs(filter: $filter) {
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
      images {
        id
        width
        height
        src
        __typename
      }
      __typename
    }
    id
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateProductBlogsSubscriptionVariables,
  APITypes.OnUpdateProductBlogsSubscription
>;
export const onDeleteProductBlogs = /* GraphQL */ `subscription OnDeleteProductBlogs(
  $filter: ModelSubscriptionProductBlogsFilterInput
) {
  onDeleteProductBlogs(filter: $filter) {
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
      images {
        id
        width
        height
        src
        __typename
      }
      __typename
    }
    id
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteProductBlogsSubscriptionVariables,
  APITypes.OnDeleteProductBlogsSubscription
>;
