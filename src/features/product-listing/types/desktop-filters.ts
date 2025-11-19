export type DesktopFiltersProps = {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (viewMode: 'grid' | 'list') => void;
  categories: { value: string; label: string }[];
}