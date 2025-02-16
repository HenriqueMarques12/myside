import { Product } from '@/lib/types/Product';

export interface IProductService {
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product>;
}

export class ProductService implements IProductService {
  private readonly baseUrl = 'https://fakestoreapi.com';

  async getProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${this.baseUrl}/products`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return response.json();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch products');
    }
  }

  async getProduct(id: string): Promise<Product> {
    try {
      const response = await fetch(`${this.baseUrl}/products/${id}`);
      if (!response.ok) {
        throw new Error('Product not found');
      }
      return response.json();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch product');
    }
  }
}