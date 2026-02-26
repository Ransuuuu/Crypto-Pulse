import { createContext, useContext, useState, useEffect } from "react";

const CryptoContext = createContext();

export function CryptoProvider({ children }) {
  const [currency, setCurrency] = useState(() => {
    try {
      const stored = localStorage.getItem('currency');
      return stored ? JSON.parse(stored) : 'usd';
    } catch {
      return 'usd';
    }
  });
  const [crypto, setCrypto] = useState([]);
  const [notification, setNotification] = useState(null);

  // keep currency in localStorage
  useEffect(() => {
    try {
      localStorage.setItem('currency', JSON.stringify(currency));
    } catch {}
  }, [currency]);

  return (
    <CryptoContext.Provider
      value={{ crypto, setCrypto, currency, setCurrency, notification, setNotification }}
    >
      {children}
    </CryptoContext.Provider>
  );
}

export const useCrypto = () => useContext(CryptoContext);

