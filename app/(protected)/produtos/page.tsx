'use client';

import { ProductsContext } from '@/context/product-contex';
import { columns } from './columns';
import { DataTable } from './data-table';
import { useContext } from 'react';

export default function ProductsList() {
  const { products } = useContext(ProductsContext);

  return (
    <>
      <div className="flex flex-col w-5/6 h-5/6 justify-center items-center rounded-xl bg-secondary p-4 shadow-sm">
        {products?.length ? (
          <DataTable columns={columns} data={products} haveData />
        ) : (
          <span>
            A sua lista de produtos parece estar vazia. Clique aqui para
            cadastrar um produto
          </span>
        )}
      </div>
    </>
  );
}
