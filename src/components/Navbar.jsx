import { useState } from "react";
import { Link } from "react-router-dom";
import { Zap, Menu } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-[#0f172a]/80 backdrop-blur z-10 px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Zap className="w-6 h-6 text-[#00ff9f] animate-pulse" />
          <span className="text-[#00ff9f] text-2xl font-bold tracking-widest">
            CRYPTO PULSE
          </span>
        </div>
        <button
          className="sm:hidden text-[#00ff9f]"
          onClick={() => setOpen((o) => !o)}
        >
          <Menu className="w-6 h-6" />
        </button>
        <div
          className={`${
            open ? "block" : "hidden"
          } sm:flex sm:items-center sm:gap-6 text-[#00ff9f]`}
        >
          <Link to="/" className="hover:underline" onClick={() => setOpen(false)}>
            Dashboard
          </Link>
          <Link to="/settings" className="hover:underline" onClick={() => setOpen(false)}>
            Settings
          </Link>
        </div>
      </div>
    </nav>
  );
}