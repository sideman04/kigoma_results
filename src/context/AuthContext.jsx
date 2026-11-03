import { createContext, useContext, useMemo, useState } from 'react';
import { login as apiLogin } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem('kigoma_user'));
    } catch {
      return null;
    }
  });

  const value = useMemo(
    () => ({
      user,
      async signIn(username, password) {
        const u = await apiLogin(username, password);
        sessionStorage.setItem('kigoma_user', JSON.stringify(u));
        setUser(u);
        return u;
      },
      signOut() {
        sessionStorage.removeItem('kigoma_user');
        setUser(null);
      },
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
