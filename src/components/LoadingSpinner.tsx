import React from 'react';
import { Center, Text, Stack } from '@mantine/core';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  message?: string;
  fullScreen?: boolean;
  color?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  message = 'Loading...',
  fullScreen = false,
  color = 'blue'
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  const containerClasses = fullScreen 
    ? 'fixed inset-0 bg-white/80 backdrop-blur-sm z-50' 
    : 'w-full py-12';

  return (
    <div className={containerClasses}>
      <Center className="h-full">
        <Stack align="center" gap="lg">
          {/* Custom Spinner */}
          <div className="relative">
            {/* Outer ring */}
            <div className={`${sizeClasses[size]} rounded-full border-4 border-gray-200`}></div>
            
            {/* Spinning ring */}
            <div 
              className={`${sizeClasses[size]} rounded-full border-4 border-transparent border-t-${color}-500 border-r-${color}-500 animate-spin absolute top-0 left-0`}
              style={{
                animation: 'spin 1s linear infinite'
              }}
            ></div>
            
            {/* Inner pulsing dot */}
            <div 
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-${color}-500 rounded-full animate-pulse`}
            ></div>
          </div>

          {/* Loading text */}
          <div className="text-center">
            <Text 
              size={size === 'xl' ? 'lg' : size === 'lg' ? 'md' : 'sm'} 
              c="dimmed" 
              fw={500}
              className="animate-pulse"
            >
              {message}
            </Text>
            
            {/* Animated dots */}
            <div className="flex justify-center mt-2 space-x-1">
              <div className={`w-1.5 h-1.5 bg-${color}-400 rounded-full animate-bounce`} style={{ animationDelay: '0ms' }}></div>
              <div className={`w-1.5 h-1.5 bg-${color}-400 rounded-full animate-bounce`} style={{ animationDelay: '150ms' }}></div>
              <div className={`w-1.5 h-1.5 bg-${color}-400 rounded-full animate-bounce`} style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </Stack>
      </Center>
    </div>
  );
};

// Centered page loading spinner
export const CenteredLoadingSpinner: React.FC<{ message?: string }> = ({ 
  message = 'Loading page...' 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full mx-4">
        <LoadingSpinner size="lg" message={message} color="blue" />
      </div>
    </div>
  );
};

// Inline loading spinner for components
export const InlineLoadingSpinner: React.FC<{ message?: string }> = ({ 
  message = 'Loading...' 
}) => {
  return (
    <div className="flex items-center justify-center py-8">
      <LoadingSpinner size="md" message={message} color="blue" />
    </div>
  );
};
