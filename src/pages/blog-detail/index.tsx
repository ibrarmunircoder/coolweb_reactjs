import { ProductBlogs } from '@/API';
import { updateProductBlogMetadata } from '@/services/api/coolweb-graphql/mutations';
import { getProductBlogById } from '@/services/api/coolweb-graphql/queries';
import { Spinner } from '@/shared/components';
import { invokeModelWithStreaming } from '@/shared/utils/llm';
import { Button, Heading } from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css';
const BlogDetail = () => {
  const [blog, setBlog] = useState<ProductBlogs | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isRawHtml, setIsRawHtml] = useState(true); // New state for toggling views

  const params = useParams();
  const blogId = params.id;

  useEffect(() => {
    if (blogId) {
      setIsLoading(true);
      getProductBlogById(blogId)
        .then((blog) => {
          setBlog(blog);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [blogId]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!blogId) {
    return null;
  }

  if (!blog) {
    return null;
  }

  const generateProductsPrompt = () => {
    const prompt = `
    Use the ${blog.content} to create a unique blog title based on the content, a meta description (maximum 320 characters), and a blog excerpt (less than 200 characters)
    . Returns a response in json object without any text or description before json.`;
    return prompt;
  };

  const handleGenerateBlogMetadata = async () => {
    try {
      setIsWaiting(true);
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
      await updateProductBlogMetadata(blog.id, response);
      setBlog((prev) => {
        if (prev) {
          return {
            ...prev,
            metadata: response,
          };
        }
        return prev;
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsWaiting(false);
    }
  };

  return (
    <main className="my-14">
      <div className="px-6 md:px-10 max-w-5xl mx-auto">
        <div className="flex flex-col gap-5 py-10">
          <div className="flex justify-between">
            <Heading
              className="!font-cd-light dark:!text-white"
              level={4}
              textAlign="left"
            >
              Title & Meta Data
            </Heading>
            <Button
              onClick={handleGenerateBlogMetadata}
              isLoading={isWaiting}
              variation="primary"
            >
              Generate Title & Meta Data
            </Button>
          </div>
          {blog.metadata &&
            Object.keys(JSON.parse(blog.metadata)).map((key) => {
              return (
                <div className="p-4 bg-gray-100 rounded-md" key={key}>
                  <pre className="break-words whitespace-pre-wrap">
                    <span className="font-cd-light text-lg font-semibold">
                      {key}:{' '}
                    </span>
                    <span>{JSON.parse(blog.metadata as string)[key]}</span>
                  </pre>
                </div>
              );
            })}
        </div>
        <div className="flex flex-col gap-3">
          <Button
            onClick={() => setIsRawHtml(!isRawHtml)} // Toggle button
            variation="primary"
          >
            {isRawHtml ? 'View Rendered HTML' : 'View Raw HTML'}
          </Button>
          <Heading
            className="!font-cd-light dark:!text-white"
            level={4}
            textAlign="left"
          >
            Body:
          </Heading>
          <div className="p-4 bg-neutral-200 rounded-md">
            {isRawHtml ? (
              <pre className="break-words whitespace-pre-wrap">
                {blog.content}
              </pre>
            ) : (
              <div
                className="rendered-html-content" // Add class name for styling
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default BlogDetail;
