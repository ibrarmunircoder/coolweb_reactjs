/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserStoresInput = {
  user_id: string,
  timestamp: string,
  store_name: string,
  store_url: string,
  products: Array< ProductInput >,
  _version?: number | null,
};

export type ProductInput = {
  product_id: string,
  title: string,
  handle: string,
  body_html?: string | null,
  images: Array< ProductImageInput >,
};

export type ProductImageInput = {
  id: string,
  width?: number | null,
  height?: number | null,
  src: string,
};

export type ModelUserStoresConditionInput = {
  store_name?: ModelStringInput | null,
  store_url?: ModelStringInput | null,
  and?: Array< ModelUserStoresConditionInput | null > | null,
  or?: Array< ModelUserStoresConditionInput | null > | null,
  not?: ModelUserStoresConditionInput | null,
  _deleted?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UserStores = {
  __typename: "UserStores",
  user_id: string,
  timestamp: string,
  store_name: string,
  store_url: string,
  products:  Array<Product >,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type Product = {
  __typename: "Product",
  product_id: string,
  title: string,
  handle: string,
  body_html?: string | null,
  images:  Array<ProductImage >,
};

export type ProductImage = {
  __typename: "ProductImage",
  id: string,
  width?: number | null,
  height?: number | null,
  src: string,
};

export type UpdateUserStoresInput = {
  user_id: string,
  timestamp: string,
  store_name?: string | null,
  store_url?: string | null,
  products?: Array< ProductInput > | null,
  _version?: number | null,
};

export type DeleteUserStoresInput = {
  user_id: string,
  timestamp: string,
  _version?: number | null,
};

export type CreateProductBlogsInput = {
  content: string,
  user_id: string,
  metadata?: string | null,
  store_name: string,
  store_url: string,
  products: Array< ProductInput >,
  id?: string | null,
  _version?: number | null,
};

export type ModelProductBlogsConditionInput = {
  content?: ModelStringInput | null,
  user_id?: ModelStringInput | null,
  metadata?: ModelStringInput | null,
  store_name?: ModelStringInput | null,
  store_url?: ModelStringInput | null,
  and?: Array< ModelProductBlogsConditionInput | null > | null,
  or?: Array< ModelProductBlogsConditionInput | null > | null,
  not?: ModelProductBlogsConditionInput | null,
  _deleted?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ProductBlogs = {
  __typename: "ProductBlogs",
  content: string,
  user_id: string,
  metadata?: string | null,
  store_name: string,
  store_url: string,
  products:  Array<Product >,
  id: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateProductBlogsInput = {
  content?: string | null,
  user_id?: string | null,
  metadata?: string | null,
  store_name?: string | null,
  store_url?: string | null,
  products?: Array< ProductInput > | null,
  id: string,
  _version?: number | null,
};

export type DeleteProductBlogsInput = {
  id: string,
  _version?: number | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelUserStoresFilterInput = {
  user_id?: ModelStringInput | null,
  timestamp?: ModelStringInput | null,
  store_name?: ModelStringInput | null,
  store_url?: ModelStringInput | null,
  id?: ModelIDInput | null,
  and?: Array< ModelUserStoresFilterInput | null > | null,
  or?: Array< ModelUserStoresFilterInput | null > | null,
  not?: ModelUserStoresFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelUserStoresConnection = {
  __typename: "ModelUserStoresConnection",
  items:  Array<UserStores | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelProductBlogsFilterInput = {
  content?: ModelStringInput | null,
  user_id?: ModelStringInput | null,
  metadata?: ModelStringInput | null,
  store_name?: ModelStringInput | null,
  store_url?: ModelStringInput | null,
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelProductBlogsFilterInput | null > | null,
  or?: Array< ModelProductBlogsFilterInput | null > | null,
  not?: ModelProductBlogsFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelProductBlogsConnection = {
  __typename: "ModelProductBlogsConnection",
  items:  Array<ProductBlogs | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelSubscriptionUserStoresFilterInput = {
  user_id?: ModelSubscriptionStringInput | null,
  timestamp?: ModelSubscriptionStringInput | null,
  store_name?: ModelSubscriptionStringInput | null,
  store_url?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionUserStoresFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserStoresFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionProductBlogsFilterInput = {
  content?: ModelSubscriptionStringInput | null,
  user_id?: ModelSubscriptionStringInput | null,
  metadata?: ModelSubscriptionStringInput | null,
  store_name?: ModelSubscriptionStringInput | null,
  store_url?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionProductBlogsFilterInput | null > | null,
  or?: Array< ModelSubscriptionProductBlogsFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type CreateUserStoresMutationVariables = {
  input: CreateUserStoresInput,
  condition?: ModelUserStoresConditionInput | null,
};

export type CreateUserStoresMutation = {
  createUserStores?:  {
    __typename: "UserStores",
    user_id: string,
    timestamp: string,
    store_name: string,
    store_url: string,
    products:  Array< {
      __typename: "Product",
      product_id: string,
      title: string,
      handle: string,
      body_html?: string | null,
      images:  Array< {
        __typename: "ProductImage",
        id: string,
        width?: number | null,
        height?: number | null,
        src: string,
      } >,
    } >,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateUserStoresMutationVariables = {
  input: UpdateUserStoresInput,
  condition?: ModelUserStoresConditionInput | null,
};

export type UpdateUserStoresMutation = {
  updateUserStores?:  {
    __typename: "UserStores",
    user_id: string,
    timestamp: string,
    store_name: string,
    store_url: string,
    products:  Array< {
      __typename: "Product",
      product_id: string,
      title: string,
      handle: string,
      body_html?: string | null,
      images:  Array< {
        __typename: "ProductImage",
        id: string,
        width?: number | null,
        height?: number | null,
        src: string,
      } >,
    } >,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteUserStoresMutationVariables = {
  input: DeleteUserStoresInput,
  condition?: ModelUserStoresConditionInput | null,
};

export type DeleteUserStoresMutation = {
  deleteUserStores?:  {
    __typename: "UserStores",
    user_id: string,
    timestamp: string,
    store_name: string,
    store_url: string,
    products:  Array< {
      __typename: "Product",
      product_id: string,
      title: string,
      handle: string,
      body_html?: string | null,
      images:  Array< {
        __typename: "ProductImage",
        id: string,
        width?: number | null,
        height?: number | null,
        src: string,
      } >,
    } >,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateProductBlogsMutationVariables = {
  input: CreateProductBlogsInput,
  condition?: ModelProductBlogsConditionInput | null,
};

export type CreateProductBlogsMutation = {
  createProductBlogs?:  {
    __typename: "ProductBlogs",
    content: string,
    user_id: string,
    metadata?: string | null,
    store_name: string,
    store_url: string,
    products:  Array< {
      __typename: "Product",
      product_id: string,
      title: string,
      handle: string,
      body_html?: string | null,
      images:  Array< {
        __typename: "ProductImage",
        id: string,
        width?: number | null,
        height?: number | null,
        src: string,
      } >,
    } >,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateProductBlogsMutationVariables = {
  input: UpdateProductBlogsInput,
  condition?: ModelProductBlogsConditionInput | null,
};

export type UpdateProductBlogsMutation = {
  updateProductBlogs?:  {
    __typename: "ProductBlogs",
    content: string,
    user_id: string,
    metadata?: string | null,
    store_name: string,
    store_url: string,
    products:  Array< {
      __typename: "Product",
      product_id: string,
      title: string,
      handle: string,
      body_html?: string | null,
      images:  Array< {
        __typename: "ProductImage",
        id: string,
        width?: number | null,
        height?: number | null,
        src: string,
      } >,
    } >,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteProductBlogsMutationVariables = {
  input: DeleteProductBlogsInput,
  condition?: ModelProductBlogsConditionInput | null,
};

export type DeleteProductBlogsMutation = {
  deleteProductBlogs?:  {
    __typename: "ProductBlogs",
    content: string,
    user_id: string,
    metadata?: string | null,
    store_name: string,
    store_url: string,
    products:  Array< {
      __typename: "Product",
      product_id: string,
      title: string,
      handle: string,
      body_html?: string | null,
      images:  Array< {
        __typename: "ProductImage",
        id: string,
        width?: number | null,
        height?: number | null,
        src: string,
      } >,
    } >,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type GetUserStoresQueryVariables = {
  user_id: string,
  timestamp: string,
};

export type GetUserStoresQuery = {
  getUserStores?:  {
    __typename: "UserStores",
    user_id: string,
    timestamp: string,
    store_name: string,
    store_url: string,
    products:  Array< {
      __typename: "Product",
      product_id: string,
      title: string,
      handle: string,
      body_html?: string | null,
      images:  Array< {
        __typename: "ProductImage",
        id: string,
        width?: number | null,
        height?: number | null,
        src: string,
      } >,
    } >,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListUserStoresQueryVariables = {
  user_id?: string | null,
  timestamp?: ModelStringKeyConditionInput | null,
  filter?: ModelUserStoresFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListUserStoresQuery = {
  listUserStores?:  {
    __typename: "ModelUserStoresConnection",
    items:  Array< {
      __typename: "UserStores",
      user_id: string,
      timestamp: string,
      store_name: string,
      store_url: string,
      products:  Array< {
        __typename: "Product",
        product_id: string,
        title: string,
        handle: string,
        body_html?: string | null,
      } >,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncUserStoresQueryVariables = {
  filter?: ModelUserStoresFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncUserStoresQuery = {
  syncUserStores?:  {
    __typename: "ModelUserStoresConnection",
    items:  Array< {
      __typename: "UserStores",
      user_id: string,
      timestamp: string,
      store_name: string,
      store_url: string,
      products:  Array< {
        __typename: "Product",
        product_id: string,
        title: string,
        handle: string,
        body_html?: string | null,
      } >,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetUserStoreProductsQueryVariables = {
  store_name: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserStoresFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetUserStoreProductsQuery = {
  getUserStoreProducts?:  {
    __typename: "ModelUserStoresConnection",
    items:  Array< {
      __typename: "UserStores",
      user_id: string,
      timestamp: string,
      store_name: string,
      store_url: string,
      products:  Array< {
        __typename: "Product",
        product_id: string,
        title: string,
        handle: string,
        body_html?: string | null,
      } >,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetProductBlogsQueryVariables = {
  id: string,
};

export type GetProductBlogsQuery = {
  getProductBlogs?:  {
    __typename: "ProductBlogs",
    content: string,
    user_id: string,
    metadata?: string | null,
    store_name: string,
    store_url: string,
    products:  Array< {
      __typename: "Product",
      product_id: string,
      title: string,
      handle: string,
      body_html?: string | null,
      images:  Array< {
        __typename: "ProductImage",
        id: string,
        width?: number | null,
        height?: number | null,
        src: string,
      } >,
    } >,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListProductBlogsQueryVariables = {
  filter?: ModelProductBlogsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProductBlogsQuery = {
  listProductBlogs?:  {
    __typename: "ModelProductBlogsConnection",
    items:  Array< {
      __typename: "ProductBlogs",
      content: string,
      user_id: string,
      metadata?: string | null,
      store_name: string,
      store_url: string,
      products:  Array< {
        __typename: "Product",
        product_id: string,
        title: string,
        handle: string,
        body_html?: string | null,
      } >,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncProductBlogsQueryVariables = {
  filter?: ModelProductBlogsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncProductBlogsQuery = {
  syncProductBlogs?:  {
    __typename: "ModelProductBlogsConnection",
    items:  Array< {
      __typename: "ProductBlogs",
      content: string,
      user_id: string,
      metadata?: string | null,
      store_name: string,
      store_url: string,
      products:  Array< {
        __typename: "Product",
        product_id: string,
        title: string,
        handle: string,
        body_html?: string | null,
      } >,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetUserProductsBlogsQueryVariables = {
  user_id: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelProductBlogsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetUserProductsBlogsQuery = {
  getUserProductsBlogs?:  {
    __typename: "ModelProductBlogsConnection",
    items:  Array< {
      __typename: "ProductBlogs",
      content: string,
      user_id: string,
      metadata?: string | null,
      store_name: string,
      store_url: string,
      products:  Array< {
        __typename: "Product",
        product_id: string,
        title: string,
        handle: string,
        body_html?: string | null,
      } >,
      id: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateUserStoresSubscriptionVariables = {
  filter?: ModelSubscriptionUserStoresFilterInput | null,
};

export type OnCreateUserStoresSubscription = {
  onCreateUserStores?:  {
    __typename: "UserStores",
    user_id: string,
    timestamp: string,
    store_name: string,
    store_url: string,
    products:  Array< {
      __typename: "Product",
      product_id: string,
      title: string,
      handle: string,
      body_html?: string | null,
      images:  Array< {
        __typename: "ProductImage",
        id: string,
        width?: number | null,
        height?: number | null,
        src: string,
      } >,
    } >,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateUserStoresSubscriptionVariables = {
  filter?: ModelSubscriptionUserStoresFilterInput | null,
};

export type OnUpdateUserStoresSubscription = {
  onUpdateUserStores?:  {
    __typename: "UserStores",
    user_id: string,
    timestamp: string,
    store_name: string,
    store_url: string,
    products:  Array< {
      __typename: "Product",
      product_id: string,
      title: string,
      handle: string,
      body_html?: string | null,
      images:  Array< {
        __typename: "ProductImage",
        id: string,
        width?: number | null,
        height?: number | null,
        src: string,
      } >,
    } >,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteUserStoresSubscriptionVariables = {
  filter?: ModelSubscriptionUserStoresFilterInput | null,
};

export type OnDeleteUserStoresSubscription = {
  onDeleteUserStores?:  {
    __typename: "UserStores",
    user_id: string,
    timestamp: string,
    store_name: string,
    store_url: string,
    products:  Array< {
      __typename: "Product",
      product_id: string,
      title: string,
      handle: string,
      body_html?: string | null,
      images:  Array< {
        __typename: "ProductImage",
        id: string,
        width?: number | null,
        height?: number | null,
        src: string,
      } >,
    } >,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateProductBlogsSubscriptionVariables = {
  filter?: ModelSubscriptionProductBlogsFilterInput | null,
};

export type OnCreateProductBlogsSubscription = {
  onCreateProductBlogs?:  {
    __typename: "ProductBlogs",
    content: string,
    user_id: string,
    metadata?: string | null,
    store_name: string,
    store_url: string,
    products:  Array< {
      __typename: "Product",
      product_id: string,
      title: string,
      handle: string,
      body_html?: string | null,
      images:  Array< {
        __typename: "ProductImage",
        id: string,
        width?: number | null,
        height?: number | null,
        src: string,
      } >,
    } >,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateProductBlogsSubscriptionVariables = {
  filter?: ModelSubscriptionProductBlogsFilterInput | null,
};

export type OnUpdateProductBlogsSubscription = {
  onUpdateProductBlogs?:  {
    __typename: "ProductBlogs",
    content: string,
    user_id: string,
    metadata?: string | null,
    store_name: string,
    store_url: string,
    products:  Array< {
      __typename: "Product",
      product_id: string,
      title: string,
      handle: string,
      body_html?: string | null,
      images:  Array< {
        __typename: "ProductImage",
        id: string,
        width?: number | null,
        height?: number | null,
        src: string,
      } >,
    } >,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteProductBlogsSubscriptionVariables = {
  filter?: ModelSubscriptionProductBlogsFilterInput | null,
};

export type OnDeleteProductBlogsSubscription = {
  onDeleteProductBlogs?:  {
    __typename: "ProductBlogs",
    content: string,
    user_id: string,
    metadata?: string | null,
    store_name: string,
    store_url: string,
    products:  Array< {
      __typename: "Product",
      product_id: string,
      title: string,
      handle: string,
      body_html?: string | null,
      images:  Array< {
        __typename: "ProductImage",
        id: string,
        width?: number | null,
        height?: number | null,
        src: string,
      } >,
    } >,
    id: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};
