import { Link } from 'react-router-dom';

type Props = {
  metadata?: string | null;
  blogId: string;
};

export const BlogMetadata = ({ metadata, blogId }: Props) => {
  if (!metadata) {
    return (
      <div className="grow flex justify-center items-center">
        <Link
          className="text-primary-500 text-sm font-semibold underline underline-offset-4"
          to={`/blog/${blogId}`}
        >
          Generate metadata
        </Link>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2 text-black dark:text-white text-sm font-cd-light">
      {metadata &&
        Object.keys(JSON.parse(metadata!)).map((key) => {
          return (
            <p className="100 rounded-md" key={key}>
              <span className="font-cd-med capitalize underline underline-offset-4 mr-1">
                {key}:{' '}
              </span>
              <span className="">{JSON.parse(metadata as string)[key]}</span>
            </p>
          );
        })}
    </div>
  );
};
