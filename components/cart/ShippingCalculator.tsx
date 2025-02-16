'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ShippingService } from '@/lib/services/api/ShippingService';
import type { ShippingOption } from '@/lib/types/Shipping';

const Container = styled.div`
  margin: 1rem 0;
`;

const ZipCodeInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.border};
  border-radius: 0.5rem;
  background: ${props => props.theme.background};
  color: ${props => props.theme.textPrimary};
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.primary}20;
  }

  &::placeholder {
    color: ${props => props.theme.mutedForeground};
  }
`;

const ShippingOptions = styled(motion.div)`
  margin-top: 1rem;
`;

const ShippingOption = styled.label`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid ${props => props.theme.border};
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.theme.background};
  
  &:hover {
    border-color: ${props => props.theme.primary};
    background: ${props => props.theme.muted};
  }
`;

const OptionInfo = styled.div`
  flex: 1;
  
  h4 {
    font-weight: 500;
    color: ${props => props.theme.textPrimary};
    margin-bottom: 0.25rem;
  }
  
  p {
    font-size: 0.875rem;
    color: ${props => props.theme.textSecondary};
  }
`;

const OptionPrice = styled.div`
  font-weight: 600;
  color: ${props => props.theme.textPrimary};
`;

const ErrorMessage = styled.p`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const LoadingSpinner = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  color: ${props => props.theme.textSecondary};
`;

interface ShippingCalculatorProps {
  onSelect: (option: ShippingOption) => void;
}

const shippingService = new ShippingService();

const ShippingCalculator = ({ onSelect }: ShippingCalculatorProps) => {
  const [zipCode, setZipCode] = useState('');
  const [options, setOptions] = useState<ShippingOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 8) {
      setZipCode(value);
      setError(null);
    }
  };

  const calculateShipping = async () => {
    const formattedZipCode = shippingService.formatZipCode(zipCode);
    
    if (!shippingService.validateZipCode(formattedZipCode)) {
      setError('CEP inválido');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const shippingOptions = await shippingService.calculateShipping(formattedZipCode);
      setOptions(shippingOptions);
    } catch (err) {
      setError('Erro ao calcular o frete. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionSelect = (option: ShippingOption) => {
    setSelectedOption(option.id);
    onSelect(option);
  };

  return (
    <Container>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <ZipCodeInput
          type="text"
          placeholder="Digite seu CEP"
          value={zipCode.replace(/(\d{5})(\d{3})/, '$1-$2')}
          onChange={handleZipCodeChange}
          maxLength={9}
        />
        <Button
          onClick={calculateShipping}
          disabled={isLoading || zipCode.length !== 8}
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={16} />
          ) : (
            <Truck size={16} />
          )}
        </Button>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <AnimatePresence>
        {isLoading && (
          <LoadingSpinner
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Loader2 className="animate-spin" size={24} />
          </LoadingSpinner>
        )}

        {!isLoading && options.length > 0 && (
          <ShippingOptions
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {options.map((option) => (
              <ShippingOption key={option.id}>
                <input
                  type="radio"
                  name="shipping"
                  checked={selectedOption === option.id}
                  onChange={() => handleOptionSelect(option)}
                />
                <OptionInfo>
                  <h4>{option.name}</h4>
                  <p>{option.deliveryTime}</p>
                </OptionInfo>
                <OptionPrice>
                  R$ {option.price.toFixed(2)}
                </OptionPrice>
              </ShippingOption>
            ))}
          </ShippingOptions>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default ShippingCalculator;