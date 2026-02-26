import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LiveNotification from "./components/LiveNotification";
import Dashboard from "./pages/Dashboard";
import Analysis from "./pages/Analysis";
import Settings from "./pages/Settings";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <LiveNotification />
        <div>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
