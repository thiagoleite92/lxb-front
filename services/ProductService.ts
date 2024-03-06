import { Product } from '@/app/(protected)/produtos/columns';
import HttpService from './HttpService';
import { CreateProductV1, CreateProductV2 } from '@/schemas';

export class ProductsService extends HttpService {
  async findAll(): Promise<{ data: Product[] }> {
    return this.get('/product');
  }

  async remove(id: number): Promise<void> {
    return this.delete(`/product/${id}`);
  }

  async fetchBrands(): Promise<{ data: { value: string }[] }> {
    return this.get('/product/brands');
  }
  async fetchColors(): Promise<{ data: { value: string }[] }> {
    return this.get('/product/colors');
  }
  async fetchModels(): Promise<{ data: { value: string }[] }> {
    return this.get('/product/models');
  }

  async saveProduct(product: any) {
    return this.post('/product', product);
  }
}
