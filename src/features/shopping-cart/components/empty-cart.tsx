import { Container, Stack, Text, Button } from "@mantine/core";

export default function EmptyCart({handleContinueShopping}: {handleContinueShopping: () => void}) {
  return (
    <Container size="md" py="xl">
      <Stack align="center" gap="xl">
        <Text size="xl" fw={600}>Your cart is empty</Text>
        <Text c="gray.7" ta="center">
          Looks like you haven't added any products to your cart yet.
        </Text>
        <Button 
          size="lg" 
          onClick={handleContinueShopping}
          aria-label="Continue shopping to add products to cart"
        >
          Continue Shopping
        </Button>
      </Stack>
    </Container>)
}
