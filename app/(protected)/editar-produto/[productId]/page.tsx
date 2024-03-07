'use client';

import { ProductForm } from '@/components/product/product-form';
import { ProductsContext } from '@/context/product-contex';
import { useContext } from 'react';

interface EditProductPageProps {
  params: { productId: string };
}

const EditProductPage = ({ params: { productId } }: EditProductPageProps) => {
  return <ProductForm productId={productId} />;
};

export default EditProductPage;
