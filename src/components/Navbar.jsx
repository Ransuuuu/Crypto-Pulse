import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Zap, Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full bg-gradient-to-r from-[#0a0e27] via-[#0f1535] to-[#0a0e27] backdrop-blur-lg z-50 px-4 sm:px-8 py-4 border-b border-[#00ff9f] border-opacity-20 shadow-lg shadow-[#00ff9f]/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Zap className="w-8 h-8 text-[#00ff9f] animate-pulse" />
          <div className="flex gap-1">
            <span 
              className="text-2xl sm:text-3xl font-black tracking-tighter text-[#00ff9f]"
              style={{textShadow: '0 0 20px rgba(0, 255, 159, 0.8)'}}
            >
              CRYPTO
            </span>
            <span 
              className="text-2xl sm:text-3xl font-black tracking-tighter text-[#ff4d6d]"
              style={{textShadow: '0 0 15px rgba(255, 77, 109, 0.8)'}}
            >
              PULSE
            </span>
          </div>
        </Link>

        <button
          className="lg:hidden text-[#00ff9f]"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <div
          className={`${
            open ? "block absolute top-full left-0 right-0 bg-[#0a0e27] backdrop-blur-lg border-b border-[#00ff9f] border-opacity-20" : "hidden"
          } lg:flex lg:items-center lg:gap-8 py-4 lg:py-0 px-4 lg:px-0`}
        >
          <Link 
            to="/" 
            className={`block lg:inline font-bold text-lg transition-colors ${isActive('/') ? 'text-[#ff4d6d]' : 'text-[#00ff9f] hover:text-[#ff4d6d]'}`}
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>
          <Link 
            to="/analysis" 
            className={`block lg:inline font-bold text-lg transition-colors ${isActive('/analysis') ? 'text-[#ff4d6d]' : 'text-[#00ff9f] hover:text-[#ff4d6d]'}`}
            onClick={() => setOpen(false)}
          >
            Analysis
          </Link>
          <Link 
            to="/settings" 
            className={`block lg:inline font-bold text-lg transition-colors ${isActive('/settings') ? 'text-[#ff4d6d]' : 'text-[#00ff9f] hover:text-[#ff4d6d]'}`}
            onClick={() => setOpen(false)}
          >
            Settings
          </Link>
        </div>
      </div>
    </nav>
  );
}