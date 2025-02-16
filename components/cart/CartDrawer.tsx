'use client';

import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { X, Minus, Plus, ShoppingBag, Truck, Trash2, Construction, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/hooks/useCart';
import Image from 'next/image';
import Modal from '@/components/ui/modal';
import { useState } from 'react';
import ShippingCalculator from './ShippingCalculator';
import { ShippingOption } from '@/lib/types/Shipping';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 40;
`;

const Drawer = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 400px;
  background: ${props => props.theme.cardBackground};
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.1);
  z-index: 50;
  display: flex;
  flex-direction: column;
  color: ${props => props.theme.textPrimary};
`;

const Header = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.textPrimary};
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
`;

const Footer = styled.div`
  padding: 1rem;
  border-top: 1px solid ${props => props.theme.border};
  background: ${props => props.theme.cardBackground};
`;

const CartItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.border};

  &:last-child {
    border-bottom: none;
  }
`;

const ItemImage = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  background: white;
  border-radius: 0.375rem;
  overflow: hidden;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemTitle = styled.h3`
  font-weight: 500;
  color: ${props => props.theme.textPrimary};
  margin-bottom: 0.25rem;
`;

const ItemPrice = styled.p`
  font-weight: 600;
  color: ${props => props.theme.textPrimary};
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${props => props.theme.textSecondary};
`;

const CartActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const FreeShippingProgress = styled.div<{ $progress: number }>`
  background: ${props => props.theme.muted};
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 1rem 0;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: ${props => props.$progress}%;
    background: ${props => props.theme.primary}20;
    transition: width 0.3s ease;
  }

  p {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: ${props => props.theme.textPrimary};
    position: relative;
    z-index: 1;
  }
`;

const CheckoutInfo = styled.div`
  margin-bottom: 1rem;

  > div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    color: ${props => props.theme.textSecondary};

    &:last-child {
      margin-bottom: 0;
      font-size: 1rem;
      font-weight: 600;
      color: ${props => props.theme.textPrimary};
    }
  }
`;

const ImplementationMessage = styled.div`
  text-align: center;
  padding: 2rem;

  svg {
    width: 48px;
    height: 48px;
    color: ${props => props.theme.primary};
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: ${props => props.theme.textPrimary};
  }

  p {
    color: ${props => props.theme.textSecondary};
    margin-bottom: 1.5rem;
  }
`;

const CouponSection = styled.div`
  margin: 1rem 0;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme.border};
`;

const CouponInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.border};
  border-radius: 0.5rem;
  background: ${props => props.theme.background};
  color: ${props => props.theme.textPrimary};
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.primary}20;
  }

  &::placeholder {
    color: ${props => props.theme.mutedForeground};
  }
`;

const AppliedCoupon = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${props => props.theme.primary}10;
  border: 1px dashed ${props => props.theme.primary};
  border-radius: 0.5rem;
  color: ${props => props.theme.primary};
  font-size: 0.875rem;
  margin-top: 0.5rem;

  svg {
    width: 16px;
    height: 16px;
  }
`;

const ErrorMessage = styled.p`
  color: ${props => props.theme.destructive};
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const CartDrawer = () => {
  const { 
    items, 
    isOpen, 
    totalItems,
    subtotal,
    discount,
    totalPrice,
    couponCode,
    removeItem, 
    updateItemQuantity, 
    toggleCartDrawer,
    clearCartItems,
    applyCouponCode,
    removeCouponCode
  } = useCart();

  const [showImplementationModal, setShowImplementationModal] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption | null>(null);
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setcouponError] = useState<string | null>(null);
  
  const freeShippingThreshold = 199;
  const shippingProgress = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  const handleShippingSelect = (option: ShippingOption) => {
    setSelectedShipping(option);
  };

  const handleApplyCoupon = () => {
    const success = applyCouponCode(couponInput);
    if (success) {
      setCouponInput('');
      setcouponError(null);
    } else {
      setcouponError('Cupom inválido');
    }
  };

  const finalPrice = totalPrice + (selectedShipping?.price || 0);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleCartDrawer}
            />
            <Drawer
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
            >
              <Header>
                <Title>Carrinho ({totalItems})</Title>
                <Button variant="ghost" size="icon" onClick={toggleCartDrawer}>
                  <X size={20} />
                </Button>
              </Header>

              <Content>
                {items.length === 0 ? (
                  <EmptyCart>
                    <ShoppingBag size={48} style={{ margin: '0 auto 1rem' }} />
                    <p>Seu carrinho está vazio</p>
                  </EmptyCart>
                ) : (
                  <>
                    <CartActions>
                      <Button 
                        variant="destructive" 
                        onClick={clearCartItems}
                        className="w-full"
                      >
                        <Trash2 size={16} className="mr-2" />
                        Limpar Carrinho
                      </Button>
                    </CartActions>
                    {items.map((item) => (
                      <CartItem key={item.id}>
                        <ItemImage>
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            style={{ objectFit: 'contain' }}
                          />
                        </ItemImage>
                        <ItemInfo>
                          <ItemTitle>{item.title}</ItemTitle>
                          <ItemPrice>R$ {(item.price * item.quantity).toFixed(2)}</ItemPrice>
                          <QuantityControl>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus size={16} />
                            </Button>
                            <span>{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(item.id)}
                            >
                              <X size={16} />
                            </Button>
                          </QuantityControl>
                        </ItemInfo>
                      </CartItem>
                    ))}

                    {subtotal < freeShippingThreshold && (
                      <FreeShippingProgress $progress={shippingProgress}>
                        <p>
                          <Truck size={16} />
                          Faltam R$ {(freeShippingThreshold - subtotal).toFixed(2)} para Frete Grátis
                        </p>
                      </FreeShippingProgress>
                    )}

                    <CouponSection>
                      {couponCode ? (
                        <AppliedCoupon>
                          <Tag />
                          Cupom {couponCode} aplicado
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={removeCouponCode}
                            style={{ marginLeft: 'auto', padding: '0.25rem' }}
                          >
                            <X size={14} />
                          </Button>
                        </AppliedCoupon>
                      ) : (
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <CouponInput
                            type="text"
                            placeholder="Digite seu cupom"
                            value={couponInput}
                            onChange={(e) => {
                              setCouponInput(e.target.value.toUpperCase());
                              setcouponError(null);
                            }}
                          />
                          <Button onClick={handleApplyCoupon}>
                            Aplicar
                          </Button>
                        </div>
                      )}
                      {couponError && <ErrorMessage>{couponError}</ErrorMessage>}
                    </CouponSection>

                    <ShippingCalculator onSelect={handleShippingSelect} />
                  </>
                )}
              </Content>

              <Footer>
                <CheckoutInfo>
                  <div>
                    <span>Subtotal</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div style={{ color: '#22c55e' }}>
                      <span>Desconto</span>
                      <span>-R$ {discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div>
                    <span>Frete</span>
                    <span>
                      {subtotal >= freeShippingThreshold 
                        ? 'Grátis'
                        : selectedShipping
                          ? `R$ ${selectedShipping.price.toFixed(2)}`
                          : 'Calcule acima'
                      }
                    </span>
                  </div>
                  <div>
                    <span>Total</span>
                    <span>R$ {finalPrice.toFixed(2)}</span>
                  </div>
                </CheckoutInfo>

                <Button 
                  className="w-full" 
                  disabled={items.length === 0 || (!selectedShipping && subtotal < freeShippingThreshold)}
                  onClick={() => setShowImplementationModal(true)}
                >
                  Finalizar Compra
                </Button>
              </Footer>
            </Drawer>
          </>
        )}
      </AnimatePresence>

      <Modal
        isOpen={showImplementationModal}
        onClose={() => setShowImplementationModal(false)}
        title="Em Desenvolvimento"
      >
        <ImplementationMessage>
          <Construction />
          <h3>Funcionalidade em Implementação</h3>
          <p>
            Estamos trabalhando para disponibilizar o processo de checkout em breve.
            Agradecemos sua compreensão!
          </p>
          <Button onClick={() => setShowImplementationModal(false)}>
            Entendi
          </Button>
        </ImplementationMessage>
      </Modal>
    </>
  );
};

export default CartDrawer;