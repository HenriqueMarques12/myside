'use client';

import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/hooks/useCart';

const HeaderContainer = styled.header`
  background: ${props => props.theme.headerBackground};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const HeaderContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  position: relative;
  width: 150px;
  height: 40px;
`;

const CartButton = styled(Button)`
  position: relative;
  color: ${props => props.theme.textPrimary};
`;

const CartBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ef4444;
  color: white;
  border-radius: 9999px;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
`;

export const Header = () => {
  const { toggleCartDrawer, totalItems } = useCart();

  return (
    <HeaderContainer>
      <HeaderContent>
        <Link href="/" passHref>
          <Logo>
            <Image
              src="https://gallery-cdn.breezy.hr/1bbbe974-987d-4b2f-a594-2cc6ec9ea838/Logo%20MySide%20Horizontal%20-%20Vermelho.png"
              alt="MySide Logo"
              fill
              style={{ objectFit: 'contain' }}
            />
          </Logo>
        </Link>
        <CartButton variant="ghost" size="icon" onClick={toggleCartDrawer}>
          <ShoppingCart />
          {totalItems > 0 && <CartBadge>{totalItems}</CartBadge>}
        </CartButton>
      </HeaderContent>
    </HeaderContainer>
  );
};