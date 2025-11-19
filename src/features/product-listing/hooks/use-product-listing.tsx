import { useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { useProducts } from "../../shared/hooks/useProducts";
import { useMemo, useCallback, useEffect, startTransition } from "react";
import { useMediaQuery } from "@mantine/hooks";
import type { Product } from "../../shared/types/products";

const ITEMS_PER_PAGE = 20;

export default function useProductListing() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('name');
  const [displayedItems, setDisplayedItems] = useState(ITEMS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const isMobile = useMediaQuery('(max-width: 768px)');

  const [debouncedSearchTerm] = useDebouncedValue(searchTerm, 300);

  // Fetch products using React Query
  const { data: products = [], isLoading: isInitialLoading, error } = useProducts();

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(products.map((product: Product) => product.category)));
    return uniqueCategories.map(category => ({ value: category, label: category }));
  }, [products]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    // Start with a copy of products to avoid mutating the original array
    let filtered = [...products];

    // Filter by search term
    if (debouncedSearchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products - this always applies regardless of filters
    const sorted = filtered.sort((a: Product, b: Product) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return sorted;
  }, [debouncedSearchTerm, selectedCategory, sortBy, products]);

  // Get currently displayed products
  const displayedProducts = useMemo(() => {
    return filteredAndSortedProducts.slice(0, displayedItems);
  }, [filteredAndSortedProducts, displayedItems]);

  // Load more products with throttling
  const loadMore = useCallback(() => {
    if (displayedItems >= filteredAndSortedProducts.length || isLoadingMore) return;

    // Limit maximum items to prevent performance issues
    const maxItems = Math.min(filteredAndSortedProducts.length, 1000);
    if (displayedItems >= maxItems) return;

    setIsLoadingMore(true);
    setTimeout(() => {
      setDisplayedItems(prev => Math.min(prev + ITEMS_PER_PAGE, maxItems));
      setIsLoadingMore(false);
    }, 300);
  }, [displayedItems, filteredAndSortedProducts.length, isLoadingMore]);

  // Throttled scroll handler to prevent excessive calls
  const throttledScrollHandler = useCallback(() => {
    if (isLoadingMore) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Load more when user is within 800px of bottom
    if (scrollTop + windowHeight >= documentHeight - 800) {
      loadMore();
    }
  }, [loadMore, isLoadingMore]);

  // Throttle scroll events
  useEffect(() => {
    let timeoutId: number;

    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(throttledScrollHandler, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [throttledScrollHandler]);

  useEffect(() => {
    // to prevent the UI from freezing when the user is filtering
    startTransition(() => {
      setDisplayedItems(ITEMS_PER_PAGE);
    })
  }, [debouncedSearchTerm, selectedCategory, sortBy]);

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    displayedItems,
    displayedProducts,
    filteredAndSortedProducts,
    loadMore,
    isLoadingMore,
    viewMode,
    setViewMode,
    categories,
    isInitialLoading,
    error,
    isMobile,
  };
}
