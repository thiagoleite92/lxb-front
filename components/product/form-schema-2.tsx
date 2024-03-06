import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState, useTransition } from 'react';

import { BrandSelect } from './brand-select';
import { ModelSelect } from './model-select';
import { ColorSelect } from './color-select';
import { ProductsService } from '@/services/ProductService';
import formatCurrency from '@/utils/formatCurrency';
import { CreateProductV2, createProductSchemaV2 } from '@/schemas';

export const FormProductSchema2 = () => {
  const productService = new ProductsService();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const formSchema2 = useForm<CreateProductV2>({
    resolver: zodResolver(createProductSchemaV2),
    defaultValues: {
      details: {
        brand: '',
        color: '',
        model: '',
      },
      name: '',
      price: '',
    },
  });

  const { watch, setValue, reset, resetField } = formSchema2;

  const priceWatch = watch('price');

  useEffect(() => {
    return setValue('price', formatCurrency(priceWatch));
  }, [priceWatch, setError, setValue]);

  const onSubmitSchema2 = (values: CreateProductV2) => {
    setError('');
    setSuccess('');

    const body = {
      name: values?.name,
      details: {
        ...values.details,
      },
      price: Number(values?.price?.replace(/\D/g, '')),
    };

    startTransition(async () => {
      try {
        await productService.saveProduct(body);

        setSuccess('Producto Cadastrado');
      } catch (error) {
        if (error?.response?.status === 409) {
          setError('Produto já existe');
          return;
        }

        setError('Ocorreu um erro, tente novamente');
      } finally {
        reset({
          details: {
            brand: '',
            color: '',
            model: '',
          },
          name: '',
          price: '',
        });
      }
    });
  };

  return (
    <Form {...formSchema2}>
      <form
        onSubmit={formSchema2.handleSubmit(onSubmitSchema2)}
        className="space-y-6"
      >
        <div
          className="space-y-4"
          onFocus={() => {
            setError('');
            setSuccess('');
          }}
        >
          <FormField
            control={formSchema2.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Nome do Produto"
                    type="text"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formSchema2.control}
            name="details.brand"
            render={({ field }) => (
              <FormItem>
                <BrandSelect field={field} isPending={isPending} />
              </FormItem>
            )}
          />
          <FormField
            control={formSchema2.control}
            name="details.model"
            render={({ field }) => (
              <FormItem>
                <ModelSelect field={field} isPending={isPending} />
              </FormItem>
            )}
          />
          <FormField
            control={formSchema2.control}
            name="details.color"
            render={({ field }) => (
              <FormItem>
                <ColorSelect field={field} isPending={isPending} />
              </FormItem>
            )}
          />
          <FormField
            control={formSchema2.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="R$ 2000,00"
                    type="text"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button type="submit" className="w-full" disabled={isPending}>
          Salvar - Segunda Estrutura
        </Button>
      </form>
    </Form>
  );
};
