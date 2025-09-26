'use client';

import { ReactNode, useLayoutEffect, useState } from 'react';

interface OfflineBannerProps {
  children: ReactNode;
  MenuComponent: React.ReactNode;
}

export default function OfflineBanner({ children, MenuComponent }: OfflineBannerProps) {
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useLayoutEffect(() => {
    const updateNetworkStatus = () => {
      setIsOnline(navigator.onLine);
    };
    updateNetworkStatus();
    window.addEventListener('load', updateNetworkStatus);
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);

    return () => {
      window.removeEventListener('load', updateNetworkStatus);
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
    };
  }, []);

  if (!isOnline) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl">You are offline. Check your internet connection.</h1>
      </div>
    );
  }

  return (
    <div>
      {MenuComponent}
      {children}
    </div>
  );
}
