'use client';

import { useEffect } from 'react';
import styled from 'styled-components';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ErrorContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: ${props => props.theme.background};
  color: ${props => props.theme.textPrimary};
`;

const ErrorContent = styled.div`
  text-align: center;
  max-width: 32rem;
`;

const ErrorIcon = styled.div`
  color: #ef4444;
  margin-bottom: 1.5rem;
  
  svg {
    width: 48px;
    height: 48px;
  }
`;

const ErrorTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${props => props.theme.textPrimary};
`;

const ErrorMessage = styled.p`
  color: ${props => props.theme.textSecondary};
  margin-bottom: 1.5rem;
`;

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Erro na aplicação:', error);
  }, [error]);

  return (
    <ErrorContainer>
      <ErrorContent>
        <ErrorIcon>
          <AlertTriangle />
        </ErrorIcon>
        <ErrorTitle>Algo deu errado!</ErrorTitle>
        <ErrorMessage>
          Ocorreu um erro ao carregar esta página. Por favor, tente novamente ou entre em contato com o suporte se o
          problema persistir.
        </ErrorMessage>
        <Button onClick={reset}>Tentar Novamente</Button>
      </ErrorContent>
    </ErrorContainer>
  );
}