import React, { Suspense } from 'react';
import { Spinner } from 'shared/components';

type ReturnType<T> = (props: T) => JSX.Element;

// eslint-disable-next-line @typescript-eslint/ban-types
export const withLoading = <T extends object>(
  Component: React.ComponentType<T>
): ReturnType<T> => {
  return (props: T) => (
    <Suspense fallback={<Spinner />}>
      <Component {...props} />
    </Suspense>
  );
};
