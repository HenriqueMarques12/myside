'use client';

import styled from 'styled-components';
import { FileQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const NotFoundContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: ${props => props.theme.background};
  color: ${props => props.theme.textPrimary};
`;

const NotFoundContent = styled.div`
  text-align: center;
  max-width: 32rem;
`;

const NotFoundIcon = styled.div`
  color: ${props => props.theme.primary};
  margin-bottom: 1.5rem;
  
  svg {
    width: 64px;
    height: 64px;
  }
`;

const NotFoundTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${props => props.theme.textPrimary};
`;

const NotFoundMessage = styled.p`
  color: ${props => props.theme.textSecondary};
  margin-bottom: 1.5rem;
`;

export default function NotFound() {
  return (
    <NotFoundContainer>
      <NotFoundContent>
        <NotFoundIcon>
          <FileQuestion />
        </NotFoundIcon>
        <NotFoundTitle>Página não encontrada</NotFoundTitle>
        <NotFoundMessage>
          A página que você está procurando não existe ou foi removida.
        </NotFoundMessage>
        <Link href="/" passHref>
          <Button>Voltar para a Página Inicial</Button>
        </Link>
      </NotFoundContent>
    </NotFoundContainer>
  );
}