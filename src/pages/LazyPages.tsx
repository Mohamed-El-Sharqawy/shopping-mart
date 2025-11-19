import { lazy } from 'react';

// Lazy load all page components
export const LazyProductListing = lazy(() => 
  import('../features/product-listing/pages/product-listing').then(module => ({ default: module.ProductListing }))
);

export const LazyProductDetails = lazy(() => 
  import('../features/product-details/pages/product-details').then(module => ({ default: module.ProductDetails }))
);

export const LazyShoppingCart = lazy(() => 
  import('../features/shopping-cart/pages/shopping-cart').then(module => ({ default: module.ShoppingCart }))
);
