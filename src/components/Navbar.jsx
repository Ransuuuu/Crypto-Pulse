import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-[#0f172a]/80 backdrop-blur z-10 p-4 flex justify-between items-center">
      <span className="text-[#00ff9f] text-2xl font-bold">⚡ CRYPTO PULSE</span>
      <div className="flex gap-6">
        <Link to="/" className="text-[#00ff9f] hover:underline">
          Market
        </Link>
        <Link to="/analysis" className="text-[#00ff9f] hover:underline">
          Analysis
        </Link>
        <Link to="/settings" className="text-[#00ff9f] hover:underline">
          Settings
        </Link>
      </div>
    </nav>
  );
}