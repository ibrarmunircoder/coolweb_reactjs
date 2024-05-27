import { Product } from '@/types';
import { CheckboxField, Heading } from '@aws-amplify/ui-react';
import React from 'react';

type Props = {
  products: Product[];
  onProductSelect: (id: string) => void;
  selectedProducts: string[];
};

export const ProductListing: React.FC<Props> = ({
  products,
  onProductSelect,
  selectedProducts,
}) => {
  const handleProductSelect = (id: string) => () => {
    onProductSelect(id);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-7">
      {products.map((product) => (
        <div
          key={product.product_id}
          className="bg-neutral-200 dark:bg-neutral-800 relative select-none rounded-xl"
        >
          <img
            className="w-full rounded-2xl"
            src={product.images[0]?.src || 'https://placehold.co/400x400'}
          />
          <div className="px-3 py-5">
            <Heading className='font-cd-light dark:text-white' level={6}>{product.title}</Heading>
          </div>
          <div className="absolute top-5 right-5">
            <CheckboxField
              label=""
              name="product-id"
              value={product.product_id}
              checked={selectedProducts.indexOf(product.product_id) !== -1}
              onChange={handleProductSelect(product.product_id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
