import { Button, Heading, Input } from '@aws-amplify/ui-react';
import { useAddValuesForm } from './useAddValuesForm';
import { Controller } from 'react-hook-form';
import { isError, isErrorMessage } from '@/shared/utils';
import { ErrorHelperMessage } from '@/shared/components';

const AddFormValues = () => {
  const { control, errors, onSubmit, isSubmitting, touchedFields } =
    useAddValuesForm();
  return (
      <main className="mt-14">
        <div className="max-w-2xl mx-auto px-3">
          <div className="py-8">
            <Heading level={3} textAlign="center" className='font-cd-light dark:text-white'>
              Add New Store
            </Heading>
          </div>
          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <div>
              <label
                htmlFor="shopifyUrl"
                className="text-lg font-normal mb-2 inline-block"
              >
                Shopify Url
              </label>
              <Controller
                control={control}
                name="shopifyUrl"
                render={({ field }) => (
                  <Input
                    placeholder="Enter your Shopify URL"
                    id="shopifyUrl"
                    type="text"
                    hasError={isError('shopifyUrl', errors, touchedFields)}
                    {...field}
                  />
                )}
              />

              <ErrorHelperMessage
                message={isErrorMessage('shopifyUrl', errors)}
              />
            </div>
            <div>
              <label
                htmlFor="storeName"
                className="text-lg font-normal mb-2 inline-block"
              >
                Store Name
              </label>
              <Controller
                control={control}
                name="storeName"
                render={({ field }) => (
                  <Input
                    placeholder="Enter your Store name"
                    id="storeName"
                    type="text"
                    hasError={isError('storeName', errors, touchedFields)}
                    {...field}
                  />
                )}
              />

              <ErrorHelperMessage message={isErrorMessage('storeName', errors)} />
            </div>
            <Button type="submit" isLoading={isSubmitting} variation="primary">
              Submit
            </Button>
          </form>
        </div>
      </main>
  );
};

export default AddFormValues;
