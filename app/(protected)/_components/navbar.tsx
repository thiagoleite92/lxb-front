'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { UserButton } from '@/components/auth/user-button';

export const Navbar = () => {
  const pathname = usePathname();

  const newProduct = pathname === '/novo-produto';
  const editProduct = pathname.includes('/editar-produto');

  return (
    <nav className="flex w-5/6 items-center justify-between rounded-xl bg-secondary p-4 shadow-sm">
      <div className="flex gap-x-2 overflow-x-auto">
        <Button
          asChild
          variant={pathname === '/produtos' ? 'default' : 'outline'}
        >
          <Link href="/produtos">Produtos</Link>
        </Button>

        <Button asChild variant={newProduct ? 'default' : 'outline'}>
          <Link href={newProduct ? '/produtos' : '/novo-produto'}>
            {newProduct ? 'Cancelar' : 'Novo Produto'}
          </Link>
        </Button>
        {editProduct && (
          <Button asChild variant={editProduct ? 'default' : 'outline'}>
            <Link href="/produtos">Cancelar</Link>
          </Button>
        )}
      </div>
      <UserButton />
    </nav>
  );
};
