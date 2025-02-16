'use client';

import styled from 'styled-components';
import { Search, X, Filter, Shirt, Watch, Laptop, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

const FiltersContainer = styled(motion.div)`
  margin-bottom: 1rem;
  position: relative;
  z-index: 30;
  background: ${props => props.theme.cardBackground};
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);

  @media (min-width: 640px) {
    margin-bottom: 2rem;
    border-radius: 1.5rem;
    padding: 1.5rem;
  }
`;

const SearchContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  margin: 0 auto;

  @media (min-width: 640px) {
    max-width: 800px;
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  gap: 0.5rem;
  align-items: center;

  @media (min-width: 640px) {
    gap: 1rem;
  }
`;

const SearchInputWrapper = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  background: ${props => props.theme.background};
  border-radius: 0.75rem;
  border: 2px solid transparent;
  transition: all 0.2s ease;
  
  &:focus-within {
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 4px ${props => props.theme.primary}15;
  }

  @media (min-width: 640px) {
    border-radius: 1.25rem;
  }
`;

const SearchInput = styled(motion.input)`
  width: 100%;
  padding: 0.75rem 1rem;
  padding-left: 2.75rem;
  padding-right: ${props => props.value ? '2.5rem' : '1rem'};
  font-size: 0.875rem;
  background: transparent;
  color: ${props => props.theme.textPrimary};
  border: none;
  
  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${props => props.theme.mutedForeground};
  }

  @media (min-width: 640px) {
    padding: 1.25rem 1.5rem;
    padding-left: 3.5rem;
    padding-right: ${props => props.value ? '3rem' : '1.5rem'};
    font-size: 1rem;
  }
`;

const SearchIcon = styled(motion.div)`
  position: absolute;
  left: 0.875rem;
  color: ${props => props.theme.mutedForeground};
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 640px) {
    left: 1.25rem;
  }
`;

const ClearButton = styled(motion.button)`
  position: absolute;
  right: 0.75rem;
  background: ${props => props.theme.muted};
  border: none;
  padding: 0.375rem;
  color: ${props => props.theme.mutedForeground};
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: ${props => props.theme.border};
    color: ${props => props.theme.textPrimary};
  }

  @media (min-width: 640px) {
    right: 1rem;
    padding: 0.5rem;
  }
`;

const FiltersButton = styled(Button)`
  min-width: 42px;
  height: 42px;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.background};
  color: ${props => props.theme.textPrimary};
  border: 2px solid transparent;
  padding: 0;
  position: relative;
  
  &:hover {
    background: ${props => props.theme.muted};
    border-color: ${props => props.theme.border};
  }
  
  &[data-active="true"] {
    background: ${props => props.theme.primary}10;
    border-color: ${props => props.theme.primary};
    color: ${props => props.theme.primary};
  }

  @media (min-width: 640px) {
    min-width: 54px;
    height: 54px;
    border-radius: 1.25rem;
  }
`;

const FilterBadge = styled(motion.span)`
  position: absolute;
  top: -4px;
  right: -4px;
  background: ${props => props.theme.primary};
  color: white;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
  box-shadow: 0 2px 4px ${props => props.theme.primary}40;

  @media (min-width: 640px) {
    top: -6px;
    right: -6px;
    width: 22px;
    height: 22px;
    font-size: 12px;
  }
`;

const CategoryDropdown = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 30;
  padding: 1rem;
  background: ${props => props.theme.cardBackground};
  border-radius: 1.25rem 1.25rem 0 0;
  border-top: 1px solid ${props => props.theme.border};
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
  max-height: 80vh;
  overflow-y: auto;

  @media (min-width: 640px) {
    position: absolute;
    top: calc(100% + 0.5rem);
    bottom: auto;
    border-radius: 1.25rem;
    padding: 1.5rem;
    border: 1px solid ${props => props.theme.border};
    box-shadow: 
      0 4px 6px -1px rgba(0, 0, 0, 0.05),
      0 10px 15px -3px rgba(0, 0, 0, 0.05);
  }
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }
`;

const CategoryButton = styled(motion.button)<{ $active: boolean }>`
  padding: 0.75rem;
  border-radius: 0.75rem;
  background: ${props => props.$active ? props.theme.primary : props.theme.background};
  color: ${props => props.$active ? 'white' : props.theme.textPrimary};
  border: 1px solid ${props => props.$active ? 'transparent' : props.theme.border};
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  
  &:hover {
    background: ${props => props.$active ? props.theme.primary : props.theme.muted};
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  svg {
    width: 18px;
    height: 18px;
    opacity: ${props => props.$active ? 1 : 0.7};
  }

  @media (min-width: 640px) {
    padding: 1rem;
    gap: 0.75rem;
    font-size: 1rem;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(2px);
  z-index: 25;
`;

interface SearchFiltersProps {
  categories: string[];
  filters: {
    searchQuery: string;
    category: string;
  };
  onFilterChange: (filters: any) => void;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "men's clothing":
    case "women's clothing":
      return <Shirt />;
    case "jewelery":
      return <Watch />;
    case "electronics":
      return <Laptop />;
    default:
      return <ShoppingBag />;
  }
};

const translateCategory = (category: string) => {
  const translations: { [key: string]: string } = {
    "men's clothing": "Roupas Masculinas",
    "women's clothing": "Roupas Femininas",
    "jewelery": "Joias",
    "electronics": "Eletrônicos",
    "all": "Todas as Categorias"
  };
  return translations[category] || category;
};

const SearchFilters = ({ categories, filters, onFilterChange }: SearchFiltersProps) => {
  const [searchValue, setSearchValue] = useState(filters.searchQuery);
  const [showCategories, setShowCategories] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout>();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowCategories(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setSearchValue(filters.searchQuery);
  }, [filters.searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      onFilterChange({ searchQuery: value });
    }, 300);
  };

  const clearSearch = () => {
    setSearchValue('');
    onFilterChange({ searchQuery: '' });
  };

  const toggleCategory = (category: string) => {
    onFilterChange({ 
      category: filters.category === category ? 'all' : category 
    });
    setShowCategories(false);
  };

  if (!mounted) {
    return null;
  }

  return (
    <FiltersContainer ref={containerRef}>
      <SearchContainer>
        <SearchWrapper>
          <SearchInputWrapper>
            <SearchIcon>
              <Search size={20} />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Buscar produtos..."
              value={searchValue}
              onChange={handleSearchChange}
              whileFocus={{ scale: 1.002 }}
              transition={{ duration: 0.2 }}
            />
            <AnimatePresence>
              {searchValue && (
                <ClearButton
                  as={motion.button}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={clearSearch}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={14} />
                </ClearButton>
              )}
            </AnimatePresence>
          </SearchInputWrapper>
          <FiltersButton
            onClick={() => setShowCategories(!showCategories)}
            variant="outline"
            as={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-active={showCategories || filters.category !== 'all'}
          >
            <Filter size={20} />
            {filters.category !== 'all' && (
              <FilterBadge
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                1
              </FilterBadge>
            )}
          </FiltersButton>
        </SearchWrapper>

        <AnimatePresence>
          {showCategories && (
            <>
              <Overlay
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowCategories(false)}
              />
              <CategoryDropdown
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
              >
                <CategoryGrid>
                  {categories.map((category) => (
                    <CategoryButton
                      key={category}
                      $active={filters.category === category}
                      onClick={() => toggleCategory(category)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {getCategoryIcon(category)}
                      {translateCategory(category)}
                    </CategoryButton>
                  ))}
                </CategoryGrid>
              </CategoryDropdown>
            </>
          )}
        </AnimatePresence>
      </SearchContainer>
    </FiltersContainer>
  );
};

export default SearchFilters;