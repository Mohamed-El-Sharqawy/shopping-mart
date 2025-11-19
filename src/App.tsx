import '@mantine/core/styles.css';
import QueryProvider from './providers/QueryProvider';

import { MantineProvider } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { MobileCheckoutButton } from './components/MobileCheckoutButton';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';
import { CartProvider } from './features/shared/contexts/cart-context';

function App() {
  return (
    <QueryProvider>
      <MantineProvider>
        <CartProvider>
          <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
            <Header />
            <main style={{ paddingBottom: '64px' }}>
              <Outlet />
            </main>
            <MobileCheckoutButton />
            <PWAInstallPrompt />
          </div>
        </CartProvider>
      </MantineProvider>
    </QueryProvider>
  );
}

export default App;
