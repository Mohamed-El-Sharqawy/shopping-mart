export type MobileFiltersProps = {
  categories: { value: string; label: string }[];
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
}