import { faker } from '@faker-js/faker';
import { getCachedProducts, setCachedProducts } from './cacheUtils';
import type { Product } from '../features/shared/types/products';

const categories = [
  'Electronics',
  'Clothing',
  'Home & Garden',
  'Sports & Outdoors',
  'Books',
  'Health & Beauty',
  'Toys & Games',
  'Automotive',
  'Food & Beverages',
  'Office Supplies'
];

const generateProduct = (id: number): Product => {
  const category = faker.helpers.arrayElement(categories);
  
  return {
    id,
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price({ min: 10, max: 1000, dec: 2 })),
    image: `https://picsum.photos/300/200?random=${id}`,
    category,
    rating: parseFloat(faker.number.float({ min: 1, max: 5, fractionDigits: 1 }).toFixed(1)),
    stock: faker.number.int({ min: 0, max: 100 })
  };
};

export const generateProducts = (count: number): Product[] => {
  return Array.from({ length: count }, (_, index) => generateProduct(index + 1));
};

// Generate products asynchronously with caching
export const generateProductsAsync = (count: number): Promise<Product[]> => {
  return new Promise((resolve) => {
    // Check cache first
    const cachedProducts = getCachedProducts();
    
    if (cachedProducts && cachedProducts.length > 0) {
      // Return cached products immediately
      resolve(cachedProducts);
      return;
    }
    
    // Generate new products if not cached
    // Use requestIdleCallback for better performance
    const generateAsync = () => {
      const products = generateProducts(count);
      setCachedProducts(products); // Cache the results
      resolve(products);
    };
    
    // Use browser idle time or fallback to timeout
    if ('requestIdleCallback' in window) {
      requestIdleCallback(generateAsync, { timeout: 1000 });
    } else {
      setTimeout(generateAsync, 500); // Reduced delay for better UX
    }
  });
};

// Lazy-load products to avoid blocking initial load
export const getProductsData = () => {
  // Check cache first for instant loading
  const cached = getCachedProducts();
  if (cached && cached.length > 0) {
    return cached;
  }
  // Generate smaller initial dataset for faster loading
  return generateProducts(5000);
};
