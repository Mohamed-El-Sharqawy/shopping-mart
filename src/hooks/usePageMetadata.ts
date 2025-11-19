import { useEffect } from 'react';

interface PageMetadata {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  canonical?: string;
}

export const usePageMetadata = (metadata: PageMetadata) => {
  useEffect(() => {
    // Set document title
    document.title = metadata.title;

    // Helper function to set or update meta tags
    const setMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Set basic meta tags
    setMetaTag('description', metadata.description);
    if (metadata.keywords) {
      setMetaTag('keywords', metadata.keywords);
    }

    // Set Open Graph meta tags
    setMetaTag('og:title', metadata.ogTitle || metadata.title, true);
    setMetaTag('og:description', metadata.ogDescription || metadata.description, true);
    setMetaTag('og:type', 'website', true);
    
    if (metadata.ogImage) {
      setMetaTag('og:image', metadata.ogImage, true);
    }
    
    if (metadata.ogUrl) {
      setMetaTag('og:url', metadata.ogUrl, true);
    }

    // Set Twitter Card meta tags
    setMetaTag('twitter:card', metadata.twitterCard || 'summary');
    setMetaTag('twitter:title', metadata.ogTitle || metadata.title);
    setMetaTag('twitter:description', metadata.ogDescription || metadata.description);
    
    if (metadata.ogImage) {
      setMetaTag('twitter:image', metadata.ogImage);
    }

    // Set canonical URL
    if (metadata.canonical) {
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      
      canonical.setAttribute('href', metadata.canonical);
    }

    // Set viewport meta tag for mobile optimization
    let viewport = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.setAttribute('name', 'viewport');
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
      document.head.appendChild(viewport);
    }

    // Set theme color for mobile browsers
    let themeColor = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement;
    if (!themeColor) {
      themeColor = document.createElement('meta');
      themeColor.setAttribute('name', 'theme-color');
      themeColor.setAttribute('content', '#3B82F6'); // Blue theme color
      document.head.appendChild(themeColor);
    }

  }, [metadata]);
};

// Predefined metadata for common pages
export const pageMetadata = {
  home: {
    title: 'ShopMart - Your Ultimate Shopping Destination',
    description: 'Discover 10,000+ products with advanced search, filtering, and dual view modes. Experience native mobile shopping with intelligent caching and seamless performance.',
    keywords: 'shopping, e-commerce, products, online store, mobile shopping, react shopping cart',
    ogTitle: 'ShopMart - Premium Shopping Experience',
    ogDescription: 'Browse thousands of products with advanced filtering, dual view modes, and mobile-optimized experience.',
    twitterCard: 'summary_large_image' as const,
  },
  
  productDetails: (productName: string, productDescription: string, productPrice: number) => ({
    title: `${productName} - ShopMart`,
    description: `${productDescription.substring(0, 150)}... - Only $${productPrice.toFixed(2)} at ShopMart`,
    keywords: `${productName}, product, shopping, buy online, e-commerce`,
    ogTitle: `${productName} - Premium Quality`,
    ogDescription: `Get ${productName} for just $${productPrice.toFixed(2)}. ${productDescription.substring(0, 100)}...`,
    twitterCard: 'summary_large_image' as const,
  }),
  
  cart: {
    title: 'Shopping Cart - ShopMart',
    description: 'Review your selected items, update quantities, and proceed to checkout. Secure and fast shopping experience.',
    keywords: 'shopping cart, checkout, buy products, secure shopping',
    ogTitle: 'Your Shopping Cart - ShopMart',
    ogDescription: 'Complete your purchase with our secure and user-friendly checkout process.',
    twitterCard: 'summary' as const,
  },
  
  notFound: {
    title: 'Page Not Found - ShopMart',
    description: 'The page you are looking for could not be found. Return to our homepage to continue shopping.',
    keywords: '404, page not found, error',
    ogTitle: 'Page Not Found - ShopMart',
    ogDescription: 'This page could not be found. Continue shopping on ShopMart.',
    twitterCard: 'summary' as const,
  }
};
