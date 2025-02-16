'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/lib/types/Product';
import { ProductService } from '@/lib/services/api/ProductService';

interface UseProductReturn {
  product: Product | null;
  isLoading: boolean;
  error: string | null;
}

const productService = new ProductService();

const useProduct = (id: string): UseProductReturn => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productService.getProduct(id);
        setProduct(data);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch product');
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return {
    product,
    isLoading,
    error,
  };
};

export default useProduct;