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
    <div className="w-full space-y-6 sm:space-y-8 md:space-y-10">
      {/* Page Header */}
      <div className="space-y-2 sm:space-y-3">
        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-neon tracking-[0.2em] uppercase" style={{letterSpacing: '0.25em', background: 'linear-gradient(135deg, #00ff9f 0%, #ff4d6d 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>DASHBOARD</h1>
        <p className="text-[#00ff9f] opacity-50 text-xs sm:text-sm md:text-base tracking-widest uppercase">Real-time cryptocurrency market insights</p>
      </div>

      {/* Search Section - Prominent & Balanced */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <Search className="w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7 text-[#00ff9f] flex-shrink-0" />
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-neon tracking-wider">Search Assets</h2>
        </div>
        <div className="relative w-full">
          <div className="relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-[#00ff9f] opacity-60 flex-shrink-0" />
            <input
              ref={searchRef}
              type="text"
              placeholder="Find your coin..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 bg-gradient-to-r from-[#0a0e27] to-[#1a1f35] text-white text-sm sm:text-base rounded-lg border-2 border-[#00ff9f] border-opacity-30 focus:border-opacity-100 focus:outline-none focus:ring-2 focus:ring-[#00ff9f] focus:ring-opacity-50 transition-all duration-300 placeholder-gray-500 font-medium"
            />
          </div>
          {query && (
            <div className="mt-2 text-xs text-[#00ff9f] opacity-70">
              Found {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>

      {/* Market Overview Section */}
      <div className="space-y-4 sm:space-y-5">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-1 sm:w-2 h-6 sm:h-8 bg-gradient-to-b from-[#ff4d6d] to-transparent flex-shrink-0"></div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-neon tracking-wider">Market Overview</h2>
        </div>
        <div className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1 sm:gap-2 md:gap-3">
          {filtered.length > 0 ? (
            filtered.map((coin) => (
              <MarketCard key={coin.id} coin={coin} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400 py-8 sm:py-12">
              <p className="text-base sm:text-lg md:text-xl">No coins found. Try a different search.</p>
            </div>
          )}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5 py-2 sm:py-4">
        <div className="card">
          <p className="text-gray-400 text-xs sm:text-sm uppercase tracking-wider mb-2">Total Assets Tracked</p>
          <p className="text-2xl sm:text-3xl md:text-4xl font-black text-[#00ff9f]">{crypto.length}</p>
        </div>
        <div className="card">
          <p className="text-gray-400 text-xs sm:text-sm uppercase tracking-wider mb-2">Gainers (24h)</p>
          <p className="text-2xl sm:text-3xl md:text-4xl font-black green">{crypto.filter(c => c.price_change_percentage_24h > 0).length}</p>
        </div>
        <div className="card">
          <p className="text-gray-400 text-xs sm:text-sm uppercase tracking-wider mb-2">Losers (24h)</p>
          <p className="text-2xl sm:text-3xl md:text-4xl font-black red">{crypto.filter(c => c.price_change_percentage_24h < 0).length}</p>
        </div>
      </div>
    </div>
  );
}