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

  return (
    <div className="text-black dark:text-white text-sm font-cd-light">
      {blogTitle && (
        <Link
          className="text-black dark:text-white text-sm"
          to={`/blog/${blogId}`}
        >
          {blogTitle} 
        </Link>
      )}
    </div>
  );
};
