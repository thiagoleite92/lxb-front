'use client';

import AuthenticateService from '@/services/AuthService';
import { useRouter } from 'next/navigation';
import { ProductsContextProvider } from '@/context/product-contex';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProductFormLayout = ({ children }: ProtectedLayoutProps) => {
  const router = useRouter();
  const auth = new AuthenticateService();

  if (!auth.isAuthenticated()) {
    router.replace('/auth/login');
    return;
  }

  return (
    <div className="flex h-screen flex-col items-center  gap-y-10 bg-slate-800">
      <ProductsContextProvider>{children}</ProductsContextProvider>
    </div>
  );
};

export default ProductFormLayout;
