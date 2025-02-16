'use client';

import { motion } from 'framer-motion';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types/Product';
import { useCart } from '@/lib/hooks/useCart';

const Card = styled(motion.div)`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ImageContainer = styled(motion.div)`
  position: relative;
  height: 250px;
  background: white;
  padding: 1rem;
`;

const Info = styled(motion.div)`
  padding: 1.5rem;
`;

const Title = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: #111;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Description = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Price = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111;
  margin-bottom: 1rem;
`;

const AnimatedButton = styled(motion.button)``;

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
  };

  return (
    <Link href={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
      <Card
        whileHover={{
          y: -4,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: { duration: 0.2 }
        }}
      >
        <ImageContainer
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <Image
            src={product.image}
            alt={product.title}
            fill
            style={{ objectFit: 'contain' }}
          />
        </ImageContainer>
        <Info>
          <Title>{product.title}</Title>
          <Description>{product.description}</Description>
          <Price>R$ {product.price.toFixed(2)}</Price>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button onClick={handleAddToCart}>
              Adicionar ao Carrinho
            </Button>
          </motion.div>
        </Info>
      </Card>
    </Link>
  );
};

export default ProductCard;