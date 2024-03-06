'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Header } from '@/components/auth/header';
import { BackButton } from '@/components/auth/back-button';
import { usePathname } from 'next/navigation';

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
}

export const CardWrapper = ({
  backButtonHref,
  backButtonLabel,
  children,
  headerLabel,
}: CardWrapperProps) => {
  const pathname = usePathname();

  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header
          label={headerLabel}
          title={pathname.includes('login') ? 'Entrar' : 'Registrar'}
        />
      </CardHeader>
      <CardContent>{children}</CardContent>

      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};
