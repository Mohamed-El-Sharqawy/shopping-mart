import React from 'react';
import { Container, Center } from '@mantine/core';
import { LoadingSpinner, CenteredLoadingSpinner, InlineLoadingSpinner } from './LoadingSpinner';

interface LoadingFallbackProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const LoadingFallback: React.FC<LoadingFallbackProps> = ({ 
  message = 'Loading...', 
  size = 'md' 
}) => {
  return (
    <Container size="xl" py="xl">
      <Center style={{ minHeight: '50vh' }}>
        <LoadingSpinner size={size} message={message} />
      </Center>
    </Container>
  );
};

export const PageLoadingFallback: React.FC = () => {
  return <CenteredLoadingSpinner message="Loading page..." />;
};

export const ComponentLoadingFallback: React.FC = () => {
  return <InlineLoadingSpinner message="Loading component..." />;
};
