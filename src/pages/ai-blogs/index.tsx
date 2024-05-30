import { ProductBlogs } from "@/API";
import { removeBlogById } from "@/services/api/coolweb-graphql/mutations";
import { getUserBlogs } from "@/services/api/coolweb-graphql/queries";
import { Spinner } from "@/shared/components";
import { useAuthUserSelector } from "@/shared/hooks/useAuthStore";
import { Heading } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { BlogMetadata } from "./components/BlogMetadata";

const AIBlogs = () => {
  const user = useAuthUserSelector();
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState<ProductBlogs[]>([]);
  const [deletingBlogId, setDeletingBlogId] = useState("");

  useEffect(() => {
    getUserBlogs(user!.userId)
      .then((blogs) => {
        setBlogs(blogs);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user]);

  const handleDeleteBlogPost = (id: string) => async () => {
    try {
      setDeletingBlogId(id);
      await removeBlogById(id);
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    } catch (error) {
      console.log(error);
    } finally {
      setDeletingBlogId("");
    }
  };

  const extractFirstImageUrl = (content: string) => {
    const imgTagRegex = /<img[^>]+src="([^">]+)"/;
    const match = content.match(imgTagRegex);
    return match ? match[1] : null;
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (blogs.length === 0) {
    return (
      <main className="my-14 dark:bg-black">
        <div className="flex justify-center px-3 pt-20">
          <Heading
            className="!font-cd-light dark:!text-white"
            level={6}
            fontWeight={400}
          >
            No Blogs Found!
          </Heading>
        </div>
      </main>
    );
  }

  return (
    <main className="my-14 dark:bg-black">
      <div className="px-2 md:px-2 mx-auto">
        <div className="flex flex-col py-10">
          <Heading
            className="!font-cd-light dark:!text-white"
            level={3}
            textAlign="left"
          >
            Draft Articles
          </Heading>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
          {blogs.map((blog) => {
            const imageUrl = extractFirstImageUrl(blog.content);
            return (
              <div
                key={blog.id}
                className="bg-gray-200 dark:bg-neutral-900 rounded-xl gap-5 relative flex items-center"
              >
                <span className="font-cd-light absolute top-2 right-2 inline-flex items-center rounded-md bg-gradient-to-r from-blue-500 to-indigo-900 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-500/10">
                  {blog.store_name}
                </span>

                <div className="flex place-items-center flex-row">
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Blog"
                    className="rounded-xl m-2"
                    style={{ maxWidth: '120px', width: '100%' }}
                  />
                )}
                <BlogMetadata metadata={blog.metadata} blogId={blog.id} />
                </div>
                
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default AIBlogs;
