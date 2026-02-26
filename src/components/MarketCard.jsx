export default function MarketCard({ coin }) {
  return (
    <div className="card flex flex-col items-center p-4 hover:scale-105 transition-transform duration-300">
      <h3 className="text-xl font-semibold text-[#00ff9f]">
        {coin.name}
      </h3>
      <span className="uppercase text-sm opacity-70">{coin.symbol}</span>
      <p className="mt-2 text-lg">${coin.current_price.toLocaleString()}</p>
      <p
        className={
          coin.price_change_percentage_24h > 0 ? "green" : "red"
        }
      >
        {coin.price_change_percentage_24h.toFixed(2)}%
      </p>
    </div>
  );
}