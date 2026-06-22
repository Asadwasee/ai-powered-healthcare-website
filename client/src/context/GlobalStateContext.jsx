import { createContext, useState, useTransition } from 'react';

export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition(); // React 19 Async State Optimization

  const login = (userData) => {
    startTransition(() => {
      setUser(userData);
    });
  };

  const logout = () => {
    setUser(null);
    setCart([]);
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