import React from 'react';
import { Card, Text, Button, Group, Badge, Flex, Box } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { LazyImage } from '../../../components/LazyImage';
import { useCart } from '../../shared/contexts/cart-context';
import type { Product } from '../../shared/types/products';

interface ProductListItemProps {
  product: Product;
}

export const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Card 
      shadow="sm" 
      padding="lg" 
      radius="md" 
      withBorder
      className="hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={handleProductClick}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${product.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleProductClick();
        }
      }}
    >
      <Flex gap="lg" align="flex-start">
        {/* Product Image */}
        <Box style={{ minWidth: '120px', width: '120px', height: '120px' }}>
          <LazyImage
            src={product.image}
            alt={product.name}
            height={120}
            className="object-cover rounded-lg"
          />
        </Box>

        {/* Product Details */}
        <Flex direction="column" style={{ flex: 1 }} gap="xs">
          <Group justify="space-between" align="flex-start">
            <Box style={{ flex: 1 }}>
              <Text fw={600} size="lg" lineClamp={2}>
                {product.name}
              </Text>
              <Badge color="blue" variant="light" size="sm" mt="xs">
                {product.category}
              </Badge>
            </Box>
            
            <Box ta="right">
              <Text size="xl" fw={700} c="blue">
                ${product.price.toFixed(2)}
              </Text>
            </Box>
          </Group>

          <Text size="sm" c="gray.7" lineClamp={2} mt="xs">
            {product.description}
          </Text>

          <Group justify="space-between" align="center" mt="md">
            <Group gap="xs">
              <Text size="sm" c="gray.7">
                ⭐ {product.rating}
              </Text>
              <Text size="sm" c="gray.7">
                •
              </Text>
              <Text size="sm" c={product.stock > 0 ? 'green' : 'red'}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </Text>
            </Group>

            <Button
              variant="light"
              color="blue"
              size="sm"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              aria-label={product.stock === 0 ? `${product.name} is out of stock` : `Add ${product.name} to cart`}
            >
              Add to Cart
            </Button>
          </Group>
        </Flex>
      </Flex>
    </Card>
  );
};
