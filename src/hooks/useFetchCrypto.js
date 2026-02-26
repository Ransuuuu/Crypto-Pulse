import { useState, useEffect } from 'react';
import { useCrypto } from '../context/CryptoContext';

export const useFetchCrypto = () => {
  const { currency, crypto, setCrypto, setNotification } = useCrypto();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchMarket = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&per_page=10`
        );
        if (!res.ok) throw new Error('API error');
        const data = await res.json();

        if (mounted) {
          // notify price movement
          if (crypto.length) {
            data.forEach((coin, i) => {
              if (
                crypto[i] &&
                coin.current_price !== crypto[i].current_price
              ) {
                setNotification(
                  `${coin.name} price changed to ${coin.current_price}`
                );
                setTimeout(() => setNotification(null), 4000);
              }
            });
          }

          setCrypto(data);
        }
      } catch (err) {
        if (mounted) setError(err.message || 'Fetch failed');
      } finally {
        // ensure loader is visible at least 500ms
        await new Promise((r) => setTimeout(r, 500));
        if (mounted) setLoading(false);
      }
    };

    fetchMarket();
    const interval = setInterval(fetchMarket, 15000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [currency]);

  return { loading, error };
};

