'use client';

import { FormProductSchema1 } from '@/components/product/form-schema-1';
import { FormProductSchema2 } from '@/components/product/form-schema-2';
import { FormWrapper } from '@/components/product/form-wrapper';
import { usePathname } from 'next/navigation';
import { FormHeader } from './form-header';
import { useState } from 'react';
import { FormProductSchema3 } from './form-schema-3';

export enum FormVersionEnum {
  Version1 = 'version1',
  Version2 = 'version2',
  Version3 = 'version3',
}

export interface ProductFormProps {
  productId?: string;
}

export const ProductForm = ({ productId }: ProductFormProps) => {
  const [formVersion, setFormVersion] = useState<FormVersionEnum>(
    FormVersionEnum.Version1
  );

  const onChangeFormVersion = (formVersion: FormVersionEnum) => {
    setFormVersion(formVersion);
    return;
  };

  const pathname = usePathname();

  const isEdit = pathname.includes('/editar-produto');

  return (
    <FormWrapper>
      <FormHeader
        label={
          isEdit ? 'Edite os dados do produto' : 'Insira os dados do Produto'
        }
        title={
          isEdit
            ? 'Editar Produto'
            : `${
                formVersion === FormVersionEnum.Version1
                  ? 'Formulário I'
                  : formVersion === FormVersionEnum.Version2
                  ? 'Formulário II'
                  : 'Formulário III'
              }`
        }
        onChangeFormVersion={onChangeFormVersion}
        formVersion={formVersion}
      />
      {productId && <FormProductSchema1 productId={productId} />}
      {!productId && formVersion === FormVersionEnum.Version1 && (
        <FormProductSchema1 />
      )}
      {!productId && formVersion === FormVersionEnum.Version2 && (
        <FormProductSchema2 />
      )}
      {!productId && formVersion === FormVersionEnum.Version3 && (
        <FormProductSchema3 />
      )}
    </FormWrapper>
  );
};
