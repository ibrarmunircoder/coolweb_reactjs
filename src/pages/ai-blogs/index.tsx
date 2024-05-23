import { ProductBlogs } from '@/API';
import { removeBlogById } from '@/services/api/coolweb-graphql/mutations';
import { getUserBlogs } from '@/services/api/coolweb-graphql/queries';
import { Spinner } from '@/shared/components';
import { useAuthUserSelector } from '@/shared/hooks/useAuthStore';
import { truncate } from '@/shared/utils';
import { Badge, Button, Heading } from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
      <main className="my-14">
        <div className="flex justify-center px-3 py-6">
          <Heading level={6} fontWeight={400}>
            No Blogs Found!
          </Heading>
        </div>
      </main>
    );
  }

  return (
    <main className="my-14">
      <div className="px-6 md:px-10 max-w-3xl mx-auto">
        <div className="flex flex-col py-10">
          <Heading level={3} textAlign="left">
            Blogs
          </Heading>
          <span className="text-gray-400">Here are your products blog</span>
        </div>
        <div className="flex flex-col gap-6">
          {blogs.map((blog) => (
            <div key={blog.id} className="shadow-md bg-gray-50 p-4">
              <div className="flex items-center gap-3 justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Heading level={6}>Store:</Heading>
                  <Badge variation="info">{blog.store_name}</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Button size="small" variation="warning">
                    <Link to={`/blog/${blog.id}`}> View Blog</Link>
                  </Button>
                  <Button
                    onClick={handleDeleteBlogPost(blog.id)}
                    isLoading={blog.id === deletingBlogId}
                    size="small"
                    variation="destructive"
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <pre className="break-words whitespace-pre-wrap">
                {truncate(blog.content, 300)}
              </pre>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
export default AIBlogs;
