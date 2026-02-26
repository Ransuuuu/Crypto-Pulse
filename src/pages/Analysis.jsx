import { useCrypto } from "../context/CryptoContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function Analysis() {

  const { crypto } = useCrypto();

  return (
    <div className="card">
      <h2 className="text-[#00ff9f] text-center mb-4">
        Crypto Comparative Analysis
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={crypto}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="current_price"
            stroke="#00ff9f"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
