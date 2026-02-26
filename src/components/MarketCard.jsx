export default function MarketCard({ coin }) {
  return (
    <div className="card flex flex-col items-center justify-center p-2 sm:p-3 hover:scale-110 transition-transform duration-300 w-full max-w-[240px] aspect-square">
      {/* coin icon */}
      {coin.image && (
        <img
          src={coin.image}
          alt={coin.name}
          className="w-10 h-10 mb-1 object-contain"
        />
      )}
      <h3 className="text-xs sm:text-sm font-bold text-[#00ff9f] mb-1 text-center line-clamp-2">
        {coin.name}
      </h3>
      <span className="uppercase text-xs opacity-60 font-semibold tracking-widest mb-1 sm:mb-2">{coin.symbol}</span>
      <p className="text-sm sm:text-base font-mono mb-1 sm:mb-2">${coin.current_price.toLocaleString()}</p>
      <div className={`text-sm sm:text-base font-bold px-2 sm:px-3 py-1 rounded-md ${coin.price_change_percentage_24h > 0 ? 'green bg-green-900 bg-opacity-20' : 'red bg-red-900 bg-opacity-20'}`}>
        {coin.price_change_percentage_24h > 0 ? '📈' : '📉'} {coin.price_change_percentage_24h.toFixed(2)}%
      </div>
    </div>
  );
}