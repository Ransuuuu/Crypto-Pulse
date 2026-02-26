import { useState, useRef, useEffect } from "react";
import { useCrypto } from "../context/CryptoContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import MarketCard from "../components/MarketCard";
import AnalysisChart from "../components/AnalysisChart";
import Settings from "./Settings";

export default function Dashboard() {
  const { crypto } = useCrypto();
  const [query, setQuery] = useLocalStorage("searchQuery", "");
  const searchRef = useRef(null);

  // focus search input on mount
  useEffect(() => {
    if (searchRef.current) searchRef.current.focus();
  }, []);

  const filtered = crypto.filter((coin) =>
    coin.name.toLowerCase().includes(query.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="p-4">
        <input
          ref={searchRef}
          type="text"
          placeholder="Search coins..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 bg-gray-800 text-white rounded-lg"
        />
      </div>
      <h2 className="text-2xl text-neon text-center mb-4">Market Overview</h2>
      <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((coin) => (
          <MarketCard key={coin.id} coin={coin} />
        ))}
      </div>
      <div className="p-4 w-full">
        <AnalysisChart data={crypto} />
      </div>
      <div className="p-4 w-full">
        <Settings />
      </div>
    </div>
  );
}