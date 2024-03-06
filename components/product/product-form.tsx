import { FormProductSchema1 } from '@/components/product/form-schema-1';
import { FormProductSchema2 } from '@/components/product/form-schema-2';
import { FormWrapper } from '@/components/product/form-wrapper';

interface ProductFormProps {
  productId?: string;
}

export const ProductForm = ({ productId }: ProductFormProps) => {
  return (
    <FormWrapper>
      <div className="flex w-full justify-evenly overflow-y-auto">
        <div className="h-full">
          <FormProductSchema1 />
        </div>
        <FormProductSchema2 />
      </div>
    </FormWrapper>
  );
};
