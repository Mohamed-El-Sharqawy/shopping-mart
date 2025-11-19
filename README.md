# ShopMart - React Shopping Cart Application

## 📋 Workshop Task Requirements

**React Interview Task – Shopping Cart App**  
Build a simple shopping cart application using React JS, focusing on performance, clean code, proper architecture, user experience and responsive design.

### Main Requirements ✅
- **Screen 1: Product Listing** ✅
  - Display 10,000+ products (generate fake data using libraries) ✅
  - Show products in grid or list view ✅
  - Implement pagination or infinite scrolling for performance ✅
  - Navigate to Product Details on click ✅

- **Screen 2: Product Details** ✅
  - Display detailed information: name, description, price, image, etc. ✅
  - Include button to add product to shopping cart ✅

- **Screen 3: Shopping Cart** ✅
  - Show list of products added to cart ✅
  - Ability to remove products from cart ✅
  - Display price per product (Quantity × Price) ✅

### Technical Expectations ✅
- **React JS** ✅ (React 19 with TypeScript)
- **No Redux** ✅ (Context API + useReducer used instead)
- **Mantine Library** ✅ (UI components and styling)
- **React Query (TanStack)** ✅ (Data fetching and simulated caching)
- **Well-structured, modular code** ✅ (Clean architecture with proper separation)
- **Clean and readable UI** ✅ (Mobile-first responsive design)

### Additional Implementations Beyond Requirements
This implementation goes beyond the basic requirements with advanced features including dual view modes, simulated caching, mobile-native experience, SEO optimization, PWA capabilities, and comprehensive performance optimizations.

## 🚀 Features

### 📱 Core Application Screens
1. **Product Listing** - Browse 10,000+ products with infinite scroll and dual view modes
2. **Product Details** - Detailed product information with lazy-loaded images and add to cart functionality  
3. **Shopping Cart** - Manage cart items with quantity controls, pricing, and persistent storage

### 🎯 Advanced Display Modes
- **Grid View** - Traditional card-based layout with responsive columns (1-4 based on screen size)
- **List View** - Compact horizontal layout showing more products per screen
- **View Toggle** - Seamless switching between modes on both desktop and mobile
- **Smart Persistence** - View preferences maintained during session

### ⚡ Performance & Caching
- **Intelligent Product Generation** - 10,000 realistic products created with Faker.js
- **Persistent Caching** - Products cached in localStorage for 30 minutes to eliminate regeneration delays
- **React Query Integration** - Simulated caching with 30-minute stale time and 1-hour garbage collection
- **Lazy Loading** - Pages and images load on-demand with blur hash placeholders
- **Infinite Scrolling** - Smooth loading with performance limits (1,000 products max display)
- **Optimized Rendering** - Throttled scroll events and efficient re-renders

### 📱 Native Mobile Experience
- **Mobile Checkout Button** - Fixed bottom checkout with real-time pricing and item count
- **Glass Morphism Design** - Modern blur effects and gradient backgrounds
- **Touch-Optimized** - Large touch targets and smooth animations
- **Safe Area Support** - Proper handling of devices with home indicators
- **Responsive Filters** - Mobile-optimized drawer with touch-friendly controls
- **Cart Persistence** - Shopping cart survives app refreshes and browser restarts

### 🔍 Advanced Search & Filtering
- **Real-time Search** - Debounced search across product names and descriptions
- **Category Filtering** - Dynamic category generation from product data
- **Multi-Sort Options** - Name A-Z/Z-A, Price Low/High, Highest Rated
- **Combined Filtering** - Search, category, and sort work together seamlessly

### 🛠 Technical Stack

**Frontend Framework:**
- **React 19** with TypeScript for type safety and modern features
- **Vite** for lightning-fast development and optimized builds

**UI & Styling:**
- **Mantine UI** for beautiful, accessible components with built-in dark mode
- **Tabler Icons** for consistent iconography

**State Management:**
- **React Query (TanStack)** for server state, caching, and data fetching
- **Context API + useReducer** for cart state management (no Redux needed)
- **localStorage** for persistent cart and simulated caching

**Routing & Navigation:**
- **React Router v6** for client-side routing and navigation
- **Lazy Loading** with React.Suspense for code splitting

**Data & Performance:**
- **Faker.js** for generating 10,000+ realistic products
- **Intersection Observer API** for image lazy loading
- **Custom caching utilities** for localStorage management

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smart-education
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗 Architecture & Implementation

### Project Structure
```
src/
├── components/              # Reusable UI components
│   ├── Header.tsx          # Enhanced navigation with gradient design
│   ├── ProductCard.tsx     # Grid view product cards with accessibility
│   ├── ProductListItem.tsx # List view product rows with full info
│   ├── ProductSkeleton.tsx # Loading skeletons matching final UI
│   ├── LazyImage.tsx       # Intersection Observer lazy loading with blur placeholders
│   ├── LoadingSpinner.tsx  # Multi-layered animated loading components
│   ├── LoadingFallback.tsx # Suspense fallback components for code splitting
│   ├── MobileFilters.tsx   # Touch-optimized filter drawer with native feel
│   └── MobileCheckoutButton.tsx # Fixed bottom checkout with real-time updates
├── contexts/               # React Context providers
│   └── CartContext.tsx     # Cart state with useReducer + localStorage persistence
├── hooks/                  # Custom React hooks
│   ├── useProducts.ts      # React Query hook with simulated caching
│   └── usePageMetadata.ts  # SEO metadata management hook
├── pages/                  # Main application screens
│   ├── ProductListing.tsx  # Dual-mode catalog with infinite scroll & filtering
│   ├── ProductDetails.tsx  # Dynamic product view with lazy loading
│   ├── ShoppingCart.tsx    # Cart management with persistent storage
│   └── LazyPages.tsx       # Code-split page components with Suspense
├── providers/              # Application providers
│   └── QueryProvider.tsx   # React Query configuration with optimized settings
├── routes/                 # Routing configuration
│   └── routes.tsx          # Route definitions with lazy loading and error boundaries
├── styles/                 # Custom CSS and animations
│   └── mobile-checkout.css # Mobile-specific checkout button animations
├── types/                  # TypeScript definitions
│   └── index.ts            # Product, cart, metadata, and component interfaces
├── utils/                  # Utility functions (AI-generated)
│   ├── productGenerator.ts # Faker.js-based intelligent product generation
│   ├── cacheUtils.ts       # localStorage caching with expiry management
│   └── metadataUtils.ts    # SEO and social media metadata utilities
├── public/                 # Static assets and PWA configuration
│   ├── manifest.json       # PWA manifest for native app experience
│   └── sw.js              # Service worker for caching and offline support
└── App.tsx                 # Root component with providers and global mobile checkout
```

### 🎯 Architectural Patterns & Design Decisions

**1. Component Architecture:**
```
┌─ Presentation Layer ─────────────────────────────┐
│  • ProductCard/ProductListItem (Dual Views)      │
│  • LazyImage (Intersection Observer)             │
│  • LoadingSpinner/Skeleton (Loading States)      │
│  • MobileFilters/MobileCheckoutButton (Mobile)   │
└───────────────────────────────────────────────────┘
┌─ Business Logic Layer ───────────────────────────┐
│  • useProducts (Data Fetching + Simulated Caching)│
│  • usePageMetadata (SEO Management)              │
│  • CartContext (State Management)                │
└───────────────────────────────────────────────────┘
┌─ Data Layer ─────────────────────────────────────┐
│  • React Query (Server State + Cache)            │
│  • localStorage (Persistent Storage)             │
│  • productGenerator (Fake Data Simulation)       │
└───────────────────────────────────────────────────┘
```

**2. State Management Strategy:**
- **Local Component State** - UI state (view modes, filters, loading)
- **Context API + useReducer** - Cart state with complex actions (add, remove, update quantities)
- **React Query** - Server state simulation with simulated caching and background updates
- **localStorage** - Persistent storage for cart and generated products (30min expiry)

**3. Performance Architecture:**
```
┌─ Code Splitting ─────────────────────────────────┐
│  • React.lazy() for page-level components        │
│  • Suspense boundaries with loading fallbacks    │
│  • Vite build optimization with manual chunks    │
└───────────────────────────────────────────────────┘
┌─ Caching Strategy ───────────────────────────────┐
│  • React Query: 30min stale time, 1hr cache     │
│  • localStorage: Simulated Product cache with expiry       │
│  • Service Worker: Static assets + image cache   │
└───────────────────────────────────────────────────┘
┌─ Rendering Optimization ─────────────────────────┐
│  • React.memo for ProductCard components         │
│  • Throttled scroll events (100ms)               │
│  • Intersection Observer for lazy loading        │
│  • Virtual scrolling limits (1000 products max) - (Removed) │
└───────────────────────────────────────────────────┘
```

**4. Mobile-First Architecture:**
```
┌─ Responsive Design ──────────────────────────────┐
│  Mobile (320px+)  → Base styles, touch-first     │
│  Tablet (768px+)  → Enhanced layouts             │
│  Desktop (1024px+) → Additional features         │
│  Ultra-wide (1440px+) → Optimized spacing        │
└───────────────────────────────────────────────────┘
┌─ Native App Experience ──────────────────────────┐
│  • Fixed bottom checkout with safe area support  │
│  • Glass morphism design with blur effects       │
│  • Touch-optimized interactions (44px+ targets)  │
│  • PWA manifest for native installation          │
└───────────────────────────────────────────────────┘
```

### 🎯 Key Architecture Decisions

**Performance-First Design:**
1. **Simulated Caching** - Multi-layer caching strategy with localStorage and React Query
2. **Lazy Loading** - Code splitting for pages and images with proper fallbacks
3. **Optimized Rendering** - Throttled scroll events, memoized components, and efficient re-renders
4. **Memory Management** - Automatic cleanup of observers and event listeners

**Mobile-Native Experience:**
1. **Touch-First Design** - Large touch targets and gesture-friendly interactions
2. **Native App Feel** - Fixed bottom checkout, glass morphism, and smooth animations
3. **Responsive Architecture** - Mobile-first components with desktop enhancements
4. **Safe Area Handling** - Proper support for devices with home indicators

**State Management Strategy:**
1. **No Redux** - React Context + useReducer for cart state management
2. **Server State** - React Query for product data with simulated caching
3. **Persistent Storage** - localStorage for cart and product caching
4. **Type Safety** - Full TypeScript implementation with strict types

**Component Architecture:**
1. **Dual View System** - Separate components for grid and list views
2. **Reusable Components** - Modular design with consistent interfaces
3. **Loading States** - Comprehensive loading and error handling
4. **Accessibility** - ARIA labels and keyboard navigation support

## 🗄️ Data Generation & Caching System

> **AI-Generated Utilities:** The product generation system, caching utilities, and service worker implementations were created with AI assistance to simulate realistic e-commerce data and implement complex simulated caching strategies without spending time on intricate data generation algorithms.

### Intelligent Product Generation
The application generates 10,000 realistic products using a sophisticated AI-assisted system:

**Product Creation Process:**
- **Faker.js Integration** - Generates realistic product names, descriptions, and categories
- **Dynamic Pricing** - Price ranges based on product categories with realistic variations
- **Stock Management** - Random stock levels with some out-of-stock items for realism
- **Rating System** - Weighted ratings with realistic distribution
- **Image URLs** - Placeholder images with consistent sizing and quality

**Performance Optimization:**
- **Batch Generation** - Products created in optimized batches to prevent UI blocking
- **Memory Efficient** - Large datasets handled without memory leaks
- **Consistent Data** - Same product IDs and data across sessions when cached
- **requestIdleCallback** - Non-blocking generation using browser idle time for smooth UX

### Multi-Layer Caching Strategy

**localStorage (Simulated) Caching:**
- **Product Cache** - Generated products cached for 30 minutes
- **Cart Persistence** - Shopping cart survives browser refreshes and restarts
- **Cache Validation** - Automatic expiry and cleanup of stale data
- **Error Handling** - Graceful fallback when localStorage is unavailable

**React Query Caching:**
- **Stale Time** - 30 minutes before data is considered stale
- **Garbage Collection** - 1 hour cache time for optimal memory usage
- **Background Updates** - Automatic refetching when data becomes stale
- **Query Invalidation** - Smart cache invalidation for data consistency

**Benefits:**
- **Instant Loading** - No waiting time on page refreshes
- **Offline Capability** - Cached data available without network
- **Reduced CPU Usage** - Eliminates repeated product generation
- **Better UX** - Seamless experience across sessions

## 📱 Mobile-First Design Philosophy

### Native App Experience
The application is designed to feel like a native mobile app:

**Visual Design:**
- **Glass Morphism** - Modern blur effects and translucent backgrounds
- **Gradient Backgrounds** - Beautiful color transitions throughout the UI
- **Smooth Animations** - 60fps animations with proper easing curves
- **Touch Feedback** - Visual feedback for all interactive elements

**Interaction Patterns:**
- **Fixed Bottom Checkout** - Always-accessible checkout button with real-time updates
- **Swipe-Friendly** - Touch-optimized gestures and interactions
- **Large Touch Targets** - Minimum 44px touch targets for accessibility
- **Haptic-Style Feedback** - Visual feedback that mimics haptic responses

**Performance Optimizations:**
- **Touch Event Optimization** - Passive event listeners for smooth scrolling
- **Animation Performance** - Hardware-accelerated animations using CSS transforms
- **Memory Management** - Efficient cleanup of event listeners and observers
- **Battery Optimization** - Throttled events to reduce battery drain

### Responsive Breakpoints
- **Mobile First** - Base styles optimized for mobile devices
- **Tablet Adaptation** - Enhanced layouts for tablet screens
- **Desktop Enhancement** - Additional features and larger layouts for desktop
- **Ultra-wide Support** - Optimized for large desktop displays

## 🤖 Development Approach & AI Assistance

This project demonstrates a **hybrid development approach** combining human architectural decisions with AI-assisted implementation to accelerate development while maintaining code quality.

### AI-Generated Components:
- **Vite Configuration** - Build optimization, code splitting, and PWA setup
- **Service Worker** - Simulated Caching strategies and offline functionality  
- **Product Generator** - Faker.js integration and realistic data simulation
- **Cache Utilities** - localStorage management with expiry and error handling
- **Performance Optimizations** - Throttling, lazy loading, and memory management
- **Code Comments** - Comprehensive documentation and inline explanations
- **TypeScript Interfaces** - Complete type definitions for all data structures

### Human-Driven Decisions:
- **Architecture Design** - Component structure and state management strategy
- **UX/UI Design** - Mobile-first approach and native app experience
- **Feature Requirements** - Dual view modes, infinite scroll, and cart persistence
- **Technology Stack** - React, Mantine, React Query selection
- **Performance Strategy** - Simulated Caching layers and optimization priorities

### Benefits of AI Assistance:
- **Rapid Prototyping** - Complex utilities implemented without deep research
- **Best Practices** - Industry-standard patterns and optimizations applied
- **Code Quality** - Consistent formatting, comprehensive error handling
- **Time Efficiency** - Focus on architecture rather than implementation details
- **Documentation** - Thorough comments and README generation

This approach allows developers to focus on **creative problem-solving** and **architectural decisions** while leveraging AI for **implementation details** and **boilerplate code**.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
