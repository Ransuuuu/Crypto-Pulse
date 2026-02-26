import { useState, useRef, useEffect } from "react";
import { useCrypto } from "../context/CryptoContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Search } from "lucide-react";
import MarketCard from "../components/MarketCard";

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
    <div className="w-full max-w-7xl mx-auto space-y-12">
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-neon">DASHBOARD</h1>
        <p className="text-[#00ff9f] opacity-70 text-lg">Monitor real-time crypto market data</p>
      </div>

      {/* Search Assets Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-3xl font-bold text-neon">Search Assets</h2>
          <div className="h-1 w-40 bg-gradient-to-r from-[#00ff9f] to-transparent mt-2"></div>
        </div>
        <div className="relative w-full max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#00ff9f] opacity-70" />
            <input
              ref={searchRef}
              type="text"
              placeholder="Find your coin..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-14 pr-4 py-4 bg-gradient-to-r from-[#0a0e27] to-[#1a1f35] text-white text-lg rounded-lg border-2 border-[#00ff9f] border-opacity-30 focus:border-opacity-100 focus:outline-none focus:ring-2 focus:ring-[#00ff9f] focus:ring-opacity-50 transition-all duration-300 placeholder-gray-500 font-semibold"
            />
          </div>
          {query && (
            <div className="mt-3 text-sm text-[#00ff9f] opacity-70">
              Found {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>

      {/* Market Overview Section */}
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-neon">Market Overview</h2>
          <div className="h-1 w-40 bg-gradient-to-r from-[#ff4d6d] to-transparent mt-2"></div>
        </div>
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.length > 0 ? (
            filtered.map((coin) => (
              <MarketCard key={coin.id} coin={coin} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400 py-12">
              <p className="text-xl">No coins found. Try a different search.</p>
            </div>
          )}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Total Assets Tracked</p>
          <p className="text-4xl font-black text-[#00ff9f]">{crypto.length}</p>
        </div>
        <div className="card">
          <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Gainers (24h)</p>
          <p className="text-4xl font-black green">{crypto.filter(c => c.price_change_percentage_24h > 0).length}</p>
        </div>
        <div className="card">
          <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Losers (24h)</p>
          <p className="text-4xl font-black red">{crypto.filter(c => c.price_change_percentage_24h < 0).length}</p>
        </div>
      </div>
    </div>
  );
}