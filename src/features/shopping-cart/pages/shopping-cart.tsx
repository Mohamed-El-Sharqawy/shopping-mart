import {
  Container,
  Text,
  Button,
  Group,
} from '@mantine/core';
import { usePageMetadata } from '../../../hooks/usePageMetadata';
import { pageMetadata } from '../../../hooks/usePageMetadata';
import { useNavigate } from 'react-router-dom';
import EmptyCart from '../components/empty-cart';
import { useCart } from '../../shared/contexts/cart-context';
import CartItems from '../components/cart-items';
import OrderSummary from '../components/order-summary';

export const ShoppingCart: React.FC = () => {
  const navigate = useNavigate();

  const { items, removeFromCart, updateQuantity, getTotalPrice, getTotalItems, clearCart } = useCart();

  // Set page metadata
  usePageMetadata(pageMetadata.cart);

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleQuantityChange = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, quantity);
    }
  };

  if (items.length === 0) {
    return (
      <EmptyCart handleContinueShopping={handleContinueShopping} />
    );
  }

  return (
    <Container size="lg" py="xl">
      <Group justify="space-between" mb="xl">
        <Text size="xl" fw={700}>
          Shopping Cart ({getTotalItems()} items)
        </Text>
        <Group gap="md">
          <Button variant="light" onClick={handleContinueShopping}>
            Continue Shopping
          </Button>
          <Button variant="outline" color="red" onClick={clearCart}>
            Clear Cart
          </Button>
        </Group>
      </Group>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <CartItems items={items} removeFromCart={removeFromCart} handleQuantityChange={handleQuantityChange} />

        {/* Order Summary */}
        <OrderSummary getTotalItems={getTotalItems} getTotalPrice={getTotalPrice} />
      </div>
    </Container>
  );
};
