import { Container, Grid, Text, Center, Flex } from '@mantine/core';
import { ProductCard } from '../components/product-card';
import { ProductListItem } from '../components/product-list-item';
import { CenteredLoadingSpinner } from '../../../components/LoadingSpinner';
import { pageMetadata, usePageMetadata } from '../../../hooks/usePageMetadata';
import useProductListing from '../hooks/use-product-listing';
import ProductListingError from '../components/error';
import ProductListingSkeleton from '../components/skeleton';
import DesktopFilters from '../components/desktop-filters';
import MobileFilters from '../components/mobile-filters';

export const ProductListing: React.FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    displayedProducts,
    filteredAndSortedProducts,
    displayedItems,
    isLoadingMore,
    viewMode,
    setViewMode,
    categories,
    isInitialLoading,
    error,
    isMobile,
  } = useProductListing();

  // Set page metadata
  usePageMetadata(pageMetadata.home);

  if (error) {
    return (
      <ProductListingError error={error} />
    );
  }

  // Show loading skeleton while products are being generated
  if (isInitialLoading) {
    return (
      <ProductListingSkeleton />
    );
  }

  return (
    <Container size="xl" py="xl">
      <Text size="xl" fw={700} mb="xl" ta="center">
        Product Catalog ({filteredAndSortedProducts.length.toLocaleString()} products)
      </Text>

      {/* Filters */}
      {isMobile ? (
        <MobileFilters
          categories={categories}
          selectedCategory={selectedCategory}
          sortBy={sortBy}
          viewMode={viewMode}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setSelectedCategory={setSelectedCategory}
          setSortBy={setSortBy}
          setViewMode={setViewMode}
        />
      ) : (
        <DesktopFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          categories={categories}
        />
      )}

      {/* Products Display */}
      {viewMode === 'grid' ? (
        <Grid>
          {displayedProducts.map((product) => (
            <Grid.Col key={product.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }} className='hover:cursor-pointer'>
              <ProductCard product={product} />
            </Grid.Col>
          ))}
        </Grid>
      ) : (
        <Flex direction="column" gap="md">
          {displayedProducts.map((product) => (
            <ProductListItem key={product.id} product={product} />
          ))}
        </Flex>
      )}

      {/* Loading indicator */}
      {isLoadingMore && (
        <div className="mt-8">
          <CenteredLoadingSpinner message="Loading more products..." />
        </div>
      )}

      {/* Load more indicator */}
      {!isLoadingMore && displayedItems < filteredAndSortedProducts.length && displayedItems < 1000 && (
        <Center mt="xl">
          <Text size="sm" c="gray.7">
            Scroll down to load more products...
          </Text>
        </Center>
      )}

      {/* Performance limit reached - disabled for now */}
      {/* {displayedItems >= 1000 && filteredAndSortedProducts.length > 1000 && (
        <Center mt="xl">
          <Text size="sm" c="orange">
            Showing first 1,000 products for optimal performance. Use filters to narrow your search.
          </Text>
        </Center>
      )} */}

      {/* No more products */}
      {displayedItems >= filteredAndSortedProducts.length && filteredAndSortedProducts.length > 0 && (
        <Center mt="xl">
          <Text size="sm" c="gray.7">
            You've reached the end of the catalog
          </Text>
        </Center>
      )}

      {/* No results */}
      {filteredAndSortedProducts.length === 0 && (
        <Center mt="xl">
          <Text size="lg" c="gray.7">
            No products found matching your criteria
          </Text>
        </Center>
      )}
    </Container>
  );
};
