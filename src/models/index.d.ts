import { ModelInit, MutableModel, __modelMeta__, CompositeIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";



type EagerProduct = {
  readonly product_id: string;
  readonly title: string;
  readonly handle: string;
  readonly body_html?: string | null;
  readonly images: ProductImage[];
}

type LazyProduct = {
  readonly product_id: string;
  readonly title: string;
  readonly handle: string;
  readonly body_html?: string | null;
  readonly images: ProductImage[];
}

export declare type Product = LazyLoading extends LazyLoadingDisabled ? EagerProduct : LazyProduct

export declare const Product: (new (init: ModelInit<Product>) => Product)

type EagerProductImage = {
  readonly id: string;
  readonly width?: number | null;
  readonly height?: number | null;
  readonly src: string;
}

type LazyProductImage = {
  readonly id: string;
  readonly width?: number | null;
  readonly height?: number | null;
  readonly src: string;
}

export declare type ProductImage = LazyLoading extends LazyLoadingDisabled ? EagerProductImage : LazyProductImage

export declare const ProductImage: (new (init: ModelInit<ProductImage>) => ProductImage)

type EagerUserStores = {
  readonly [__modelMeta__]: {
    identifier: CompositeIdentifier<UserStores, ['user_id', 'timestamp']>;
  };
  readonly user_id: string;
  readonly timestamp: string;
  readonly store_name: string;
  readonly store_url: string;
  readonly products: Product[];
}

type LazyUserStores = {
  readonly [__modelMeta__]: {
    identifier: CompositeIdentifier<UserStores, ['user_id', 'timestamp']>;
  };
  readonly user_id: string;
  readonly timestamp: string;
  readonly store_name: string;
  readonly store_url: string;
  readonly products: Product[];
}

export declare type UserStores = LazyLoading extends LazyLoadingDisabled ? EagerUserStores : LazyUserStores

export declare const UserStores: (new (init: ModelInit<UserStores>) => UserStores) & {
  copyOf(source: UserStores, mutator: (draft: MutableModel<UserStores>) => MutableModel<UserStores> | void): UserStores;
}