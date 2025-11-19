import { Paper, Text, Stack, Group, Divider, Button } from "@mantine/core";
import type { OrderSummaryProps } from "../types/order-summary";

export default function OrderSummary({ getTotalItems, getTotalPrice }: OrderSummaryProps) {
  return (
    <div className="lg:col-span-1">
      <Paper p="xl" withBorder className="sticky top-4">
        <Text size="lg" fw={600} mb="md">Order Summary</Text>

        <Stack gap="xs" mb="md">
          <Group justify="space-between">
            <Text size="sm">Items ({getTotalItems()})</Text>
            <Text size="sm">${getTotalPrice().toFixed(2)}</Text>
          </Group>
          <Group justify="space-between">
            <Text size="sm">Shipping</Text>
            <Text size="sm" c="green">Free</Text>
          </Group>
          <Group justify="space-between">
            <Text size="sm">Tax</Text>
            <Text size="sm">${(getTotalPrice() * 0.1).toFixed(2)}</Text>
          </Group>
        </Stack>

        <Divider mb="md" />

        <Group justify="space-between" mb="xl">
          <Text size="lg" fw={600}>Total</Text>
          <Text size="lg" fw={700} c="blue">
            ${(getTotalPrice() * 1.1).toFixed(2)}
          </Text>
        </Group>

        <Button 
          fullWidth 
          size="lg" 
          mb="md"
          aria-label="Proceed to secure checkout"
        >
          Proceed to Checkout
        </Button>

        <Text size="xs" c="gray.7" ta="center">
          Secure checkout with SSL encryption
        </Text>
      </Paper>
    </div>
  )
}
