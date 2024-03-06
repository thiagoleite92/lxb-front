import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
});

export type LoginBody = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z.string().min(6, {
    message: 'Minimum 6 characters required',
  }),
  name: z.string().min(1, {
    message: 'Name is required',
  }),
});

export type RegisterBody = z.infer<typeof RegisterSchema>;

export const createProductSchemaV1 = z.object({
  name: z.string().min(3, 'Mínimo 3 caracteres ou Selecione').max(50),
  price: z.string().min(1, 'Informe o preço'),
  color: z.string().min(3, 'Mínimo 3 caracteres ou Selecione').max(50),
  brand: z.string().min(3, 'Mínimo 3 caracteres ou Selecione').max(50),
  model: z.string().min(3, 'Mínimo 3 caracteres ou Selecione').max(50),
});

export type CreateProduct1 = z.infer<typeof createProductSchemaV1>;

export const createProductSchemaV2 = z.object({
  name: z.string().min(3, 'Mínimo 3 caracteres').max(50),
  details: z.object({
    brand: z.string().min(3, 'Mínimo 3 caracteres ou Selecione').max(50),
    model: z.string().min(3, 'Mínimo 3 caracteres ou Selecione').max(50),
    color: z.string().min(3, 'Mínimo 3 caracteres ou Selecione').max(50),
  }),
  price: z.string().min(1, 'Informe o preço'),
});

export type CreateProductV2 = z.infer<typeof createProductSchemaV2>;
