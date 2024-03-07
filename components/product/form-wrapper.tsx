import { usePathname } from 'next/navigation';
import { Header } from '@/components/auth/header';
import { Card } from '@/components/ui/card';

interface FormWrapperProps {
  children: React.ReactNode;
}

export const FormWrapper = ({ children }: FormWrapperProps) => {
  const pathname = usePathname();

  const isEdit = pathname.includes('/editar-produto');

  return (
    <Card className="w-full overflow-y-auto px-1 rounded-none sm:w-5/6 sm:mb-2 sm:pb-8 sm:rounded-sm mt-2">
      <div className="sm:w-1/2 sm:mx-auto sm:mt-4 ">{children}</div>
    </Card>
  );
};
