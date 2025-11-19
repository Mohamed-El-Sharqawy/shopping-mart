import React, { useState, useEffect } from 'react';
import { Group, Text, Button, Badge, ActionIcon, Container, Box, Flex } from '@mantine/core';
import { IconShoppingCart, IconShoppingBag } from '@tabler/icons-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../features/shared/contexts/cart-context';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getTotalItems } = useCart();
  
  // Scroll detection state
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const totalItems = getTotalItems();

  // Scroll detection effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show header when scrolling up or at top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } 
      // Hide header when scrolling down (after 100px)
      else if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    // Throttle scroll events for performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [lastScrollY]);

  return (
    <header 
      style={{
        background: 'linear-gradient(to right, #2563eb, #1d4ed8)',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 300ms ease-in-out'
      }}
    >
      <Container size="xl">
        <Flex justify="space-between" align="center" style={{ height: '80px' }}>
          {/* Logo */}
          <Group 
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/')}
            gap="xs"
          >
            <Box style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.1)', 
              padding: '8px', 
              borderRadius: '8px',
              backdropFilter: 'blur(4px)'
            }}>
              <IconShoppingBag size={28} style={{ color: 'white' }} />
            </Box>
            <Box mb={"md"}>
              <Text size="xl" fw={700} c="white" style={{ letterSpacing: '0.025em' }}>
                ShopMart
              </Text>
              <Text size="xs" c="gray.1" style={{ opacity: 0.9, marginTop: '-4px' }}>
                Your Shopping Destination
              </Text>
            </Box>
          </Group>

          {/* Navigation */}
          <Group gap="xs">
            <Button
              variant={location.pathname === '/' ? 'black' : 'subtle'}
              color={location.pathname === '/' ? 'blue' : 'white'}
              onClick={() => navigate('/')}
              style={{ fontWeight: 500 }}
              size="md"
            >
              Products
            </Button>
            
            <Box pos={"relative"}>
              <ActionIcon
                variant={location.pathname === '/cart' ? 'black' : 'subtle'}
                color={location.pathname === '/cart' ? 'blue' : 'white'}
                size="xl"
                onClick={() => navigate('/cart')}
                style={{ transition: 'transform 0.2s ease' }}
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
                  right={-10}
                  top={-10}
                >
                  {totalItems > 99 ? '99+' : totalItems}
                </Badge>
              )}
            </Box>
          </Group>
        </Flex>
      </Container>
    </header>
  );
};
