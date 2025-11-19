import { useQuery } from '@tanstack/react-query';
import { generateProductsAsync } from '../../../utils/productGenerator';
import type { Product } from '../types/products';

export const useProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: () => generateProductsAsync(10000),
    staleTime: 30 * 60 * 1000, // 30 minutes - data stays fresh for 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour - cache for 1 hour
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnMount: false, // Don't refetch on component mount if data exists
    retry: 3, // Retry failed requests 3 times
  });
};
