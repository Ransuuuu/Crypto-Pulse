import { useCrypto } from "../context/CryptoContext";
import { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
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
  const [chartType, setChartType] = useState("line");


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
    <div className="w-full space-y-6 sm:space-y-8 md:space-y-10">
      <div className="space-y-2 sm:space-y-3">
        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-neon tracking-[0.2em] uppercase" style={{letterSpacing: '0.25em', background: 'linear-gradient(135deg, #ff4d6d 0%, #ffd700 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>ANALYSIS</h1>
        <p className="text-[#00ff9f] opacity-50 text-xs sm:text-sm md:text-base tracking-widest uppercase">Comprehensive cryptocurrency market analysis</p>
      </div>

      {/* Current Prices Table */}
      <div className="card">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="w-1 sm:w-2 h-6 sm:h-8 bg-gradient-to-b from-[#00ff9f] to-transparent flex-shrink-0"></div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-neon tracking-wider">Current Prices</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#00ff9f] border-opacity-30">
                <th className="px-2 sm:px-4 py-2 sm:py-3 font-bold text-[#00ff9f]">Coin</th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 font-bold text-[#00ff9f]">Symbol</th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 font-bold text-[#00ff9f]">Price</th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 font-bold text-[#00ff9f]">24h Change</th>
              </tr>
            </thead>
            <tbody>
              {crypto.map((coin) => (
                <tr key={coin.id} className="border-b border-[#00ff9f] border-opacity-10 hover:bg-[#00ff9f] hover:bg-opacity-5 transition-colors">
                  <td className="px-2 sm:px-4 py-2 sm:py-4 font-semibold text-xs sm:text-sm">{coin.name}</td>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 uppercase text-xs opacity-70">{coin.symbol}</td>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 font-mono text-xs sm:text-sm">${coin.current_price.toLocaleString()}</td>
                  <td className={`px-2 sm:px-4 py-2 sm:py-4 font-bold text-xs sm:text-sm ${coin.price_change_percentage_24h > 0 ? 'green' : 'red'}`}>
                    {coin.price_change_percentage_24h > 0 ? '📈' : '📉'} {coin.price_change_percentage_24h.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Chart Type Toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setChartType("line")}
          className={`px-3 py-1 rounded ${chartType === "line" ? "bg-[#00ff9f] text-black" : "bg-transparent border border-[#00ff9f]"}`}
        >
          Line Chart
        </button>
        <button
          onClick={() => setChartType("bar")}
          className={`px-3 py-1 rounded ${chartType === "bar" ? "bg-[#00ff9f] text-black" : "bg-transparent border border-[#00ff9f]"}`}
        >
          Bar Chart
        </button>
      </div>

      {/* Chart Display */}
      <div className="card">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="w-1 sm:w-2 h-6 sm:h-8 bg-gradient-to-b from-[#ff6b9d] to-transparent flex-shrink-0"></div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-neon tracking-wider">Price Trend Analysis</h2>
        </div>
        {chartType === "line" ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <XAxis dataKey="name" stroke="#00ff9f" style={{ fontSize: "0.65rem" }} />
              <YAxis stroke="#00ff9f" style={{ fontSize: "0.65rem" }} />
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
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <XAxis dataKey="name" stroke="#00ff9f" style={{ fontSize: "0.65rem" }} />
              <YAxis stroke="#00ff9f" style={{ fontSize: "0.65rem" }} />
              <Tooltip 
                contentStyle={{ backgroundColor: "#0a0e27", border: "1px solid #00ff9f", color: "#00ff9f" }}
                formatter={(value) => `$${value.toLocaleString()}`}
              />
              <Bar dataKey="price" fill="#00ff9f" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Pie Chart */}
      <div className="card">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="w-1 sm:w-2 h-6 sm:h-8 bg-gradient-to-b from-[#ffd700] to-transparent flex-shrink-0"></div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-neon tracking-wider">Top 5 Coins Distribution</h2>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={({ name, value }) => `${name}: $${value.toLocaleString()}`}
              outerRadius={90}
              fill="#00ff9f"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: "#0a0e27", border: "1px solid #00ff9f", color: "#00ff9f", fontSize: "0.75rem" }}
              formatter={(value) => `$${value.toLocaleString()}`}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
