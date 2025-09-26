'use client';

import { useEffect } from 'react';

export default function SessionProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    async function newGuestSession() {
      const res = await fetch('api/session');

      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();

      localStorage.setItem('sessionId', data.guest_session_id);
      localStorage.setItem('expiresAt', data.expires_at);
    }
    const expiresAt = localStorage.getItem('expiresAt');
    if (!localStorage.getItem('sessionId') || !expiresAt || new Date() >= new Date(expiresAt)) {
      localStorage.removeItem('sessionId');
      localStorage.removeItem('expiresAt');
      localStorage.removeItem('guest_ratings');
      newGuestSession();
    }
  }, []);

  return <>{children}</>;
}
