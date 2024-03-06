'use client';

import { CardWrapper } from '@/components/auth/card-wrapper';
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
  CreateProductV1,
  CreateProductV2,
  createProductSchemaV1,
} from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { FormWrapper } from './form-wrapper';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FormProductSchema1 } from './form-schema-1';

interface ProductFormProps {
  productId?: string;
}

export const ProductForm = ({ productId }: ProductFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const formSchema2 = useForm<CreateProductV2>({
    resolver: zodResolver(createProductSchemaV1),
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

  const onSubmitSchema2 = (values: CreateProductV2) => {
    setError('');
    setSuccess('');

    startTransition(async () => {
      try {
        console.log('criou');
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <FormWrapper>
      <div className="flex w-full justify-evenly overflow-y-auto">
        <div className="h-full">
          <FormProductSchema1 />
        </div>
        <Form {...formSchema2}>
          <form
            onSubmit={formSchema2.handleSubmit(onSubmitSchema2)}
            className="space-y-6 h-fit"
          >
            <div className="space-y-4">
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
                    <FormLabel>Marca</FormLabel>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma Marca" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={'xau'}>Admin</SelectItem>
                        <SelectItem value={'oi'}>User</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formSchema2.control}
                name="details.model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Modelo</FormLabel>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um Modelo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={'xau'}>Admin</SelectItem>
                        <SelectItem value={'oi'}>User</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formSchema2.control}
                name="details.color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marca</FormLabel>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma Cor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={'xau'}>Admin</SelectItem>
                        <SelectItem value={'oi'}>User</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
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
                        placeholder="email@email.com"
                        type="email"
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
      </div>
    </FormWrapper>
  );
};
