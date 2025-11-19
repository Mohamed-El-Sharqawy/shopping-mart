import { Card, Stack, Text, Image, ActionIcon, NumberInput, Group } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import type { CartItemsProps } from "../../shared/types/cart-items";

export default function CartItems({ items, removeFromCart, handleQuantityChange }: CartItemsProps) {
  return (
    <div className="lg:col-span-2">
      <Stack gap="md">
        {items.map((item) => (
          <Card key={item.product.id} p="md" withBorder>
            <div className="flex gap-4">
              <Image
                src={item.product.image}
                alt={item.product.name}
                w={100}
                h={100}
                radius="md"
                className="object-cover flex-shrink-0"
              />

              <div className="flex-1 min-w-0">
                <Group justify="space-between" align="flex-start" mb="xs">
                  <div className="flex-1 min-w-0">
                    <Text fw={500} className="truncate">
                      {item.product.name}
                    </Text>
                    <Text size="sm" c="gray.7" className="truncate">
                      {item.product.category}
                    </Text>
                  </div>
                  <ActionIcon
                    color="red"
                    variant="light"
                    onClick={() => removeFromCart(item.product.id)}
                    aria-label={`Remove ${item.product.name} from cart`}
                    title={`Remove ${item.product.name} from cart`}
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                </Group>

                <Group justify="space-between" align="center">
                  <NumberInput
                    value={item.quantity}
                    onChange={(value) => handleQuantityChange(item.product.id, Number(value))}
                    min={1}
                    max={item.product.stock}
                    size="sm"
                    w={80}
                    aria-label={`Quantity for ${item.product.name}`}
                    label="Quantity"
                  />

                  <div className="text-right">
                    <Text size="sm" c="gray.7">
                      ${item.product.price.toFixed(2)} each
                    </Text>
                    <Text fw={600} c="blue">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </Text>
                  </div>
                </Group>
              </div>
            </div>
          </Card>
        ))}
      </Stack>
    </div>
  )
}
