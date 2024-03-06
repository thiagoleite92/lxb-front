import { useContext, useEffect, useState } from 'react';
import { FormControl, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { NewItemEnum, ProductsContext } from '@/context/product-contex';

export const ColorSelect = ({ field, isPending }: any) => {
  const { colors, addNewItem } = useContext(ProductsContext);

  const existColors = colors?.length;

  const formLabel = existColors ? 'Selecione ou Insira Nova Cor' : 'Nova Cor';

  const [inputState, setInputState] = useState('');

  const inputOnChange = (event: any) => {
    field.onChange(event?.target.value);
    setInputState(event?.target.value);
  };

  useEffect(() => {
    if (inputState.length) {
      addNewItem(inputState, NewItemEnum.COLOR);
    }

    setInputState('');
  }, [isPending]);

  return (
    <>
      <FormLabel>{formLabel}</FormLabel>
      <div className="flex w-full gap-4">
        <div className="flex flex-col">
          <FormControl>
            <Input
              placeholder="Nova Cor"
              type="text"
              disabled={isPending}
              value={inputState}
              onChange={inputOnChange}
            />
          </FormControl>
          <FormMessage />
        </div>
        {existColors && (
          <Select
            disabled={inputState || isPending}
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {colors.map(({ value }) => (
                <SelectItem value={value}>{value}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </>
  );
};
