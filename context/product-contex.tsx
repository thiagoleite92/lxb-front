import { Product } from '@/app/(protected)/produtos/columns';
import { ProductsService } from '@/services/ProductService';
import {
  ReactNode,
  createContext,
  useEffect,
  useState,
  useTransition,
} from 'react';
import { toast } from 'sonner';

export enum NewItemEnum {
  BRAND = 'brand',
  MODEL = 'model',
  COLOR = 'color',
}

interface ProductsContextType {
  products: Product[];
  isPending: boolean;
  removeProduct: (id: number) => Promise<void>;
  addNewItem: (value: string, item: NewItemEnum) => void;
  brands: { value: string }[];
  colors: { value: string }[];
  models: { value: string }[];
}

export const ProductsContext = createContext({} as ProductsContextType);

interface ProductsContextProviderProps {
  children: ReactNode;
}

export const ProductsContextProvider = ({
  children,
}: ProductsContextProviderProps) => {
  const productsService = new ProductsService();

  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<{ value: string }[]>([]);
  const [colors, setColors] = useState<{ value: string }[]>([]);
  const [models, setModels] = useState<{ value: string }[]>([]);
  const [isPending, startTransition] = useTransition();

  const fetchProducts = async () => {
    startTransition;
    try {
      const { data } = await productsService.findAll();

      if (data) {
        setProducts(data);
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBrands = async () => {
    startTransition;
    try {
      const { data } = await productsService.fetchBrands();

      if (data) {
        setBrands(data);
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchModels = async () => {
    startTransition;
    try {
      const { data } = await productsService.fetchModels();

      if (data) {
        setModels(data);
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchColors = async () => {
    startTransition;
    try {
      const { data } = await productsService.fetchColors();

      console.log(data, 'colors context');

      if (data) {
        setColors(data);
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const removeProduct = async (id: number) => {
    startTransition;
    try {
      await productsService.remove(id);

      setProducts((oldState) =>
        oldState.filter((product) => product?.id !== id)
      );

      toast.message('Produto removido');
    } catch (error) {
      console.log(error);
      toast.message('Houve um erro ao remover o produto, tente mais tarde');
    }
  };

  const addNewItem = (value: string, item: 'brand' | 'color' | 'model') => {
    const states = {
      brand: () =>
        setBrands((oldState) => {
          oldState.push({ value });
          return oldState;
        }),
      model: () =>
        setModels((oldState) => {
          oldState.push({ value });
          return oldState;
        }),
      color: () =>
        setColors((oldState) => {
          oldState.push({ value });
          return oldState;
        }),
    };

    states[item]();

    return;
  };

  useEffect(() => {
    fetchProducts();
    fetchBrands();
    fetchModels();
    fetchColors();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        isPending,
        removeProduct,
        brands,
        colors,
        models,
        addNewItem,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
