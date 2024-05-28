import { ProductBlogs } from '@/API';
import { removeBlogById } from '@/services/api/coolweb-graphql/mutations';
import { getUserBlogs } from '@/services/api/coolweb-graphql/queries';
import { Spinner } from '@/shared/components';
import { useAuthUserSelector } from '@/shared/hooks/useAuthStore';
import { truncate } from '@/shared/utils';
import { Badge, Button, Heading } from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BlogMetadata } from './components/BlogMetadata';

const AIBlogs = () => {
  const user = useAuthUserSelector();
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState<ProductBlogs[]>([]);
  const [deletingBlogId, setDeletingBlogId] = useState('');

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

  if (isLoading) {
    return <Spinner />;
  }

  const handleDeleteBlogPost = (id: string) => async () => {
    try {
      setDeletingBlogId(id);
      await removeBlogById(id);
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    } catch (error) {
      console.log(error);
    } finally {
      setDeletingBlogId('');
    }
  };

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
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-gray-200 dark:bg-neutral-900 rounded-xl p-4 flex flex-col gap-5"
            >
              <div className="flex items-center gap-3 justify-between">
                <div className="flex items-center gap-2">
                  <Badge className="bg-black dark:primary-gradient text-white text-xs font-cd-light">
                    {blog.store_name}
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    className="font-cd-light hover:bg-lime-200 dark:bg-black dark:text-white dark:hover:border-lime-200"
                    size="small"
                  >
                    <Link to={`/blog/${blog.id}`}>View Article</Link>
                  </Button>
                  <Button
                    className="font-cd-light"
                    onClick={handleDeleteBlogPost(blog.id)}
                    isLoading={blog.id === deletingBlogId}
                    size="small"
                    variation="destructive"
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <pre className="font-cd-light break-words whitespace-pre-wrap text-xs dark:text-white">
                {truncate(blog.content, 300)}
              </pre>
              <BlogMetadata metadata={blog.metadata} blogId={blog.id} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
export default AIBlogs;
