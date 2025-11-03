// src/monitoring/performance.js
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

const MonitoringService = {
  // Track expensive operations
  trackAPICall: (endpoint, startTime, success) => {
    const duration = Date.now() - startTime;

    // Send to your analytics
    if (window.analytics) {
      window.analytics.track('API_Call', {
        endpoint,
        duration,
        success,
        timestamp: new Date().toISOString()
      });
    }

    // Console log for development
    console.log(`🕐 API Call: ${endpoint} took ${duration}ms`);

    // Alert on expensive calls
    if (duration > 2000) {
      console.warn(`⚠️ Slow API call detected: ${endpoint} took ${duration}ms`);
    }
  },

  // Monitor Core Web Vitals
  initWebVitals: () => {
    getCLS(console.log);
    getFID(console.log);
    getFCP(console.log);
    getLCP(console.log);
    getTTFB(console.log);
  },

  // Track button clicks and prevent double billing
  trackExpensiveAction: (actionName, cost = 0) => {
    const sessionActions = JSON.parse(sessionStorage.getItem('expensiveActions') || '[]');
    const now = Date.now();

    // Prevent duplicate actions within 5 seconds
    const recentActions = sessionActions.filter(action =>
      now - action.timestamp < 5000 && action.action === actionName
    );

    if (recentActions.length > 0) {
      console.warn(`🚫 Blocked duplicate action: ${actionName}`);
      return false;
    }

    // Track the action
    sessionActions.push({
      action: actionName,
      timestamp: now,
      cost
    });

    sessionStorage.setItem('expensiveActions', JSON.stringify(sessionActions));

    console.log(`💰 Tracked expensive action: ${actionName} (${cost} credits)`);
    return true;
  }
};

export default MonitoringService;
