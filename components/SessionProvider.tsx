'use client';

import { useEffect, useState, createContext, useContext } from 'react';

type SessionContextType = { sessionId: string | null };
const SessionContext = createContext<SessionContextType>({ sessionId: null });
export const useSession = () => useContext(SessionContext);

export default function SessionProvider({ children }: { children: React.ReactNode }) {
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    async function newGuestSession() {
      const res = await fetch('api/session');

      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();

      localStorage.setItem('sessionId', data.guest_session_id);
      localStorage.setItem('expiresAt', data.expires_at);
      setSessionId(data.guest_session_id);
    }
    const expiresAt = localStorage.getItem('expiresAt');
    if (!localStorage.getItem('sessionId') || !expiresAt || new Date() >= new Date(expiresAt)) {
      localStorage.removeItem('sessionId');
      localStorage.removeItem('expiresAt');
      localStorage.removeItem('guest_ratings');
      newGuestSession();
    } else {
      setSessionId(localStorage.getItem('sessionId'));
    }
  }, []);

  return <SessionContext.Provider value={{ sessionId }}>{children}</SessionContext.Provider>;
}
