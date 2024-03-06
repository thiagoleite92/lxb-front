'use client';

import AuthenticateService from '@/services/AuthService';
import { useRouter } from 'next/navigation';

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const router = useRouter();

  const auth = new AuthenticateService();

  const onClick = () => {
    auth.logout();

    router.replace('/auth/login');
  };

  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  );
};
