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
import { CreateProduct1, createProductSchemaV1 } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState, useTransition } from 'react';

import { BrandSelect } from './brand-select';
import { ModelSelect } from './model-select';
import { ColorSelect } from './color-select';
import { ProductsService } from '@/services/ProductService';
import formatCurrency from '@/utils/formatCurrency';

export const FormProductSchema1 = () => {
  const productService = new ProductsService();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const formSchema1 = useForm<CreateProduct1>({
    resolver: zodResolver(createProductSchemaV1),
    defaultValues: {
      brand: '',
      color: '',
      model: '',
      name: '',
      price: '',
    },
  });

  const { watch, setValue, reset, resetField } = formSchema1;

  const priceWatch = watch('price');

  useEffect(() => {
    return setValue('price', formatCurrency(priceWatch));
  }, [priceWatch, setError, setValue]);

  const onSubmitSchema1 = (values: CreateProduct1) => {
    setError('');
    setSuccess('');

    const body = {
      ...values,
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
          brand: '',
          color: '',
          model: '',
          name: '',
          price: '',
        });
      }
    });
  };

  const teste = 'w-full bg-red-500';

  return (
    <Form {...formSchema1}>
      <form
        onSubmit={formSchema1.handleSubmit(onSubmitSchema1)}
        className="space-y-6 text-slate-800"
      >
        <div
          className="space-y-4"
          onFocus={() => {
            setError('');
            setSuccess('');
          }}
        >
          <FormField
            control={formSchema1.control}
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
            control={formSchema1.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <BrandSelect field={field} isPending={isPending} />
              </FormItem>
            )}
          />
          <FormField
            control={formSchema1.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <ModelSelect field={field} isPending={isPending} />
              </FormItem>
            )}
          />
          <FormField
            control={formSchema1.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <ColorSelect field={field} isPending={isPending} />
              </FormItem>
            )}
          />
          <FormField
            control={formSchema1.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="R$ 1000,00"
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
          Salvar
        </Button>
      </form>
    </Form>
  );
};
