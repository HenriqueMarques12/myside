'use client';

import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { X, Sparkles, ArrowRight, Tag } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '@/lib/hooks/useCart';

const BannerContainer = styled(motion.div)`
  background: #111827;
  color: white;
  position: relative;
  overflow: hidden;
  z-index: 20;
`;

const BannerContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-align: center;
  position: relative;

  @media (min-width: 640px) {
    padding: 1rem;
    gap: 1rem;
  }
`;

const BannerText = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;

  svg {
    color: #ef4444;
  }

  @media (min-width: 640px) {
    font-size: 1rem;
    gap: 0.75rem;
  }
`;

const HighlightText = styled.button`
  font-weight: 700;
  padding: 0.25rem 0.5rem;
  background: #ef4444;
  border: none;
  border-radius: 0.375rem;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  white-space: nowrap;
  box-shadow: 0 2px 4px rgba(239, 68, 68, 0.2);
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #dc2626;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  @media (min-width: 640px) {
    right: 1rem;
    width: 28px;
    height: 28px;
  }
`;

const ShineEffect = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  animation: shine 3s infinite;

  @keyframes shine {
    0% {
      transform: translateX(-100%);
    }
    50%, 100% {
      transform: translateX(100%);
    }
  }
`;

const PromotionalBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { toggleCartDrawer, applyCouponCode } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCouponClick = () => {
    applyCouponCode('PROMO20');
    toggleCartDrawer();
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <BannerContainer
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ShineEffect />
          <BannerContent>
            <BannerText>
              <Sparkles size={16} />
              Promoção Especial: Use o cupom
              <HighlightText onClick={handleCouponClick}>
                <Tag size={14} />
                PROMO20 <ArrowRight size={14} />
              </HighlightText>
              e ganhe 20% OFF em toda a loja!
            </BannerText>
            <CloseButton
              onClick={() => setIsVisible(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={14} />
            </CloseButton>
          </BannerContent>
        </BannerContainer>
      )}
    </AnimatePresence>
  );
};

export default PromotionalBanner;