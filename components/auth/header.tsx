import { Poppins } from 'next/font/google';

import { cn } from '@/lib/utils';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

interface HeaderProps {
  label: string;
  title: string;
}

export const Header = ({ label, title }: HeaderProps) => {
  return (
    <div className="flex w-full flex-col items-center gap-y-4">
      <h1 className={cn('text-3xl font-semibold', font.className)}>{title}</h1>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
};
