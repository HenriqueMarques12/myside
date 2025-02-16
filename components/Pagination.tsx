'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
  padding: 0.5rem;

  @media (min-width: 640px) {
    gap: 0.5rem;
    margin-top: 2rem;
  }
`;

const PageNumber = styled(motion.button)<{ $active?: boolean }>`
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.875rem;
  background: ${props => props.$active ? props.theme.primary : props.theme.cardBackground};
  color: ${props => props.$active ? 'white' : props.theme.textPrimary};
  border: 1px solid ${props => props.$active ? props.theme.primary : props.theme.border};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.$active ? props.theme.primary : props.theme.muted};
    border-color: ${props => props.$active ? props.theme.primary : props.theme.primary};
    color: ${props => props.$active ? 'white' : props.theme.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (min-width: 640px) {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }
`;

const NavigationButton = styled(Button)`
  color: ${props => props.theme.textPrimary};
  border: 1px solid ${props => props.theme.border};
  
  &:hover:not(:disabled) {
    background: ${props => props.theme.primary};
    color: white;
    border-color: ${props => props.theme.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = window.innerWidth < 640 ? 3 : 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 2) {
        for (let i = 1; i <= 3; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 1) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <PaginationContainer>
      <NavigationButton
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{ padding: window.innerWidth < 640 ? '0.375rem' : '0.5rem' }}
      >
        <ChevronLeft size={16} />
      </NavigationButton>

      {getPageNumbers().map((page, index) => (
        <PageNumber
          key={index}
          $active={page === currentPage}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={typeof page !== 'number'}
          whileHover={{ scale: typeof page === 'number' ? 1.05 : 1 }}
          whileTap={{ scale: typeof page === 'number' ? 0.95 : 1 }}
        >
          {page}
        </PageNumber>
      ))}

      <NavigationButton
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{ padding: window.innerWidth < 640 ? '0.375rem' : '0.5rem' }}
      >
        <ChevronRight size={16} />
      </NavigationButton>
    </PaginationContainer>
  );
};

export default Pagination;