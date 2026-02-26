import { useCrypto } from "../context/CryptoContext";

export default function Settings() {
  const { currency, setCurrency } = useCrypto();

  return (
    <div className="card text-center">
      <h2 className="text-[#00ff9f] mb-4">Currency Settings</h2>

      <select
        value={currency}
        onChange={(e)=>setCurrency(e.target.value)}
        className="btn"
      >
        <option value="usd">USD</option>
        <option value="php">PHP (Peso)</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>
    </div>
  );
}