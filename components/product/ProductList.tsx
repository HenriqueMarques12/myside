'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FileQuestion } from 'lucide-react';
import { Product } from '@/lib/types/Product';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  position: relative;
  z-index: 10;
  margin-top: 1rem;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: ${props => props.theme.textSecondary};

  svg {
    width: 48px;
    height: 48px;
    margin: 0 auto 1rem;
    color: ${props => props.theme.primary};
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: ${props => props.theme.textPrimary};
  }

  p {
    max-width: 24rem;
    margin: 0 auto;
  }
`;

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const ProductList = ({ products, isLoading }: ProductListProps) => {
  if (isLoading) {
    return (
      <Grid variants={container} initial="hidden" animate="show">
        {[...Array(8)].map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </Grid>
    );
  }

  if (products.length === 0) {
    return (
      <NoResults>
        <FileQuestion />
        <h3>Nenhum produto encontrado</h3>
        <p>
          Não encontramos produtos que correspondam à sua pesquisa. 
          Tente usar termos diferentes ou remover os filtros aplicados.
        </p>
      </NoResults>
    );
  }

  return (
    <Grid variants={container} initial="hidden" animate="show">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
};

export default ProductList;