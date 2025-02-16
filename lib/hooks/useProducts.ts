'use client';

import { useState, useEffect } from 'react';
import { Product, ProductFilters } from '@/lib/types/Product';
import { ProductService } from '@/lib/services/api/ProductService';

interface UseProductsReturn {
  products: Product[];
  filteredProducts: Product[];
  paginatedProducts: Product[];
  categories: string[];
  isLoading: boolean;
  error: Error | null;
  setFilters: (filters: Partial<ProductFilters>) => void;
  filters: ProductFilters;
  pagination: {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
  };
  setCurrentPage: (page: number) => void;
}

const productService = new ProductService();

const useProducts = (): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [filters, setFilters] = useState<ProductFilters>({
    searchQuery: '',
    category: 'all',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getProducts();
        setProducts(data);
        
        const uniqueCategories = Array.from(new Set(data.map(product => product.category)));
        setCategories(uniqueCategories);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch products'));
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(filters.searchQuery.toLowerCase());
    const matchesCategory = filters.category === 'all' || product.category === filters.category;
    
    return matchesSearch && matchesCategory;
  });

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const updateFilters = (newFilters: Partial<ProductFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return {
    products,
    filteredProducts,
    paginatedProducts,
    categories,
    isLoading,
    error,
    setFilters: updateFilters,
    filters,
    pagination: {
      currentPage,
      totalPages,
      itemsPerPage,
    },
    setCurrentPage,
  };
};

export default useProducts;