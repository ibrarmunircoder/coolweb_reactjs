import { generateBlogPost, getUserProducts } from '@/services/api';
import { Spinner } from '@/shared/components';
import { Product } from '@/types';
import {
  Button,
  CheckboxField,
  Heading,
  Pagination,
} from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';

const Products = () => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const chunk = products.slice(firstIndex, lastIndex);
  useEffect(() => {
    getUserProducts()
      .then((products: Product[]) => {
        setProducts(products);
        setTotalRecords(products.length);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleOnChange = (newPageIndex: number | undefined) => {
    setCurrentPage(newPageIndex as number);
  };

  const handleProductSelect = (id: string) => () => {
    const selectedIndex = selectedProducts.indexOf(id);
    let newSelected: string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedProducts, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedProducts.slice(1));
    } else if (selectedIndex === selectedProducts.length - 1) {
      newSelected = newSelected.concat(selectedProducts.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedProducts.slice(0, selectedIndex),
        selectedProducts.slice(selectedIndex + 1)
      );
    }
    setSelectedProducts(newSelected);
  };

  const handleGenerateBlogPost = async () => {
    try {
      const filteredProducts = products.filter((product) =>
        selectedProducts.includes(product.product_id)
      );
      await generateBlogPost(filteredProducts);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (products.length === 0) {
    return (
      <main className="my-14">
        <div className="flex justify-center px-3 py-6">
          <Heading level={6} fontWeight={400}>
            No Products Found!
          </Heading>
        </div>
      </main>
    );
  }

  return (
    <main className="my-14">
      <div className="px-3">
        <div className="py-8 flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
          <div className="flex flex-col">
            <Heading level={3} textAlign="left">
              Products
            </Heading>
            <span className="text-gray-400">
              Select at least three products to generate blog post
            </span>
          </div>
          {selectedProducts.length === 3 && (
            <Button onClick={handleGenerateBlogPost} variation="primary">
              Generate content
            </Button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-7">
          {chunk.map((product) => (
            <div
              key={product.product_id}
              className="shadow-md rounded-md bg-white relative select-none"
            >
              <img
                className="w-full aspect-[5/4] shadow"
                src={product.images[0]?.src || 'https://placehold.co/600x400'}
              />
              <div className="px-3 py-5">
                <Heading level={6}>{product.title}</Heading>
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
        <Pagination
          totalPages={totalPages}
          siblingCount={2}
          currentPage={currentPage}
          onNext={handleNextPage}
          onPrevious={handlePreviousPage}
          onChange={handleOnChange}
        />
      </div>
    </main>
  );
};

export default Products;
