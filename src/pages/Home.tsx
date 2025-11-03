// src/pages/Home.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

// ✅ Only import components that exist
import ListGroup from '../components/ListGroup';
import Alert from '../components/Alert';
import { Button } from '../components/Button';

// Inline Zap (lightning) icon
const ZapIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

function Home() {
  type Status = 'idle' | 'training' | 'ready' | 'error';
  const [agentStatus, setAgentStatus] = useState<Status>('idle');
  const [businessUrl, setBusinessUrl] = useState('');

  const isValidUrl = (url: string): boolean => {
    try {
      const u = new URL(url);
      return u.protocol === 'https:' || u.protocol === 'http:';
    } catch {
      return false;
    }
  };

  const isSuspiciousUrl = (url: string): boolean => {
    try {
      const host = new URL(url).hostname;
      return ['yourbusiness.com', 'example.com', 'test.com'].includes(host);
    } catch {
      return true; // malformed URL = suspicious
    }
  };

  const handleUrlSubmit = () => {
    const trimmed = businessUrl.trim();
    if (!trimmed) return;
    if (!isValidUrl(trimmed) || isSuspiciousUrl(trimmed)) {
      setAgentStatus('error');
      return;
    }
    setAgentStatus('training');
    setTimeout(() => setAgentStatus('ready'), 3000);
  };

  // Loading spinner
  const Spinner = () => (
    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
  );

  const handleAlertClose = () => {
    setAgentStatus('idle');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50">
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/settings">Go to Settings</Link>
          <h1 className="text-4xl font-bold text-teal-700 mb-2">🇹🇹 Jogania</h1>
          <p className="text-xl text-gray-700">
            Single AI Agent Platform for Trinidad & Tobago Businesses
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Powered by Kimi K1 • Scraped by Fire Crawler
          </p>
        </div>

        {/* URL Input Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            🌐 Train Your Business Agent
          </h2>

          <div className="flex gap-3">
            <input
              type="url"
              value={businessUrl}
              onChange={(e) => setBusinessUrl(e.target.value)}
              placeholder="https://yourbusiness.tt"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
              aria-label="Enter your business website URL"
            />

            {/* ✅ Native button with styling and icon */}
            <Button
              onClick={handleUrlSubmit}
              disabled={!businessUrl.trim() || agentStatus === 'training'}
              className="px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg hover:opacity-90 transition font-semibold flex items-center gap-2"
            >
              {agentStatus === 'training' ? (
                <>
                  <Spinner />
                  <span>Training...</span>
                </>
              ) : (
                <>
                  <ZapIcon />
                  <span>Create Agent</span>
                </>
              )}
            </Button>
          </div>

          {/* Status / Alerts */}
          <div className="mt-4">
            {agentStatus === 'idle' && (
              <p className="text-gray-500 text-sm">
                💡 Enter your business website to create your intelligent assistant
              </p>
            )}

            {agentStatus === 'training' && (
              <div className="flex items-center gap-2 text-blue-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600" />
                <span className="text-sm">Fire Crawler scraping • Kimi K1 learning...</span>
              </div>
            )}

            {agentStatus === 'ready' && (
              <Alert
                message="✅ Your Jogania agent is ready! Check performance below."
                type="success"
                onClose={handleAlertClose}
              />
            )}

            {agentStatus === 'error' && (
              <Alert
                message="❌ Invalid or unsupported URL. Please enter a valid business website (e.g. https://yourbusiness.tt)."
                type="error"
                onClose={handleAlertClose}
              />
            )}
          </div>
        </div>

        {/* Dashboard */}
        {agentStatus === 'ready' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              📊 Agent Performance Dashboard
            </h2>
            <ListGroup />
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Built for Caribbean businesses • Privacy-first • Cost-effective</p>
        </div>
      </div>
    </div>
  );
}

export default Home;