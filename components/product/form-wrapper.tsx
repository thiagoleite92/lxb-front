import { usePathname } from 'next/navigation';
import { Header } from '@/components/auth/header';
import { Card } from '@/components/ui/card';

interface FormWrapperProps {
  children: React.ReactNode;
}

export const FormWrapper = ({ children }: FormWrapperProps) => {
  const pathname = usePathname();

  const isEdit = pathname.includes('/editar-produto');

  const cardClass = isEdit
    ? 'h-5/6 w-3/4 shadow-md space-y-12 p-8'
    : 'size-5/6 p-8';

  return (
    <Card className={cardClass}>
      <Header
        label={
          isEdit ? 'Edite os dados do produto' : 'Insira os dados do Produto'
        }
        title={isEdit ? 'Editar Produto' : 'Novo Produto'}
      />
      <div
        className={
          isEdit
            ? 'w-1/2 m-auto flex items-center justify-center'
            : 'flex flex-col justify-evenly h-5/6 items-center'
        }
      >
        {children}
      </div>
    </Card>
  );
};
