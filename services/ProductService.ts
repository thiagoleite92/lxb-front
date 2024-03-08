import { Product } from '@/app/(protected)/produtos/columns';
import HttpService from './HttpService';

export class ProductsService extends HttpService {
  async findAll(search?: string): Promise<{ data: Product[] }> {
    return this.get(`/product?search=${search}`);
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

  async save(product: any) {
    return this.post('/product', product);
  }

  async update(product: any, productId: string) {
    return this.put(`/product/${productId}`, product);
  }

  async fetchProductDetails(productId: string) {
    return this.get(`/product/${productId}`);
  }
}
