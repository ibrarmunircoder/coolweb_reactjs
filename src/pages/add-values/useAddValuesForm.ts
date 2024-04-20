import { zodResolver } from '@hookform/resolvers/zod';
import { post } from 'aws-amplify/api';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const API_NAME = 'apiff99e8d9';

import { z } from 'zod';

const addNewValueSchema = z.object({
  shopifyUrl: z
    .string({
      required_error: 'Url is required!',
    })
    .url('Please add a valid URL')
    .min(1, 'Url is required!'),
  storeName: z
    .string({
      required_error: 'Store name is required!',
    })
    .min(1, 'Store name is required'),
});

export type FormInputType = z.infer<typeof addNewValueSchema>;

export const useAddValuesForm = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<FormInputType>({
    mode: 'onSubmit',
    resolver: zodResolver(addNewValueSchema),
    defaultValues: {
      shopifyUrl: '',
      storeName: '',
    },
  });

  const onSubmit = async (values: FormInputType) => {
    const toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
    });
    try {
      const getOperation = post({
        apiName: API_NAME,
        path: '/user/save-products',
        options: {
          body: values,
        },
      });
      const { body } = await getOperation.response;
      await body.json();
      toast.fire({
        icon: 'success',
        title: 'Save products successfully',
        padding: '10px 20px',
      });
      reset();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.fire({
        icon: 'error',
        title: error.message || 'Failed to add products',
        padding: '10px 20px',
      });
    }
  };

  return {
    handleSubmit,
    control,
    errors,
    isSubmitting,
    touchedFields,
    onSubmit: handleSubmit(onSubmit),
  };
};
