export default function MarketCard({ coin }) {
  return (
    <div className="card flex flex-col items-center justify-center p-6 hover:scale-105 transition-transform duration-300 min-h-[220px]">
      <h3 className="text-2xl font-bold text-[#00ff9f] mb-1">
        {coin.name}
      </h3>
      <span className="uppercase text-xs opacity-60 font-semibold tracking-widest mb-4">{coin.symbol}</span>
      <p className="text-xl font-mono mb-3">${coin.current_price.toLocaleString()}</p>
      <div className={`text-lg font-bold px-3 py-1 rounded-md ${coin.price_change_percentage_24h > 0 ? 'green bg-green-900 bg-opacity-20' : 'red bg-red-900 bg-opacity-20'}`}>
        {coin.price_change_percentage_24h > 0 ? '📈' : '📉'} {coin.price_change_percentage_24h.toFixed(2)}%
      </div>
    </div>
  );
}