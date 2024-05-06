import { getUserProducts } from '@/services/api';
import { Spinner } from '@/shared/components';
import { Heading, Pagination } from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';

type Product = {
  handle: string;
  body_html: string;
  images: [
    {
      width: number;
      id: string;
      src: string;
      height: number;
    }
  ];
  title: string;
  product_id: string;
};

const Products = () => {
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
        <div className="py-8">
          <Heading level={3} textAlign="center">
            Products
          </Heading>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-7">
          {chunk.map((product) => (
            <div
              key={product.product_id}
              className="shadow-md rounded-md bg-white"
            >
              <img
                className="w-full aspect-[5/4] shadow"
                src={product.images[0]?.src || 'https://placehold.co/600x400'}
              />
              <div className="px-3 py-5">
                <Heading level={6}>{product.title}</Heading>
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
