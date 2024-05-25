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
          <Heading className="font-cd-light" level={6} fontWeight={400}>
            No Blogs Found!
          </Heading>
        </div>
      </main>
    );
  }

  return (
    <main className="my-14">
      <div className="px-6 md:px-10 mx-auto">
        <div className="flex flex-col py-10">
          <Heading className="font-cd-light" level={3} textAlign="left">
            Draft Articles
          </Heading>
        </div>
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-lime-100 rounded-xl p-4">
              <div className="flex items-center gap-3 justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Badge className='bg-black text-white font-cd-light'>{blog.store_name}</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Button className='font-cd-light hover:bg-lime-200 tracking-wide' size="small">
                    <Link to={`/blog/${blog.id}`}>View Article</Link>
                  </Button>
                  <Button
                    className='font-cd-light tracking-wide'
                    onClick={handleDeleteBlogPost(blog.id)}
                    isLoading={blog.id === deletingBlogId}
                    size="small"
                    variation="destructive"
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <pre className="font-cd-light break-words whitespace-pre-wrap">
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
