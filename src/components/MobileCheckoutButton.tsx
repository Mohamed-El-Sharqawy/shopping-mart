import React from 'react';
import { Button, Flex, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import '../styles/mobile-checkout.css';
import { useCart } from '../features/shared/contexts/cart-context';

export const MobileCheckoutButton: React.FC = () => {
  const navigate = useNavigate();
  const { getTotalItems, getTotalPrice } = useCart();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  // Don't show if cart is empty
  if (totalItems === 0) {
    return null;
  }

  return (
    <div className="mobile-checkout-container">
      <Button
        onClick={() => navigate('/cart')}
        className="mobil-checkout-button"
        size="lg"
        variant="subtle"
        w={"100%"}
        p={0}
      >
        <Flex 
          direction={"row"} 
          align={"center"} 
          justify={"space-between"} 
          w={"100%"}
          gap={"lg"}
          px={"md"}
        >
          {/* Left side - Item count and price */}
          <Flex direction={"row"} align={"center"} gap={"sm"}>
            <Text size="xs" c="white" bg={"black"} p={"sm"} bdrs={"100%"}>
              {totalItems}
            </Text>
            <Text size="lg" fw={700} c="white">
              ${totalPrice.toFixed(2)}
            </Text>
          </Flex>

          {/* Right side - Checkout button */}
          <Text size="sm" fw={600} c="white" bg={"black"} p={"sm"} bdrs={"md"}>
            Checkout Now
          </Text>
        </Flex>
      </Button>

      {/* Safe area for devices with home indicator */}
      <div style={{ height: 'env(safe-area-inset-bottom)', minHeight: '8px' }}></div>
    </div>
  );
};
