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

export const ModelSelect = ({ field, isPending }: any) => {
  const [key, setKey] = useState(+new Date());
  const { models, addNewItem } = useContext(ProductsContext);

  const existModel = models?.length;

  const formLabel = existModel ? 'Digite ou Selecione o Modelo' : 'Novo Modelo';

  const [inputState, setInputState] = useState('');

  const inputOnChange = (event: any) => {
    setInputState(event?.target.value);
    field.onChange(event?.target.value);
  };

  useEffect(() => {
    if (inputState.length) {
      addNewItem(inputState, NewItemEnum.MODEL);
    }

    setInputState('');
    setKey(+new Date());
  }, [isPending]);

  return (
    <>
      <FormLabel>{formLabel}</FormLabel>
      <div className="flex w-full gap-4">
        <div className="flex flex-col">
          <FormControl>
            <Input
              placeholder="Modelo"
              type="text"
              disabled={isPending}
              value={inputState}
              onChange={inputOnChange}
            />
          </FormControl>
          <FormMessage />
        </div>
        {existModel && (
          <Select
            disabled={inputState || isPending}
            onValueChange={field.onChange}
            defaultValue={field.value}
            key={key}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {models.map(({ value }) => (
                <SelectItem value={value}>{value}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </>
  );
};
