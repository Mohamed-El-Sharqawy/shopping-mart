import React from 'react';
import { Group, Text, Button, Badge, ActionIcon, Container, Box } from '@mantine/core';
import { IconShoppingCart, IconShoppingBag } from '@tabler/icons-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../features/shared/contexts/cart-context';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getTotalItems } = useCart();

  const totalItems = getTotalItems();

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg sticky top-0 z-50">
      <Container size="xl">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Group 
            className="cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate('/')}
            gap="xs"
          >
            <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
              <IconShoppingBag size={28} className="text-black" />
            </div>
            <Box mb={"md"}>
              <Text size="xl" fw={700} c="black" className="tracking-wide">
                ShopMart
              </Text>
              <Text size="xs" c="blue.8" className="opacity-90 -mt-1">
                Your Shopping Destination
              </Text>
            </Box>
          </Group>

          {/* Navigation */}
          <Group gap="lg">
            <Button
              variant={location.pathname === '/' ? 'black' : 'subtle'}
              color={location.pathname === '/' ? 'blue' : 'black'}
              onClick={() => navigate('/')}
              className="font-medium"
              size="md"
            >
              Products
            </Button>
            
            <Box pos={"relative"}>
              <ActionIcon
                variant={location.pathname === '/cart' ? 'black' : 'subtle'}
                color={location.pathname === '/cart' ? 'blue' : 'black'}
                size="xl"
                onClick={() => navigate('/cart')}
                className="hover:scale-105 transition-transform"
                aria-label='Shopping Cart'
                name='shopping-cart'
              >
                <IconShoppingCart size={24} />
              </ActionIcon>
              {totalItems > 0 && (
                <Badge
                  size="lg"
                  variant="filled"
                  color="red"
                  pos={"absolute"}
                  right={-20}
                  top={-10}
                >
                  {totalItems > 99 ? '99+' : totalItems}
                </Badge>
              )}
            </Box>
          </Group>
        </div>
      </Container>
    </header>
  );
};
