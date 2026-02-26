import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LiveNotification from "./components/LiveNotification";
import Home from "./pages/Home";
import Analysis from "./pages/Analysis";
import Settings from "./pages/Settings";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <LiveNotification />
        {/* padding top to account for fixed navbar */}
        <div className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
