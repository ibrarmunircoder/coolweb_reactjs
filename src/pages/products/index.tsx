/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { UserStores } from "@/API";
import {
  fetchUserStoreProducts,
  fetchUserStores,
} from "@/services/api/coolweb-graphql/queries";
import { Spinner, TypeWriter } from "@/shared/components";
import { useAuthUserSelector } from "@/shared/hooks/useAuthStore";
import { invokeModelWithStreaming } from "@/shared/utils/llm";
import { Product } from "@/types";
import {
  Badge,
  Button,
  Heading,
  Pagination,
  SearchField,
  SelectField,
} from "@aws-amplify/ui-react";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductListing } from "./components/ProductListing";
import { saveProductBlogContent } from "@/services/api/coolweb-graphql/mutations";
import { CancelGenerateContentPrompt } from "./components/CancelGenerateContentPrompt";
import { imageUrlToBlob } from "@/shared/utils/convertToBase64";
import { getImageMediaType } from "@/shared/utils/get-image-media-type";
import { resizeImage } from "@/shared/utils/resize-image";
import { v4 as uuidV4 } from "uuid";
import StoreSelector from "./components/StoreAvatar";

type UserStoresType = Omit<UserStores, "products">;

const Products = () => {
  const user = useAuthUserSelector();
  const [isWaiting, setIsWaiting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [productsCount, setProductsCount] = useState("1");
  const [isProductsFetching, setIsProductsFetching] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [stores, setStores] = useState<UserStoresType[]>([]);
  const [modelResponse, setModelResponse] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsRef = useRef<Product[]>([]);

  const recordsPerPage = 10;
  const totalPages = Math.ceil(products.length / recordsPerPage);
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const chunk = products.slice(firstIndex, lastIndex);
  const selectedStore = searchParams.get("store") || "";
  const selectedStoreUrl = searchParams.get("store") || "";

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

  const generateImagesBlock = async (selectedProducts: Product[]) => {
    const promises = selectedProducts.map(async (product, index) => {
      const image = product.images[0];
      if (image) {
        const imageBlob = await imageUrlToBlob(image.src);
        const mediaType = await getImageMediaType(image.src);
        const resizedFileDataUrl = await resizeImage(
          imageBlob,
          1029,
          1029,
          mediaType!
        );
        const base64 = resizedFileDataUrl.split(",")[1];
        return [
          {
            type: "text",
            text: `Image ${index + 1}:`,
          },
          {
            type: "image",
            source: {
              type: "base64",
              media_type: mediaType!,
              data: base64,
            },
          },
        ];
      }
      return [];
    });
    const imagesBlock = await Promise.all(promises);
    return imagesBlock.flat();
  };

  const generateTextBlock = (selectedProducts: Product[]) => {
    let productInfo = "";
    for (const product of selectedProducts) {
      const images_html = product.images
        .map((image) => `<img src="${image.src}" style="width: 100%;">`)
        .join("");
      productInfo += `Title: ${product.title || "N/A"}<br>`;
      productInfo += `Handle: ${product.handle || "N/A"}<br>`;
      productInfo += `Images: ${images_html}<br>`;
      productInfo += `Product Type: ${product.product_type || "N/A"}<br>`;
      productInfo += `Tags: ${product.tags || "N/A"}<br>`;
      productInfo += `Description: ${
        product.body_html ? product.body_html.trim() : "N/A"
      }<br><br>`;
    }

    const prompt = `
    Please follow the below instruction to write a blog article for my store ${selectedStore} based on our product information below these instructions.

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
      setModelResponse("");
      const filteredProducts = getSelectedProducts();
      const imageBlocks = await generateImagesBlock(filteredProducts);
      const modeId = "anthropic.claude-3-opus-20240229-v1:0";
      const body = {
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 4000,
        messages: [
          {
            role: "user",
            content: [
              ...imageBlocks,
              {
                type: "text",
                text: generateTextBlock(filteredProducts),
              },
            ],
          },
        ],
      };

      const response = await invokeModelWithStreaming(body, modeId);
      await saveProductBlogContent({
        id: uuidV4(),
        content: response,
        products: getSelectedProducts(),
        store_name: selectedStore,
        store_url: selectedStoreUrl,
        user_id: user?.userId as string,
        created_at: new Date().toISOString(),
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
    setCurrentPage(1);
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
          <Heading
            className="!font-cd-light dark:!text-white"
            level={6}
            fontWeight={400}
          >
            No Stores Found!
          </Heading>
        </div>
      </main>
    );
  }

  return (
    <main className="py-14 dark:bg-black">
      <div className="px-3">
        <div className="pt-8 flex flex-col items-start gap-2 md:flex-row md:justify-between md:items-center">
          <div className="flex flex-col">
            <Heading
              level={3}
              textAlign="left"
              className="font-cd-light dark:text-white"
            >
              Products
            </Heading>
            <div className="my-6 flex items-center gap-6 flex-wrap">
            <StoreSelector
                stores={stores}
                setModelResponse={setModelResponse}
                setProducts={setProducts}
                setSelectedProducts={setSelectedProducts}
                setSearchParams={setSearchParams}
                searchParams={searchParams}
              />
            </div>
          </div>
          {selectedProducts.length === +productsCount && (
            <Button
              isLoading={isWaiting}
              onClick={handleGenerateBlogPost}
              className="max-sm:!w-full bg-gradient-to-r from-blue-500 to-indigo-900 font-cd-light text-white border-4 border-lime-200"
            >
              Generate Article
            </Button>
          )}
        </div>
        <div className="flex w-full md:flex-row md:justify-end md:items-center mt-3 mb-8 gap-5">
          <SelectField
            className="!-mt-2"
            label=""
            value={productsCount}
            onChange={(e) => setProductsCount(e.target.value)}
          >
            <option value={1}>Select 1 Product</option>
            <option value={2}>Select 2 Products</option>
            <option value={3}>Select 3 Products</option>
          </SelectField>
          <SearchField
            onChange={handleProductSearch}
            onClear={handleClearProductSearch}
            hasSearchButton={false}
            hasSearchIcon
            label="Search"
            placeholder="Search"
            className="max-sm:!w-full dark:bg-gradient-to-r from-blue-500 to-indigo-500"
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
