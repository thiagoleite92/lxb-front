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
import {
  CreateProduct1,
  CreateProductV1,
  Product,
  SaveProduct,
  createProductSchemaV1,
} from '@/schemas';
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
  const [resetInput, setResetInput] = useState(false);

  const formSchema1 = useForm<CreateProductV1>({
    resolver: zodResolver(createProductSchemaV1),
    defaultValues: {
      brand: '',
      color: '',
      model: '',
      name: '',
      price: '',
    },
  });

  const { watch, setValue, reset } = formSchema1;

  const priceWatch = watch('price');

  useEffect(() => {
    setValue('price', formatCurrency(priceWatch));
  }, [priceWatch, setError, setValue]);

  const onSubmitSchema1 = (values: CreateProduct1) => {
    setError('');
    setSuccess('');

    console.log(values);

    startTransition(async () => {
      try {
        await productService.saveProduct(values);

        setSuccess('Producto Cadastrado');
        reset();
        setResetInput((oldState) => !oldState);
      } catch (error) {
        console.log(error);
        setError('Ocorreu um erro, tente novamente');
        reset();
        setResetInput((oldState) => !oldState);
      }
    });
  };

  return (
    <Form {...formSchema1}>
      <form
        onSubmit={formSchema1.handleSubmit(onSubmitSchema1)}
        className="space-y-6"
      >
        <div className="space-y-4">
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
                <BrandSelect
                  field={field}
                  isPending={isPending}
                  resetInput={resetInput}
                />
              </FormItem>
            )}
          />
          <FormField
            control={formSchema1.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <ModelSelect
                  field={field}
                  isPending={isPending}
                  resetInput={resetInput}
                />
              </FormItem>
            )}
          />
          <FormField
            control={formSchema1.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <ColorSelect
                  field={field}
                  isPending={isPending}
                  resetInput={resetInput}
                />
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
          Salvar - Primeira Estrutura
        </Button>
      </form>
    </Form>
  );
};
