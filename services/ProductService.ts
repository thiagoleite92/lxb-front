import { Product } from '@/app/(protected)/produtos/columns';
import HttpService from './HttpService';

export class ProductsService extends HttpService {
  async findAll(): Promise<{ data: Product[] }> {
    return this.get('/product');
  }

  async remove(id: number): Promise<void> {
    return this.delete(`/product/${id}`);
  }
}
