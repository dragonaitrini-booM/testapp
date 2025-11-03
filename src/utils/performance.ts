// src/utils/performance.ts

/**
 * Tracks and logs Core Web Vitals to the console.
 * This function should be called once, ideally in the main entry point of the application.
 */
export const reportWebVitals = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // We are in a browser environment with performance monitoring capabilities

    // Function to log a performance entry
    const logPerformanceEntry = (entry: PerformanceEntry) => {
      console.log(`[Perf] ${entry.name}:`, {
        startTime: Math.round(entry.startTime),
        duration: 'duration' in entry ? Math.round(entry.duration) : undefined,
      });
    };

    // Track First Contentful Paint (FCP)
    const observerFCP = new PerformanceObserver((list) => {
      for (const entry of list.getEntriesByName('first-contentful-paint')) {
        logPerformanceEntry(entry);
      }
    });
    observerFCP.observe({ type: 'paint', buffered: true });

    // Track Largest Contentful Paint (LCP)
    const observerLCP = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        logPerformanceEntry(entry);
      }
    });
    observerLCP.observe({ type: 'largest-contentful-paint', buffered: true });

    // Track Cumulative Layout Shift (CLS)
    const observerCLS = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // The value is a decimal, so we don't round it.
        console.log('[Perf] CLS:', { value: (entry as any).value });
      }
    });
    observerCLS.observe({ type: 'layout-shift', buffered: true });

    // Track Page Load Time
    window.addEventListener('load', () => {
      const navEntries = performance.getEntriesByType('navigation');
      if (navEntries.length > 0) {
        const navTiming = navEntries[0] as PerformanceNavigationTiming;
        console.log('[Perf] Page Load Time:', {
          duration: Math.round(navTiming.loadEventEnd - navTiming.fetchStart)
        });
      }
    });
  }
};
