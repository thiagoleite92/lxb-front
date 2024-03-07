'use client';

import { ProductForm } from '@/components/product/product-form';

interface EditProductPageProps {
  params: { productId: string };
}

const EditProductPage = ({ params: { productId } }: EditProductPageProps) => {
  return <ProductForm productId={productId} />;
};

export default EditProductPage;
