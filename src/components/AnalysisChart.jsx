import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AnalysisChart({ data }) {
  return (
    <div className="card">
      <h2 className="text-[#00ff9f] text-center mb-4 text-xl">
        Comparative Crypto Analysis
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <XAxis dataKey="name" stroke="#00ff9f" />
          <YAxis stroke="#00ff9f" />
          <Tooltip
            contentStyle={{ backgroundColor: "#0f172a", border: "none" }}
          />
          <Line
            type="monotone"
            dataKey="current_price"
            stroke="#00ff9f"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}