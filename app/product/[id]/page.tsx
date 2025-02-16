'use client';

import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useCart } from '@/lib/hooks/useCart';
import useProduct from '@/lib/hooks/useProduct';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

const Container = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.foreground};
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const MainContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const ProductContainer = styled.div`
  background: ${props => props.theme.cardBackground};
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  transition: background-color 0.3s ease;
`;

const BackLink = styled.a`
  display: inline-flex;
  align-items: center;
  color: ${props => props.theme.secondary};
  font-size: 0.875rem;
  margin-bottom: 2rem;
  text-decoration: none;
  
  &:hover {
    color: ${props => props.theme.textPrimary};
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ProductImageContainer = styled.div`
  position: relative;
  height: 400px;
  background: white;
  border-radius: 0.5rem;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ProductTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: ${props => props.theme.textPrimary};
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Price = styled.span`
  font-size: 2rem;
  font-weight: bold;
  color: ${props => props.theme.textPrimary};
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${props => props.theme.textPrimary};
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  color: ${props => props.theme.secondary};
  line-height: 1.5;
`;

const Category = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background: ${props => props.theme.muted};
  color: ${props => props.theme.textPrimary};
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
`;

const LoadingContainer = styled.div`
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  background: ${props => props.theme.muted};
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: .5;
    }
  }
`;

export default function ProductPage({ params }: { params: { id: string } }) {
  const [mounted, setMounted] = useState(false);
  const { product, isLoading, error } = useProduct(params.id);
  const { addItem, toggleCartDrawer } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
      toggleCartDrawer();
    }
  };

  if (isLoading) {
    return (
      <Container>
        <MainContent>
          <ProductContainer>
            <ProductGrid>
              <LoadingContainer style={{ height: '400px', borderRadius: '0.5rem' }} />
              <LoadingContainer>
                <div style={{ height: '32px', marginBottom: '1rem' }} />
                <div style={{ height: '20px', width: '100px', marginBottom: '1rem' }} />
                <div style={{ height: '100px' }} />
              </LoadingContainer>
            </ProductGrid>
          </ProductContainer>
        </MainContent>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container>
        <MainContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <ProductTitle style={{ marginBottom: '1rem' }}>
              {error || 'Produto não encontrado'}
            </ProductTitle>
            <Link href="/" passHref>
              <Button>
                <ArrowLeft style={{ marginRight: '0.5rem' }} />
                Voltar
              </Button>
            </Link>
          </div>
        </MainContent>
      </Container>
    );
  }

  return (
    <Container>
      <Header />
      <MainContent>
        <ProductContainer>
          <Link href="/" passHref>
            <BackLink>
              <ArrowLeft style={{ marginRight: '0.5rem' }} />
              Voltar
            </BackLink>
          </Link>

          <ProductGrid>
            <ProductImageContainer>
              <Image
                src={product.image}
                alt={product.title}
                fill
                style={{ objectFit: 'contain' }}
              />
            </ProductImageContainer>

            <ProductInfo>
              <ProductTitle>{product.title}</ProductTitle>
              <PriceContainer>
                <Price>R$ {product.price.toFixed(2)}</Price>
              </PriceContainer>

              <Section>
                <SectionTitle>Description</SectionTitle>
                <Description>{product.description}</Description>
              </Section>

              <Section>
                <SectionTitle>Category</SectionTitle>
                <Category>{product.category}</Category>
              </Section>

              <Button size="lg" onClick={handleAddToCart}>
                <ShoppingCart style={{ marginRight: '0.5rem' }} />
                Adicionar ao carrinho
              </Button>
            </ProductInfo>
          </ProductGrid>
        </ProductContainer>

      </MainContent>
      <Footer />
    </Container>
  );
}