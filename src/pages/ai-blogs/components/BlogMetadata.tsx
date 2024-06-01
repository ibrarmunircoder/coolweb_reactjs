import { Link } from "react-router-dom";

type Props = {
  metadata?: string | null;
  blogId: string;
};

export const BlogMetadata = ({ metadata, blogId }: Props) => {
  if (!metadata) {
    return (
      <div className="">
        <Link
          className="text-black dark:text-white text-sm"
          to={`/blog/${blogId}`}
        >
          Untitled
        </Link>
      </div>
    );
  }

  const parsedMetadata = JSON.parse(metadata as string);
  const blogTitle = parsedMetadata["blogTitle"];
  const blogExcerpt = parsedMetadata["blogExcerpt"];

  return (
    <div className="text-black dark:text-white font-cd-light">
      {blogTitle && (
        <div className="p-8">
        <Link
          className="text-black dark:text-blue-100 text-lg leading-3"
          to={`/blog/${blogId}`}
        >
          {blogTitle}
        </Link>
        <Link
          className="text-black dark:text-white text-xs"
          to={`/blog/${blogId}`}
        >
          <p className="pt-4">
            {blogExcerpt}
          </p>
        </Link>

        
        </div>
      )}
    </div>
  );
};
