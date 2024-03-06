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

export const BrandSelect = ({ field, isPending }: any) => {
  const { brands, addNewItem } = useContext(ProductsContext);

  const existBrand = brands?.length;

  const formLabel = existBrand ? 'Digite ou Selecione a Marca' : 'Nova Marca';

  const [inputState, setInputState] = useState('');

  const inputOnChange = (event: any) => {
    field.onChange(event?.target.value);
    setInputState(event?.target.value);
  };

  useEffect(() => {
    if (inputState.length) {
      addNewItem(inputState, NewItemEnum.BRAND);
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
              placeholder="Marca"
              type="text"
              disabled={isPending}
              value={inputState}
              onChange={inputOnChange}
            />
          </FormControl>
          <FormMessage />
        </div>
        {existBrand && (
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
              {brands.map(({ value }) => (
                <SelectItem value={value}>{value}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </>
  );
};
