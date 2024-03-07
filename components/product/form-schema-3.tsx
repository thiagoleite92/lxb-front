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
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';

import { BrandSelect } from './brand-select';
import { ModelSelect } from './model-select';
import { ColorSelect } from './color-select';
import { ProductsService } from '@/services/ProductService';
import { CreateProductV3, createProductSchemaV3 } from '@/schemas';
import { Plus, PlusCircle, X, XCircle } from 'lucide-react';

interface Produto {
  name: string;
  brand: string;
  model: string;
  data: {
    price: number;
    color: string;
  }[];
}

export const FormProductSchema3 = () => {
  const productService = new ProductsService();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [saveList, setSaveList] = useState<Produto[]>([]);

  const formSchema3 = useForm<CreateProductV3>({
    resolver: zodResolver(createProductSchemaV3),
    defaultValues: {
      products: {
        name: '',
        brand: '',
        model: '',
        data: [
          {
            color: '',
            price: '',
          },
        ],
      },
    },
  });

  const { control, reset } = formSchema3;

  const { fields, append, remove } = useFieldArray({
    name: 'products.data',
    control,
  });

  const addNewData = () => {
    append({
      color: '',
      price: '',
    });
  };

  const handleSubmitList = () => {
    startTransition(async () => {
      try {
        await productService.saveProduct(saveList);

        setSuccess('Produtos Cadastrados');
      } catch (error) {
        if (error?.response?.status === 409) {
          setError('Produto já existe');
          return;
        }

        setError('Ocorreu um erro, tente novamente');
      } finally {
        reset();
      }
    });
  };

  const saveOnList = (values: CreateProductV3) => {
    setError('');
    setSuccess('');

    const saveValue = {
      name: values.products.name,
      brand: values.products.brand,
      model: values.products.model,
      data: values.products.data.map((d) => ({
        price: parseInt(d.price),
        color: d.color,
      })),
    };

    setSaveList((oldState) => {
      const newState = [...oldState, saveValue];

      return newState;
    });

    reset();

    return;
  };

  return (
    <Form {...formSchema3}>
      <form className="space-y-6 text-slate-800">
        <div
          className="space-y-4"
          onFocus={() => {
            setError('');
            setSuccess('');
          }}
        >
          <FormField
            control={formSchema3.control}
            name="products.name"
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
            control={formSchema3.control}
            name="products.brand"
            render={({ field }) => (
              <FormItem>
                <BrandSelect field={field} isPending={isPending} />
              </FormItem>
            )}
          />
          <FormField
            control={formSchema3.control}
            name="products.model"
            render={({ field }) => (
              <FormItem>
                <ModelSelect field={field} isPending={isPending} />
              </FormItem>
            )}
          />

          <div className="border-b border-slate-800 flex">Cores e Preços</div>
          {fields.map((field, index) => {
            const colorName = `products.data.${index}.color`;
            const priceName = `products.data.${index}.price`;

            return (
              <div key={field.id}>
                <FormField
                  control={formSchema3.control}
                  name={colorName}
                  render={({ field }) => (
                    <FormItem>
                      <ColorSelect field={field} isPending={isPending} />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formSchema3.control}
                  name={priceName}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preço</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Preço"
                          type="text"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                      {fields?.length > 1 && (
                        <div className="border-b border-slate-400 flex justify-end text-destructive">
                          <Button
                            type="button"
                            onClick={() => remove(index)}
                            variant={'outline'}
                            className="flex gap-2"
                          >
                            Remover{' '}
                            <XCircle className="size-4 pointer-events-none " />
                          </Button>
                        </div>
                      )}
                    </FormItem>
                  )}
                />
              </div>
            );
          })}
          <Button
            type="button"
            onClick={addNewData}
            variant={'outline'}
            className="flex gap-2 text-emerald-500"
          >
            <span>Adicionar</span>
            <PlusCircle className="size-4 pointer-events-none" />
          </Button>
        </div>

        <FormError message={error} />
        <FormSuccess message={success} />
        <div className="flex gap-4">
          <Button
            type="button"
            className="w-full"
            disabled={isPending}
            onClick={formSchema3.handleSubmit(saveOnList)}
          >
            Adicionar a lista
          </Button>
          <Button
            type="button"
            className="w-full"
            disabled={!saveList?.length || isPending}
            onClick={handleSubmitList}
          >
            Salvar lista ({saveList?.length})
          </Button>
        </div>
      </form>
    </Form>
  );
};
