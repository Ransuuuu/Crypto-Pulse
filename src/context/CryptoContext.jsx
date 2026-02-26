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

  // fetch market data and watch for price movements
  const fetchData = async () => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&per_page=10`
      );
      const data = await res.json();

      // detect price movement
      if (crypto.length) {
        data.forEach((coin, i) => {
          if (crypto[i] && coin.current_price !== crypto[i].current_price) {
            setNotification(
              `${coin.name} price changed to ${coin.current_price}`
            );
            setTimeout(() => setNotification(null), 4000);
          }
        });
      }

      setCrypto(data);
    } catch (err) {
      console.error("fetch error", err);
    }
  };

  // keep currency in localStorage
  useEffect(() => {
    try {
      localStorage.setItem('currency', JSON.stringify(currency));
    } catch {}
  }, [currency]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, [currency]);

  return (
    <CryptoContext.Provider
      value={{ crypto, currency, setCurrency, notification }}
    >
      {children}
    </CryptoContext.Provider>
  );
}

export const useCrypto = () => useContext(CryptoContext);

