import { ProductService } from '@/lib/services/api/ProductService';

describe('ProductService', () => {
  let productService: ProductService;
  
  beforeEach(() => {
    productService = new ProductService();
    global.fetch = jest.fn();
  });

  it('fetches products successfully', async () => {
    const mockProducts = [
      {
        id: 1,
        title: 'Test Product',
        price: 99.99,
      },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProducts),
    });

    const products = await productService.getProducts();
    
    expect(products).toEqual(mockProducts);
    expect(global.fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products');
  });

  it('fetches single product successfully', async () => {
    const mockProduct = {
      id: 1,
      title: 'Test Product',
      price: 99.99,
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProduct),
    });

    const product = await productService.getProduct('1');
    
    expect(product).toEqual(mockProduct);
    expect(global.fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products/1');
  });

  it('handles fetch errors for products', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    await expect(productService.getProducts()).rejects.toThrow('Network error');
  });

  it('handles fetch errors for single product', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Product not found'));

    await expect(productService.getProduct('999')).rejects.toThrow('Product not found');
  });
});