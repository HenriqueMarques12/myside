'use client';

import { motion } from 'framer-motion';
import styled from 'styled-components';

const SkeletonCard = styled(motion.div)`
  background: ${props => props.theme.cardBackground};
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

const SkeletonContainer = styled.div`
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

const ImageSkeleton = styled.div`
  width: 100%;
  height: 200px;
  background: ${props => props.theme.muted};
  border-radius: 0.5rem;
`;

const ContentSkeleton = styled.div`
  width: 100%;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
`;

const TitleSkeleton = styled.div`
  height: 20px;
  width: 80%;
  background: ${props => props.theme.muted};
  border-radius: 0.25rem;
`;

const DescriptionSkeleton = styled.div`
  height: 32px;
  width: 90%;
  background: ${props => props.theme.muted};
  border-radius: 0.25rem;
`;

const PriceSkeleton = styled.div`
  height: 24px;
  width: 50%;
  background: ${props => props.theme.muted};
  border-radius: 0.25rem;
`;

const ButtonSkeleton = styled.div`
  height: 40px;
  width: 100%;
  background: ${props => props.theme.muted};
  border-radius: 0.25rem;
  margin-top: 0.5rem;
`;

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

const ProductSkeleton = () => {
  return (
    <SkeletonCard variants={item}>
      <SkeletonContainer>
        <ImageSkeleton />
        <ContentSkeleton>
          <TitleSkeleton />
          <DescriptionSkeleton />
          <PriceSkeleton />
          <ButtonSkeleton />
        </ContentSkeleton>
      </SkeletonContainer>
    </SkeletonCard>
  );
};

export default ProductSkeleton;
