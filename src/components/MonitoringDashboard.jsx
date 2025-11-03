// src/components/MonitoringDashboard.jsx
import React, { useState, useEffect } from 'react';

// Helper functions to be defined or imported
const calculateAverageResponseTime = (logs) => {
  const apiCalls = logs.filter(log => log.type === 'api_call' && log.duration);
  if (apiCalls.length === 0) return 0;
  const totalDuration = apiCalls.reduce((sum, call) => sum + call.duration, 0);
  return Math.round(totalDuration / apiCalls.length);
};

const calculateCostEstimate = (logs) => {
  const actions = logs.filter(log => log.type === 'expensive_action' && log.cost);
  return actions.reduce((sum, action) => sum + action.cost, 0) * 0.0001; // Example cost calculation
};


const MonitoringDashboard = () => {
  const [metrics, setMetrics] = useState({
    apiCalls: 0,
    averageResponseTime: 0,
    errors: 0,
    costEstimate: 0
  });

  useEffect(() => {
    // This is a mock localStorage logger. In a real app, you'd have a more robust system.
    const logToLocalStorage = (type, data) => {
      const logs = JSON.parse(localStorage.getItem('monitoringLogs') || '[]');
      logs.push({ type, timestamp: new Date().toISOString(), ...data });
      localStorage.setItem('monitoringLogs', JSON.stringify(logs));
    };

    // Mock API calls and errors for demonstration
    const mockInterval = setInterval(() => {
        const isError = Math.random() > 0.8;
        logToLocalStorage('api_call', { duration: 50 + Math.random() * 200, success: !isError });
        if(isError) logToLocalStorage('error', { message: 'Failed to fetch data' });
    }, 2000);


    const interval = setInterval(() => {
      const logs = JSON.parse(localStorage.getItem('monitoringLogs') || '[]');
      const recentLogs = logs.filter(log =>
        Date.now() - new Date(log.timestamp).getTime() < 300000 // Last 5 minutes
      );

      setMetrics({
        apiCalls: recentLogs.filter(log => log.type === 'api_call').length,
        averageResponseTime: calculateAverageResponseTime(recentLogs),
        errors: recentLogs.filter(log => log.type === 'error').length,
        costEstimate: calculateCostEstimate(recentLogs)
      });
    }, 5000);

    return () => {
        clearInterval(mockInterval);
        clearInterval(interval);
    };
  }, []);

  return (
    <div className="monitoring-dashboard" style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '15px',
      borderRadius: '8px',
      fontSize: '12px',
      zIndex: 9999
    }}>
      <h4>🚀 Live Monitoring</h4>
      <div>API Calls (5min): {metrics.apiCalls}</div>
      <div>Avg Response: {metrics.averageResponseTime}ms</div>
      <div>Errors: {metrics.errors}</div>
      <div>Est. Cost: ${metrics.costEstimate.toFixed(4)}</div>
    </div>
  );
};

export default MonitoringDashboard;
