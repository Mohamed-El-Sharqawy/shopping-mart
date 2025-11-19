import { Grid, Group, Paper, Stack, Text } from '@mantine/core'
import type { Product } from '../../shared/types/products'

export default function AdditionalProductInfo({ product }: { product: Product }) {
  return (
    <Paper p="xl" mt="xl" withBorder>
      <Text size="lg" fw={600} mb="md">Product Details</Text>
      <Grid>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Stack gap="xs">
            <Group justify="space-between">
              <Text size="sm" c="gray.7">Category:</Text>
              <Text size="sm">{product.category}</Text>
            </Group>
            <Group justify="space-between">
              <Text size="sm" c="gray.7">Rating:</Text>
              <Text size="sm">⭐ {product.rating}/5</Text>
            </Group>
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Stack gap="xs">
            <Group justify="space-between">
              <Text size="sm" c="gray.7">Stock:</Text>
              <Text size="sm">{product.stock} available</Text>
            </Group>
            <Group justify="space-between">
              <Text size="sm" c="gray.7">Product ID:</Text>
              <Text size="sm">#{product.id}</Text>
            </Group>
          </Stack>
        </Grid.Col>
      </Grid>
    </Paper>)
}
