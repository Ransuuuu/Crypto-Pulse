import { useCrypto } from "../context/CryptoContext";

export default function Settings() {
  const { currency, setCurrency } = useCrypto();

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-neon">SETTINGS</h1>
        <p className="text-[#00ff9f] opacity-70 text-lg">Customize your crypto dashboard</p>
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold text-neon mb-6">Currency Preference</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <label className="text-lg font-semibold text-white">Select Currency:</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="btn min-w-[200px] text-center"
          >
            <option value="usd">USD (US Dollar)</option>
            <option value="php">PHP (Philippine Peso)</option>
            <option value="eur">EUR (Euro)</option>
            <option value="jpy">JPY (Japanese Yen)</option>
            <option value="gbp">GBP (British Pound)</option>
            <option value="aud">AUD (Australian Dollar)</option>
            <option value="cad">CAD (Canadian Dollar)</option>
          </select>
        </div>
        <p className="text-sm text-gray-400 mt-4">All prices will be displayed in {currency.toUpperCase()}</p>
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold text-neon mb-4">About Crypto Pulse</h2>
        <p className="text-gray-300 leading-relaxed">
          Crypto Pulse is a real-time cryptocurrency dashboard powered by CoinGecko API. 
          Track the top 10 cryptocurrencies by market cap with live price updates every 15 seconds.
        </p>
      </div>
    </div>
  );
}