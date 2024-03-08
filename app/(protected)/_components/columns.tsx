'use client';

import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useContext } from 'react';
import { ProductsContext } from '@/context/product-contex';
import Link from 'next/link';

export interface Product {
  id: number;
  name: string;
  price: number;
  color: string;
  brand: string;
  model: string;
}

export const columns: ColumnDef<Product>[] = [
  {
    header: 'Ações',
    id: 'actions',
    cell: ({ row }) => {
      const id = row.original.id;
      const { removeProduct, isPending } = useContext(ProductsContext);

      return (
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Opções</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <AlertDialogTrigger className="w-full flex justify-between">
                  Remover <Trash2 className="h-4 w-4" />
                </AlertDialogTrigger>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href={`/editar-produto/${id}`}
                  className="w-full flex justify-between"
                >
                  Editar <Pencil className="h-4 w-4" />
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Tem certeza que quer remover esse produto?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Essa ação não pode ser desfeita. O produto vai ser removido
                  inteiramente da nossa base de dados.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button
                    onClick={() => removeProduct(id)}
                    disabled={isPending}
                  >
                    Prosseguir
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </DropdownMenu>
        </AlertDialog>
      );
    },
  },
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'price',
    header: () => <div className="text-left">Preço</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price'));
      const formatted = new Intl.NumberFormat('pt-br', {
        style: 'currency',
        currency: 'BRL',
      }).format(price);

      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: 'brand',
    header: 'Marca',
  },
  {
    accessorKey: 'model',
    header: 'Modelo',
  },
  {
    accessorKey: 'color',
    header: 'Cor',
  },
];
