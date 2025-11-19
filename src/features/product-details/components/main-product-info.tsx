import { Grid, Stack, Text, Badge, Button, Group, Paper } from '@mantine/core'
import { LazyImage } from '../../../components/LazyImage'
import type { Product } from '../../shared/types/products'
import { useCart } from '../../shared/contexts/cart-context';

export default function MainProductInfo({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product);
  };

  return (
    <Grid>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <LazyImage
          src={product.image}
          alt={product.name}
          height={384}
          className="w-full rounded-md object-cover"
        />
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 6 }}>
        <Stack gap="md">
          <div>
            <Group justify="space-between" align="flex-start" mb="xs">
              <Text size="xl" fw={700} className="flex-1">
                {product.name}
              </Text>
              <Badge color="blue" variant="light" size="lg">
                {product.category}
              </Badge>
            </Group>

            <Group gap="xs" mb="md">
              <Text size="sm" c="gray.7">
                ⭐ {product.rating} rating
              </Text>
              <Text size="sm" c="gray.7">
                • {product.stock} in stock
              </Text>
            </Group>
          </div>

          <Text size="lg" className="leading-relaxed">
            {product.description}
          </Text>

          <Paper p="md" withBorder>
            <Text size="xs" c="gray.7" mb="xs">Price</Text>
            <Text size="2xl" fw={700} c="blue">
              ${product.price.toFixed(2)}
            </Text>
          </Paper>

          <Group gap="md">
            <Button
              size="lg"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1"
              aria-label={product.stock === 0 ? `${product.name} is out of stock` : `Add ${product.name} to cart`}
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </Group>

          {product.stock > 0 && product.stock <= 10 && (
            <Text size="sm" c="orange" fw={500}>
              ⚠️ Only {product.stock} left in stock!
            </Text>
          )}
        </Stack>
      </Grid.Col>
    </Grid>
  )
}
