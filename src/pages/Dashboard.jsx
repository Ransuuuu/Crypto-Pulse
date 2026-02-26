import { useState, useRef, useEffect } from "react";
import { useCrypto } from "../context/CryptoContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Search } from "lucide-react";
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
    <div className="w-full max-w-4xl mx-auto space-y-12">
      <div className="space-y-4">
        <h2 className="text-center text-neon text-3xl">Search Assets</h2>
        <div className="relative w-full max-w-lg mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#00ff9f] opacity-70" />
            <input
              ref={searchRef}
              type="text"
              placeholder="Find your coin..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gradient-to-r from-[#0a0e27] to-[#1a1f35] text-white rounded-lg border border-[#00ff9f] border-opacity-30 focus:border-opacity-100 focus:outline-none focus:ring-2 focus:ring-[#00ff9f] focus:ring-opacity-50 transition-all duration-300 placeholder-gray-500 text-lg"
            />
          </div>
          {query && (
            <div className="mt-2 text-center text-sm text-[#00ff9f] opacity-70">
              Found {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-center text-neon text-3xl mb-8">Market Overview</h2>
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length > 0 ? (
            filtered.map((coin) => (
              <MarketCard key={coin.id} coin={coin} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400 py-8">
              No coins found. Try a different search.
            </div>
          )}
        </div>
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