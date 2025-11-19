import React from 'react';
import { Card, Skeleton, Group } from '@mantine/core';

export const ProductSkeleton: React.FC = () => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="hover:shadow-lg transition-shadow duration-200">
      {/* Product Image */}
      <Card.Section>
        <Skeleton height={200} />
      </Card.Section>

      {/* Product Name and Category Badge */}
      <Group justify="space-between" mt="md" mb="xs">
        <Skeleton height={14} width="65%" />
        <Skeleton height={18} width={70} radius="xl" />
      </Group>

      {/* Product Description - 2 lines */}
      <div className="mb-3">
        <Skeleton height={10} mb={4} />
        <Skeleton height={10} width="75%" />
      </div>

      {/* Price and Rating + Add to Cart Button */}
      <Group justify="space-between" align="center">
        <div>
          {/* Price */}
          <Skeleton height={18} width={65} mb={4} />
          {/* Rating and Stock */}
          <Skeleton height={10} width={90} />
        </div>
        {/* Add to Cart Button */}
        <Skeleton height={32} width={85} radius="sm" />
      </Group>
    </Card>
  );
};

export const ProductGridSkeleton: React.FC = () => {
  return (
    <>
      {Array.from({ length: 20 }).map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </>
  );
};
