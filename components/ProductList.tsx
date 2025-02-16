'use client';

import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import type { Product } from '@/lib/types/Product';

const ProductGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ProductCard = styled(motion.div)`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ProductImageContainer = styled(motion.div)`
  position: relative;
  height: 250px;
  background: white;
  padding: 1rem;
`;

const ProductInfo = styled(motion.div)`
  padding: 1.5rem;
`;

const ProductTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: #111;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProductDescription = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProductPrice = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111;
  margin-bottom: 1rem;
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

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const ProductList = ({ products, isLoading }: ProductListProps) => {
  if (isLoading) {
    return (
      <ProductGrid
        variants={container}
        initial="hidden"
        animate="show"
      >
        {[...Array(8)].map((_, index) => (
          <ProductCard
            key={index}
            variants={item}
          >
            <ProductImageContainer style={{ background: '#f3f4f6' }} />
            <ProductInfo>
              <div style={{ height: '20px', background: '#f3f4f6', marginBottom: '0.5rem' }} />
              <div style={{ height: '40px', background: '#f3f4f6', marginBottom: '1rem' }} />
              <div style={{ height: '24px', background: '#f3f4f6', width: '100px' }} />
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductGrid>
    );
  }

  return (
    <ProductGrid
      variants={container}
      initial="hidden"
      animate="show"
    >
      {products.map((product) => (
        <Link href={`/product/${product.id}`} key={product.id} style={{ textDecoration: 'none' }}>
          <ProductCard
            variants={item}
            whileHover={{
              y: -4,
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: { duration: 0.2 }
            }}
          >
            <ProductImageContainer
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src={product.image}
                alt={product.title}
                fill
                style={{ objectFit: 'contain' }}
              />
            </ProductImageContainer>
            <ProductInfo>
              <ProductTitle>{product.title}</ProductTitle>
              <ProductDescription>{product.description}</ProductDescription>
              <ProductPrice>R$ {product.price.toFixed(2)}</ProductPrice>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button>
                  Adicionar ao Carrinho
                </Button>
              </motion.div>
            </ProductInfo>
          </ProductCard>
        </Link>
      ))}
    </ProductGrid>
  );
};

export default ProductList;