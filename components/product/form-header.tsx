import { Poppins } from 'next/font/google';

import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { FormVersionEnum } from './product-form';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

interface HeaderProps {
  label: string;
  title: string;
  onChangeFormVersion: (formVersion: FormVersionEnum) => void;
  formVersion: FormVersionEnum;
}

export const FormHeader = ({
  label,
  title,
  onChangeFormVersion,
  formVersion,
}: HeaderProps) => {
  console.log(formVersion);

  const onClick = (event) => {
    const { name } = event?.target;

    if (name === 'forward' && formVersion === FormVersionEnum.Version1) {
      onChangeFormVersion(FormVersionEnum.Version2);
      return;
    }

    if (name === 'forward' && formVersion === FormVersionEnum.Version2) {
      onChangeFormVersion(FormVersionEnum.Version3);
      return;
    }

    if (name === 'backward' && formVersion === FormVersionEnum.Version2) {
      onChangeFormVersion(FormVersionEnum.Version1);
      return;
    }

    if (name === 'backward' && formVersion === FormVersionEnum.Version3) {
      onChangeFormVersion(FormVersionEnum.Version2);
      return;
    }
  };

  return (
    <div className="flex w-full items-center">
      <div className="flex flex-col justify-center w-full ">
        <h1 className={cn('text-3xl font-semibold', font.className)}>
          {title}
        </h1>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
      <div className="flex w-full justify-evenly ">
        <Button
          onClick={onClick}
          name="backward"
          disabled={formVersion === FormVersionEnum.Version1}
        >
          <ChevronLeft className="pointer-events-none" />
          Voltar
        </Button>

        <Button
          onClick={onClick}
          name="forward"
          disabled={formVersion === FormVersionEnum.Version3}
        >
          Avançar
          <ChevronRight className="pointer-events-none" />
        </Button>
      </div>
    </div>
  );
};
