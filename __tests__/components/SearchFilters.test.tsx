import { render, screen, fireEvent } from '@testing-library/react';
import SearchFilters from '@/components/SearchFilters';

const mockCategories = ['electronics', "men's clothing"];
const mockFilters = {
  searchQuery: '',
  category: 'all',
};
const mockOnFilterChange = jest.fn();

describe('SearchFilters', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders search input and filter button', () => {
    render(
      <SearchFilters
        categories={mockCategories}
        filters={mockFilters}
        onFilterChange={mockOnFilterChange}
      />
    );
  });

  it('should call onFilterChange when search input changes', async () => {
    render(
      <SearchFilters
        categories={mockCategories}
        filters={mockFilters}
        onFilterChange={mockOnFilterChange}
      />
    );

    const searchInput = screen.getByPlaceholderText('Buscar produtos...');
    fireEvent.change(searchInput, { target: { value: 'test' } });

    await new Promise((resolve) => setTimeout(resolve, 400));
    expect(mockOnFilterChange).toHaveBeenCalledWith({ searchQuery: 'test' });
  });

  it('should show categories when filter button is clicked', () => {
    render(
      <SearchFilters
        categories={mockCategories}
        filters={mockFilters}
        onFilterChange={mockOnFilterChange}
      />
    );

    const filterButton = screen.getByRole('button');
    fireEvent.click(filterButton);
  
  });

  it('should call onFilterChange when category is selected', () => {
    render(
      <SearchFilters
        categories={mockCategories}
        filters={mockFilters}
        onFilterChange={mockOnFilterChange}
      />
    );

    const filterButton = screen.getByRole('button');
    fireEvent.click(filterButton);

    const electronicsButton = screen.getByText('Eletrônicos');
    fireEvent.click(electronicsButton);

    expect(mockOnFilterChange).toHaveBeenCalledWith({ category: 'electronics' });
  });
});