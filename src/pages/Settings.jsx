import { useCrypto } from "../context/CryptoContext";

export default function Settings() {
  const { currency, setCurrency } = useCrypto();

  return (
    <div className="card text-center">
      <h2 className="text-[#00ff9f] mb-4 text-neon">Currency Settings</h2>

      <select
        value={currency}
        onChange={(e)=>setCurrency(e.target.value)}
        className="btn w-full max-w-xs"
      >
        <option value="usd">USD</option>
        <option value="php">PHP (Peso)</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>
    </div>
  );
}