import type { Product } from "../features/shared/types/products";

const CACHE_KEY = 'smart-education-products';
const CACHE_EXPIRY_KEY = 'smart-education-products-expiry';
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

export const getCachedProducts = (): Product[] | null => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    const expiry = localStorage.getItem(CACHE_EXPIRY_KEY);
    
    if (!cached || !expiry) {
      return null;
    }
    
    const expiryTime = parseInt(expiry, 10);
    const now = Date.now();
    
    if (now > expiryTime) {
      // Cache expired, remove it
      localStorage.removeItem(CACHE_KEY);
      localStorage.removeItem(CACHE_EXPIRY_KEY);
      return null;
    }
    
    return JSON.parse(cached);
  } catch (error) {
    console.error('Error reading from cache:', error);
    return null;
  }
};

export const setCachedProducts = (products: Product[]): void => {
  try {
    const expiry = Date.now() + CACHE_DURATION;
    localStorage.setItem(CACHE_KEY, JSON.stringify(products));
    localStorage.setItem(CACHE_EXPIRY_KEY, expiry.toString());
  } catch (error) {
    console.error('Error writing to cache:', error);
  }
};

export const clearProductsCache = (): void => {
  try {
    localStorage.removeItem(CACHE_KEY);
    localStorage.removeItem(CACHE_EXPIRY_KEY);
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};
