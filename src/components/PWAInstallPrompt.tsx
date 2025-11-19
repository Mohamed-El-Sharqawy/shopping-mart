import React, { useState, useEffect } from 'react';
import { Button, Card, Text, Group, ActionIcon, Notification } from '@mantine/core';
import { IconDownload, IconX } from '@tabler/icons-react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Check if already installed
    const checkInstalled = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isInWebAppiOS = 'standalone' in window.navigator && (window.navigator as { standalone?: boolean }).standalone === true;
      setIsInstalled(isStandalone || isInWebAppiOS);
    };

    checkInstalled();

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);
      
      // Show prompt after a delay (better UX)
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    };

    // Listen for successful installation
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setShowNotification(true);
      setDeferredPrompt(null);
      
      // Hide notification after 5 seconds
      setTimeout(() => setShowNotification(false), 5000);
    };

    // Listen for service worker messages
    const handleSWMessage = (event: MessageEvent) => {
      if (event.data?.type === 'SW_ACTIVATED') {
        // Service worker activated
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    navigator.serviceWorker?.addEventListener('message', handleSWMessage);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      navigator.serviceWorker?.removeEventListener('message', handleSWMessage);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      
      setDeferredPrompt(null);
      setShowPrompt(false);
    } catch {
      // Install prompt failed silently
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Don't show again for this session
    sessionStorage.setItem('pwa-prompt-dismissed', 'true');
  };

  // Don't show if already installed or dismissed this session
  if (isInstalled || !showPrompt || sessionStorage.getItem('pwa-prompt-dismissed')) {
    return null;
  }

  return (
    <>
      {/* Install Prompt */}
      <Card
        shadow="xl"
        padding="lg"
        radius="lg"
        withBorder
        className="animate-slide-up"
        pos={"fixed"}
        bottom={16}
        right={16}
        w={320}
        style={{
          background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
          color: 'white',
          zIndex: 9999,
          border: '1px solid #334155'
        }}
      >
        <Group justify="space-between" align="flex-start" mb="md">
          <Text size="lg" fw={700} c="white">
            Install App
          </Text>
          <ActionIcon
            variant="subtle"
            c="gray.4"
            size="sm"
            onClick={handleDismiss}
            aria-label="Dismiss install prompt"
            style={{ color: '#9ca3af' }}
          >
            <IconX size={18} />
          </ActionIcon>
        </Group>

        <Text size="sm" mb="lg" c="gray.3" style={{ lineHeight: 1.5 }}>
          Install this app on your device for quick access.
        </Text>

        <Group gap="sm">
          <Button
            leftSection={<IconDownload size={16} />}
            size="md"
            radius="md"
            onClick={handleInstallClick}
            className="flex-1"
            style={{
              background: '#3b82f6',
              color: 'white',
              fontWeight: 600
            }}
          >
            Install
          </Button>
          <Button
            size="md"
            variant="subtle"
            radius="md"
            onClick={handleDismiss}
            style={{
              color: '#9ca3af',
              fontWeight: 500
            }}
          >
            Not now
          </Button>
        </Group>
      </Card>

      {/* Success Notification */}
      {showNotification && (
        <Notification
          title="🎉 App Installed!"
          color="green"
          onClose={() => setShowNotification(false)}
          className="fixed top-4 right-4 z-50"
        >
          ShopMart has been installed successfully. You can now access it from your home screen!
        </Notification>
      )}
    </>
  );
};
