'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';

const LoadingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.background};
`;

const Spinner = styled(motion.div)`
  width: 48px;
  height: 48px;
  border: 4px solid ${props => props.theme.muted};
  border-top-color: ${props => props.theme.primary};
  border-radius: 50%;
`;

export default function Loading() {
  return (
    <LoadingContainer>
      <Spinner
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </LoadingContainer>
  );
}