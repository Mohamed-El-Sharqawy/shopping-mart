import React from 'react';
import { Card, Text, Badge, Button, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { LazyImage } from '../../../components/LazyImage';
import { useCart } from '../../shared/contexts/cart-context';
import type { Product } from '../../shared/types/products';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = React.memo(({ product }) => {
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
      onClick={handleProductClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.cursor = "pointer";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.cursor = "default";
      }}
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
      <Card.Section>
        <LazyImage
          src={product.image}
          height={200}
          alt={product.name}
          className="object-cover"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500} size="sm" className="truncate flex-1">
          {product.name}
        </Text>
        <Badge color="blue" variant="light" size="xs">
          {product.category}
        </Badge>
      </Group>

      <Text size="xs" c="gray.7" mb="md" className="line-clamp-2 h-8">
        {product.description}
      </Text>

      <Group justify="space-between" align="center">
        <div>
          <Text size="lg" fw={700} c="blue">
            ${product.price.toFixed(2)}
          </Text>
          <Text size="xs" c="gray.7">
            ⭐ {product.rating} • Stock: {product.stock}
          </Text>
        </div>
        <Button
          variant="light"
          color="blue"
          size="sm"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          aria-label={product.stock === 0 ? `${product.name} is out of stock` : `Add ${product.name} to cart`}
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </Group>
    </Card>
  );
});
