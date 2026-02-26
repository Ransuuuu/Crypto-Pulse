import { useCrypto } from "../context/CryptoContext";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#00ff9f", "#ff4d6d", "#ffd700", "#00d4ff", "#ff6b9d", "#c44569", "#f8b500", "#0099ff", "#00ff88", "#ff00ff"];

export default function Analysis() {
  const { crypto } = useCrypto();

  const chartData = crypto.map((coin) => ({
    name: coin.symbol.toUpperCase(),
    price: coin.current_price,
    marketCap: coin.market_cap || 0,
  }));

  const pieData = crypto.slice(0, 5).map((coin) => ({
    name: coin.name,
    value: coin.current_price,
  }));

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-neon">ANALYSIS</h1>
        <p className="text-[#00ff9f] opacity-70 text-lg">Real-time cryptocurrency market analysis</p>
      </div>

      {/* Current Prices Table */}
      <div className="card">
        <h2 className="text-2xl font-bold text-neon mb-6">Current Prices</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#00ff9f] border-opacity-30">
                <th className="px-4 py-3 font-bold text-[#00ff9f]">Coin</th>
                <th className="px-4 py-3 font-bold text-[#00ff9f]">Symbol</th>
                <th className="px-4 py-3 font-bold text-[#00ff9f]">Price</th>
                <th className="px-4 py-3 font-bold text-[#00ff9f]">24h Change</th>
              </tr>
            </thead>
            <tbody>
              {crypto.map((coin) => (
                <tr key={coin.id} className="border-b border-[#00ff9f] border-opacity-10 hover:bg-[#00ff9f] hover:bg-opacity-5 transition-colors">
                  <td className="px-4 py-4 font-semibold">{coin.name}</td>
                  <td className="px-4 py-4 uppercase text-xs opacity-70">{coin.symbol}</td>
                  <td className="px-4 py-4 font-mono">${coin.current_price.toLocaleString()}</td>
                  <td className={`px-4 py-4 font-bold ${coin.price_change_percentage_24h > 0 ? 'green' : 'red'}`}>
                    {coin.price_change_percentage_24h > 0 ? '📈' : '📉'} {coin.price_change_percentage_24h.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Line Chart */}
      <div className="card">
        <h2 className="text-2xl font-bold text-neon mb-6">Price Trend Analysis</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <XAxis dataKey="name" stroke="#00ff9f" style={{ fontSize: "0.75rem" }} />
            <YAxis stroke="#00ff9f" />
            <Tooltip 
              contentStyle={{ backgroundColor: "#0a0e27", border: "1px solid #00ff9f", color: "#00ff9f" }}
              formatter={(value) => `$${value.toLocaleString()}`}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#00ff9f"
              strokeWidth={3}
              dot={false}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="card">
        <h2 className="text-2xl font-bold text-neon mb-6">Top 5 Coins Price Distribution</h2>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={({ name, value }) => `${name}: $${value.toLocaleString()}`}
              outerRadius={120}
              fill="#00ff9f"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: "#0a0e27", border: "1px solid #00ff9f", color: "#00ff9f" }}
              formatter={(value) => `$${value.toLocaleString()}`}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
