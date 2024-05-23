/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { UserStores } from '@/API';
import {
  fetchUserStoreProducts,
  fetchUserStores,
} from '@/services/api/coolweb-graphql/queries';
import { Spinner, TypeWriter } from '@/shared/components';
import { useAuthUserSelector } from '@/shared/hooks/useAuthStore';
import { invokeModelWithStreaming } from '@/shared/utils/llm';
import { Product } from '@/types';
import {
  Badge,
  Button,
  Heading,
  Pagination,
  SearchField,
} from '@aws-amplify/ui-react';
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductListing } from './components/ProductListing';
import { saveProductBlogContent } from '@/services/api/coolweb-graphql/mutations';
import { CancelGenerateContentPrompt } from './components/CancelGenerateContentPrompt';

type UserStoresType = Omit<UserStores, 'products'>;

const Products = () => {
  const user = useAuthUserSelector();
  const [isWaiting, setIsWaiting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isProductsFetching, setIsProductsFetching] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [stores, setStores] = useState<UserStoresType[]>([]);
  const [modelResponse, setModelResponse] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsRef = useRef<Product[]>([]);

  const recordsPerPage = 10;
  const totalPages = Math.ceil(products.length / recordsPerPage);
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const chunk = products.slice(firstIndex, lastIndex);
  const selectedStore = searchParams.get('store') || '';
  const selectedStoreUrl = searchParams.get('store') || '';

  useEffect(() => {
    if (selectedStore) {
      setIsProductsFetching(true);
      fetchUserStoreProducts(selectedStore)
        .then((products) => {
          setProducts(products);
          productsRef.current = products;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsProductsFetching(false);
        });
    }
  }, [selectedStore]);

  useEffect(() => {
    if (user?.userId) {
      fetchUserStores(user?.userId)
        .then((userStores) => {
          const storeName = userStores[0].store_name;
          const storeUrl = userStores[0].store_url;
          setStores(userStores);
          if (storeName && storeUrl) {
            setSearchParams({
              store: storeName,
              store_url: storeUrl,
            });
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleOnChange = (newPageIndex: number | undefined) => {
    setCurrentPage(newPageIndex as number);
  };

  const handleStoreSelect = (store: UserStoresType) => () => {
    if (selectedStore !== store.store_name) {
      setModelResponse('');
      setProducts([]);
      setSelectedProducts([]);
      setSearchParams({
        store: store.store_name,
        store_url: store.store_url,
      });
    }
  };

  const handleProductSelect = (id: string) => {
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

  const getSelectedProducts = () => {
    return products.filter((product) =>
      selectedProducts.includes(product.product_id)
    );
  };

  const generateProductsPrompt = () => {
    const filteredProducts = getSelectedProducts();
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
    Please follow the instructions below to write a blog article for my store ${selectedStore} based on our product information below these instructions.

    Instructions:
    - Generate a blog article with html tags, but not a complete html file with head and body, we only need the html tags wrapped around the content.
    - Include images and links too. Just use the h2, h3, h4, p, links to products, images in html only. Don't include the blog title in the output at the top. Exclude it.
    - Don't mention anything about getting the product now because supplies are limited and may not be available by the time they read this.
    - Don't include price, sku or weight, category in the details/specifications.
    - Don't say "view more information" or anything similar since the linked pages might not actually have more information.
    - Look at the images provided in the product details to describe the details of the product(s).
    - Make sure the image tags have a style added to it of width: 100%;.
    - Make sure the landing page links do not have the main url ${selectedStoreUrl}, and instead start with /products to have the full URL from that point. The main domain part is not needed.
    - The image urls can be the full url.
    - The blog post must be 1000 words minimum based on the product information: "${productInfo}"
    - Do not include any introductory lines before html. you need to only generate blog post using html elements by wrapping the content. For example, "Here is the blog article with HTML tags based on the provided product information:", do not include such kind of lines while generating blog post.
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
        max_tokens: 4000,
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
      await saveProductBlogContent({
        content: response,
        products: getSelectedProducts(),
        store_name: selectedStore,
        store_url: selectedStoreUrl,
        user_id: user?.userId as string,
      });
      setModelResponse(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsWaiting(false);
    }
  };

  const handleProductSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    const filteredProducts = productsRef.current.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
    setProducts(filteredProducts);
  };

  const handleClearProductSearch = () => {
    setProducts(productsRef.current);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (stores.length === 0) {
    return (
      <main className="my-14">
        <div className="flex justify-center px-3 py-6">
          <Heading level={6} fontWeight={400}>
            No Stores Found!
          </Heading>
        </div>
      </main>
    );
  }

  return (
    <main className="my-14">
      <div className="px-3">
        <div className="pt-8 flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
          <div className="flex flex-col">
            <Heading level={3} textAlign="left">
              Products
            </Heading>
            <span className="text-gray-400">
              Select at least three products to generate blog post
            </span>
            <div className="my-6 flex items-center gap-6 flex-wrap">
              <Heading level={6} textAlign="left">
                Stores:
              </Heading>
              {stores.map((store) => (
                <Badge
                  onClick={handleStoreSelect(store)}
                  style={{ cursor: 'pointer' }}
                  size="large"
                  key={store.timestamp}
                  variation="info"
                >
                  {store.store_name}
                </Badge>
              ))}
            </div>
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
        <div className="flex w-full justify-end mt-3 mb-8">
          <SearchField
            onChange={handleProductSearch}
            onClear={handleClearProductSearch}
            hasSearchButton
            label="Search"
            placeholder="Search Products"
          />
        </div>

        {modelResponse && <TypeWriter content={modelResponse} speed={10} />}
        {isProductsFetching && products.length === 0 && <Spinner />}
        {!isProductsFetching && products.length > 0 && (
          <>
            <ProductListing
              products={chunk}
              selectedProducts={selectedProducts}
              onProductSelect={handleProductSelect}
            />
            <Pagination
              totalPages={totalPages}
              siblingCount={2}
              currentPage={currentPage}
              onNext={handleNextPage}
              onPrevious={handlePreviousPage}
              onChange={handleOnChange}
            />
          </>
        )}
        {!isProductsFetching && products.length === 0 && (
          <div className="my-4 flex justify-center items-center text-lg">
            No products found!
          </div>
        )}
      </div>
      <CancelGenerateContentPrompt isBlocked={isWaiting} />
    </main>
  );
};

export default Products;
