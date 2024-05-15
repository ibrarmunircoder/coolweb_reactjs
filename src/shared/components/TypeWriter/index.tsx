import { useEffect, useState } from 'react';

export const TypeWriter = ({
  content,
  speed,
}: {
  content: string;
  speed: number;
}) => {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentIndex < content.length) {
        setText((prevText) => prevText + content[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [content, speed, currentIndex]);

  return (
    <section className="mb-7 bg-gray-100 p-5 rounded-md">
      <pre className="w-full break-words whitespace-pre-wrap bg-transparent duration-100 py-0">
        <code>{text}</code>
      </pre>
    </section>
  );
};
