/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

import { getUserProducts } from '@/services/api';
import { Spinner, TypeWriter } from '@/shared/components';
import { invokeModelWithStreaming } from '@/shared/utils/llm';
import { Product } from '@/types';
import {
  Button,
  CheckboxField,
  Heading,
  Pagination,
} from '@aws-amplify/ui-react';
import { useEffect, useRef, useState } from 'react';

const Products = () => {
  const [modelResponse, setModelResponse] = useState('');
  const [isWaiting, setIsWaiting] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const storeUrlRef = useRef<string>('');
  const storeNameRef = useRef<string>('');

  const recordsPerPage = 10;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const chunk = products.slice(firstIndex, lastIndex);
  useEffect(() => {
    getUserProducts()
      .then((response: any) => {
        const products = response.map(
          (userStoreRecord: any) => userStoreRecord.products
        );
        storeUrlRef.current = response[0].store_url;
        storeNameRef.current = response[0].store_name;
        const allProducts = products?.flat() || [];
        setProducts(allProducts);
        setTotalRecords(allProducts.length);
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

  const generateProductsPrompt = () => {
    const filteredProducts = products.filter((product) =>
      selectedProducts.includes(product.product_id)
    );
    let productInfo = '';
    for (const product of filteredProducts) {
      const images_html = product.images
        .map((image) => `<img src="${image.src}" style="width: 100%;">`)
        .join('');
      productInfo += `Title: ${product.title || 'N/A'}<br>`;
      productInfo += `Handle: ${product.handle || 'N/A'}<br>`;
      productInfo += `Images: ${images_html}<br>`;
      productInfo += `Product Type: ${product.product_type || 'N/A'}<br>`;
      productInfo += `Tags: ${product.tags || 'N/A'}<br>`;
      productInfo += `Description: ${
        product.body_html ? product.body_html.trim() : 'N/A'
      }<br><br>`;
    }

    const prompt = `
    write a blog article with 1000 word minimum for my store ${storeNameRef.current} based on our product information below these instructions

    Instructions:
    - generate a blog article with html tags and not a complete html file with head and body, we only need the html tags wrapped around the content. Include images and links too. Just use the h2, h3, h4, p, links, images html only. Don't include the blog title in the output at the top. Exclude it.
    - Links to the product(s)
    - don't mention anything about getting the product now because supplies are limited and may not be available by the time they read this.
    - don't include price, sku or weight or category in the details/specifications.
    - don't say "view more information" or anything similar since the link pages might not actually have more information.
    - using the image(s), describe the details of the product(s)
    - please make sure the image tags have a style added to it of width: 100%;
    - make sure the landing page links do not have the main url ${storeUrlRef.current}, and instead start with /products to have the full URL from that point. The main domain part is not needed.
    - the image urls can be the full thing
    product information: ${productInfo}
    `;
    return prompt;
  };

  const handleGenerateBlogPost = async () => {
    try {
      setIsWaiting(true);
      setModelResponse('');
      const modeId = 'anthropic.claude-3-opus-20240229-v1:0';
      const body = {
        anthropic_version: 'bedrock-2023-05-31',
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: generateProductsPrompt(),
              },
            ],
          },
        ],
      };

      const response = await invokeModelWithStreaming(body, modeId);
      setModelResponse(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsWaiting(false);
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
            <Button
              isLoading={isWaiting}
              onClick={handleGenerateBlogPost}
              variation="primary"
            >
              Generate content
            </Button>
          )}
        </div>
        {modelResponse && <TypeWriter content={modelResponse} speed={10} />}
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
