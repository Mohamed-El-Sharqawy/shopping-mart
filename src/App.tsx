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
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="pb-16 md:pb-0">
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
