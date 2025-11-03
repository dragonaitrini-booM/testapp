import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Settings from './pages/Settings';
import { runSecurityChecks } from './monitoring/security';
import { runAccessibilityChecks } from './monitoring/accessibility';
import MonitoringDashboard from './components/MonitoringDashboard';

function App() {
  useEffect(() => {
    runSecurityChecks();
    runAccessibilityChecks();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <MonitoringDashboard />
    </Router>
  );
}

export default App;
