'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { UserButton } from '@/components/auth/user-button';

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex w-5/6 items-center justify-between rounded-xl bg-secondary p-4 shadow-sm">
      <div className="flex gap-x-2 ">
        <Button
          asChild
          variant={pathname === '/produtos' ? 'default' : 'outline'}
        >
          <Link href="/produtos">Produtos</Link>
        </Button>

        <Button
          asChild
          variant={pathname === '/novo-produto' ? 'default' : 'outline'}
        >
          <Link href="/novo-produto">Novo Produto</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
};
