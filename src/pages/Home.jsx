import { useState, useRef, useEffect } from "react";
import { useCrypto } from "../context/CryptoContext";
import { useFetchCrypto } from "../hooks/useFetchCrypto";
import { useLocalStorage } from "../hooks/useLocalStorage";
import MarketChart from "../components/MarketChart";

export default function Home() {
  const { crypto } = useCrypto();
  const { loading, error } = useFetchCrypto();
  const [query, setQuery] = useLocalStorage("searchQuery", "");
  const searchRef = useRef(null);

  // focus search input when component mounts
  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, []);

  const filtered = crypto.filter((coin) =>
    coin.name.toLowerCase().includes(query.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(query.toLowerCase())
  );

  if (loading) return <div className="p-6">Scanning Blockchain...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Top 10 Cryptocurrencies</h2>
      <MarketChart />
      <input
        ref={searchRef}
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-4 p-2 w-full bg-gray-700 text-white rounded"
      />
      <ul className="space-y-2">
        {filtered.map((coin) => (
          <li
            key={coin.id}
            className="card flex justify-between items-center p-2"
          >
            <span>
              {coin.name} ({coin.symbol.toUpperCase()})
            </span>
            <span>${coin.current_price.toLocaleString()}</span>
            <span
              className={
                coin.price_change_percentage_24h > 0 ? "green" : "red"
              }
            >
              {coin.price_change_percentage_24h.toFixed(2)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

