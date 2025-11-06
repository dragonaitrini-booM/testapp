import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DatasetProvider } from './contexts/DatasetContext';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Settings from './pages/Settings';

function App() {
  return (
    <DatasetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </DatasetProvider>
  );
}

export default App;
