import { Container, Button } from '@mantine/core';
import { usePageMetadata, pageMetadata } from '../../../hooks/usePageMetadata';
import useProductDetails from '../hooks/use-product-details';
import ProductDetailsSkeleton from '../components/product-details-skeleton';
import ProductNotFound from '../components/product-not-found';
import AdditionalProductInfo from '../components/additional-product-info';
import MainProductInfo from '../components/main-product-info';

export const ProductDetails = () => {
  const { product, isLoading, handleBackToProducts } = useProductDetails();

  // Set page metadata for product details
  usePageMetadata(
    product
      ? pageMetadata.productDetails(product.name, product.description, product.price)
      : pageMetadata.notFound
  );

  if (isLoading) {
    return (
      <ProductDetailsSkeleton />
    );
  }

  if (!product) {
    return (
      <ProductNotFound />
    );
  }

  return (
    <Container size="lg" py="xl">
      <Button variant="light" mb="xl" onClick={handleBackToProducts}>
        ← Back to Products
      </Button>

      <MainProductInfo product={product} />

      {/* Additional Product Information */}
      <AdditionalProductInfo product={product} />
    </Container>
  );
};
