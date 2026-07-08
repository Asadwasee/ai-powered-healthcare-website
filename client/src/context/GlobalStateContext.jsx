import { useState, useTransition } from 'react';
import GlobalStateContext from './GlobalStateContext';

export const GlobalStateProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('healthcareUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition(); // React 19 Async State Optimization

  const login = (userData) => {
    startTransition(() => {
      setUser(userData);
      localStorage.setItem('healthcareUser', JSON.stringify(userData));
    });
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    localStorage.removeItem('healthcareUser');
    localStorage.removeItem('healthcareToken');
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const clearGlobalError = () => setError(null);

  return (
    <GlobalStateContext.Provider value={{
      user, cart, error, setError, isPending, login, logout, addToCart, clearGlobalError
    }}>
      {children}
    </GlobalStateContext.Provider>
  );
};