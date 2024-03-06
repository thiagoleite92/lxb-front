import { Product } from '@/app/(protected)/produtos/columns';
import { ProductsService } from '@/services/ProductService';
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from 'react';
import { toast } from 'sonner';

interface ProductsContextType {
  products: Product[];
  isPending: boolean;
  removeProduct: (id: number) => Promise<void>;
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

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, isPending, removeProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};
