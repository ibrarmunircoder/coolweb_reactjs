export const createUserStores = /* GraphQL */ `
  mutation CreateUserStores(
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
        images {
          id
          width
          height
          src
          __typename
        }
        __typename
      }

      __typename
    }
  }
`;
