import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorHelperMessage: React.FC<ErrorMessageProps> = ({
  message,
}) => {
  if (!message) {
    return null;
  }

  return <div className="mt-1 text-sm text-red-800">{message}</div>;
};
