'use client';

import {
  ShoppingCart,
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Clock,
  HelpCircle,
  FileText,
  Shield,
  Users,
  Heart,
  Leaf
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import useProducts from '@/lib/hooks/useProducts';
import ProductList from '@/components/product/ProductList';
import SearchFilters from '@/components/SearchFilters';
import Pagination from '@/components/Pagination';
import { useCart } from '@/lib/hooks/useCart';
import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import PromotionalBanner from '@/components/PromotionalBanner';

const Container = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.foreground};
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const MainContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
  flex: 1;

  @media (min-width: 640px) {
    padding: 2rem;
  }
`;




export default function Home() {
  const [mounted, setMounted] = useState(false);
  const {
    paginatedProducts,
    categories,
    isLoading,
    error,
    setFilters,
    filters,
    pagination,
    setCurrentPage
  } = useProducts();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (error) {
    return (
      <Container>
        <MainContent>
          <div>Error: {error.message}</div>
        </MainContent>
      </Container>
    );
  }

  return (
    <Container>
      <PromotionalBanner />
      <Header />
      <MainContent>
        <SearchFilters
          categories={categories}
          filters={filters}
          onFilterChange={setFilters}
        />
        <ProductList products={paginatedProducts} isLoading={isLoading} />
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={setCurrentPage}
        />
      </MainContent>
      <Footer />
    </Container>
  );
}