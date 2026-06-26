import { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ email: "emranhossen.dev@gmail.com", name: "Emran Hossen" });

  const logout = () => {
    setUser(null);
  };

  const authInfo = {
    user,
    setUser,
    logout
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};