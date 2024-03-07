'use client';

import AuthenticateService from '@/services/AuthService';
import { Navbar } from './_components/navbar';
import { useRouter } from 'next/navigation';
import { ProductsContextProvider } from '@/context/product-contex';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  const router = useRouter();
  const auth = new AuthenticateService();

  if (!auth.isAuthenticated()) {
    router.replace('/auth/login');
    return;
  }

  return (
    <div className="flex min-h-full flex-col items-center gap-y-4 bg-slate-800">
      <ProductsContextProvider>
        <Navbar />
        {children}
      </ProductsContextProvider>
    </div>
  );
};

export default ProtectedLayout;
