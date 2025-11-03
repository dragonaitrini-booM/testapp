// src/monitoring/accessibility.js
import axe from 'axe-core';

const AccessibilityMonitor = {
  // Run axe-core accessibility scan
  runAccessibilityScan: async () => {
    if (typeof window !== 'undefined') {
      const results = await axe.run();

      console.log('🔍 Accessibility Scan Results:', {
        violations: results.violations.length,
        passes: results.passes.length,
        incomplete: results.incomplete.length
      });

      // Report critical violations
      results.violations.forEach(violation => {
        console.error(`🚨 Accessibility Violation: ${violation.description}`);
        console.error(`   Impact: ${violation.impact}`);
        console.error(`   Elements: ${violation.nodes.length}`);
      });
    }
  },

  // Check color contrast
  checkColorContrast: () => {
    const elements = document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, a, button');
    elements.forEach(element => {
      const computedStyle = window.getComputedStyle(element);
      const color = computedStyle.color;
      const backgroundColor = computedStyle.backgroundColor;

      // Simple contrast check (you can enhance this)
      if (color === backgroundColor) {
        console.warn(`⚠️ Low contrast detected on element:`, element);
      }
    });
  },

  // Check keyboard navigation
  checkKeyboardNavigation: () => {
    const focusableElements = document.querySelectorAll(
      'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );

    console.log(`🔍 Found ${focusableElements.length} focusable elements`);

    // Check for missing focus indicators
    focusableElements.forEach(element => {
      const computedStyle = window.getComputedStyle(element);
      if (computedStyle.outlineStyle === 'none') {
        console.warn(`⚠️ Element missing focus indicator:`, element);
      }
    });
  }
};

export const runAccessibilityChecks = () => {
  window.addEventListener('load', () => {
    setTimeout(() => {
      AccessibilityMonitor.runAccessibilityScan();
      AccessibilityMonitor.checkColorContrast();
      AccessibilityMonitor.checkKeyboardNavigation();
    }, 1000);
  });
};
