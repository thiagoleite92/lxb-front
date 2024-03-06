import { ProductForm } from '@/components/product/product-form';

interface EditProductPageProps {
  params: { productId: string };
}

const EditProductPage = ({ params: { productId } }: EditProductPageProps) => {
  console.log(productId);
  return <ProductForm productId={productId} />;
};

export default EditProductPage;
