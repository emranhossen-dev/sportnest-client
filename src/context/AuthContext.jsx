import { createContext, useState, useEffect } from 'react';
import { authClient } from '../routes/auth-client';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending) {
      if (session?.user) {
        setUser({
          email: session.user.email,
          name: session.user.name,
          image: session.user.image
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    }
  }, [session, isPending]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const logout = async () => {
    setLoading(true);
    await authClient.signOut();
    setUser(null);
    setLoading(false);
  };

  const authInfo = {
    user,
    setUser,
    loading,
    logout,
    theme,
    toggleTheme
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};