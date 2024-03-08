import { Search, X } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ProductsContext } from '@/context/product-contex';
import { useContext, useState } from 'react';

export const Filter = () => {
  const { setFilter } = useContext(ProductsContext);

  const [inputValue, setInputValue] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);

  const handleFilter = () => {
    if (inputValue?.length < 3) {
      return;
    }

    setFilter(inputValue);
    setIsFiltered(true);
  };

  const handleClear = () => {
    setInputValue('');
    setFilter('');
    setIsFiltered(false);
  };

  return (
    <form className="flex mx-10 gap-8 flex-1">
      <Input
        placeholder="3 dígitos ou mais: busque por Nome"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button variant="outline" type="button" onClick={handleFilter}>
        Buscar <Search />
      </Button>
      {isFiltered && (
        <Button variant="outline" onClick={handleClear} type="button">
          Limpar <X />
        </Button>
      )}
    </form>
  );
};
