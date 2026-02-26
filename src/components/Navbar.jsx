import { Link } from "react-router-dom";

import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-[#0f172a]/80 backdrop-blur z-10 p-4 flex justify-center">
      <div className="flex items-center gap-4">
        <Zap className="w-6 h-6 text-[#00ff9f] animate-pulse" />
        <span className="text-[#00ff9f] text-2xl font-bold tracking-widest">
          CRYPTO PULSE
        </span>
      </div>
    </nav>
  );
}