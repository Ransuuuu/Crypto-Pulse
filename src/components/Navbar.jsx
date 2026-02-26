import { Link, useLocation } from "react-router-dom";
import { Zap, LayoutDashboard, TrendingUp, Settings as SettingsIcon } from "lucide-react";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#0a0e27] via-[#0f1535] to-[#0a0e27] backdrop-blur-lg z-50 px-3 sm:px-6 py-3 sm:py-4 border-b border-[#00ff9f] border-opacity-20 shadow-lg shadow-[#00ff9f]/10">
      <div className="max-w-full flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 sm:gap-2 hover:opacity-90 transition-opacity flex-shrink-0 group">
          <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-[#00ff9f] group-hover:scale-110 transition-transform duration-300" />
          <div 
            className="hidden sm:block text-sm sm:text-lg font-black tracking-[0.08em] py-1 px-2 rounded-md border border-[#00ff9f] border-opacity-40 group-hover:border-opacity-100 group-hover:shadow-lg group-hover:shadow-[#00ff9f]/50 transition-all duration-300"
          >
            <span style={{
              background: 'linear-gradient(90deg, #00ff9f 0%, #ff4d6d 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: 'none',
            }}>
              CRYPTOPULSE
            </span>
          </div>
        </Link>

        {/* Navigation - Desktop */}
        <div className="hidden lg:flex lg:items-center lg:gap-4 lg:ml-auto">
          <Link 
            to="/" 
            className={`flex items-center gap-2 font-semibold text-sm px-3 py-2 rounded-md transition-all relative group ${
              isActive('/') ? 'text-[#ff4d6d]' : 'text-[#00ff9f] hover:text-[#ff4d6d]'
            }`}
            title="Dashboard"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
            <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00ff9f] to-[#ff4d6d] transition-all duration-300 ${
              isActive('/') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
            }`}></div>
          </Link>
          <Link 
            to="/analysis" 
            className={`flex items-center gap-2 font-semibold text-sm px-3 py-2 rounded-md transition-all relative group ${
              isActive('/analysis') ? 'text-[#ff4d6d]' : 'text-[#00ff9f] hover:text-[#ff4d6d]'
            }`}
            title="Analysis"
          >
            <TrendingUp className="w-5 h-5" />
            <span>Analysis</span>
            <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ff4d6d] to-[#ffd700] transition-all duration-300 ${
              isActive('/analysis') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
            }`}></div>
          </Link>
          <Link 
            to="/settings" 
            className={`flex items-center gap-2 font-semibold text-sm px-3 py-2 rounded-md transition-all relative group ${
              isActive('/settings') ? 'text-[#ff4d6d]' : 'text-[#00ff9f] hover:text-[#ff4d6d]'
            }`}
            title="Settings"
          >
            <SettingsIcon className="w-5 h-5" />
            <span>Settings</span>
            <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00ff9f] to-[#00d4ff] transition-all duration-300 ${
              isActive('/settings') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
            }`}></div>
          </Link>
        </div>

        {/* Navigation - Mobile */}
        <div className="flex lg:hidden items-center gap-2 ml-auto">
          <Link 
            to="/" 
            className={`flex items-center justify-center w-10 h-10 rounded-md transition-all ${
              isActive('/') ? 'bg-[#ff4d6d] bg-opacity-20 text-[#ff4d6d]' : 'text-[#00ff9f] hover:bg-[#00ff9f] hover:bg-opacity-10'
            }`}
            title="Dashboard"
          >
            <LayoutDashboard className="w-5 h-5" />
          </Link>
          <Link 
            to="/analysis" 
            className={`flex items-center justify-center w-10 h-10 rounded-md transition-all ${
              isActive('/analysis') ? 'bg-[#ff4d6d] bg-opacity-20 text-[#ff4d6d]' : 'text-[#00ff9f] hover:bg-[#00ff9f] hover:bg-opacity-10'
            }`}
            title="Analysis"
          >
            <TrendingUp className="w-5 h-5" />
          </Link>
          <Link 
            to="/settings" 
            className={`flex items-center justify-center w-10 h-10 rounded-md transition-all ${
              isActive('/settings') ? 'bg-[#ff4d6d] bg-opacity-20 text-[#ff4d6d]' : 'text-[#00ff9f] hover:bg-[#00ff9f] hover:bg-opacity-10'
            }`}
            title="Settings"
          >
            <SettingsIcon className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </nav>
  );
}