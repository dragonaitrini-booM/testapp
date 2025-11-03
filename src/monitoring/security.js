// src/monitoring/security.js

const SecurityMonitor = {
  // Check for exposed secrets
  scanForSecrets: () => {
    const suspiciousPatterns = [
      /sk-[a-zA-Z0-9]{48}/, // OpenAI API key
      /hf_[a-zA-Z0-9]{34}/, // Hugging Face token
      /[a-zA-Z0-9]{20}@[a-zA-Z0-9]{20}/, // Potential API key
    ];

    // Scan page content
    const pageContent = document.body.innerText;
    suspiciousPatterns.forEach(pattern => {
      if (pattern.test(pageContent)) {
        console.error(`🚨 POTENTIAL SECRET EXPOSED: Pattern ${pattern} found in page content`);
      }
    });

    // Check localStorage
    Object.keys(localStorage).forEach(key => {
      const value = localStorage.getItem(key);
      suspiciousPatterns.forEach(pattern => {
        if (pattern.test(value)) {
          console.error(`🚨 SECRET IN LOCALSTORAGE: ${key} contains potential secret`);
        }
      });
    });
  },

  // Monitor for XSS attempts
  monitorXSS: () => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.forEach((value, key) => {
      if (/<script|javascript:|onerror=|onload=/i.test(value)) {
        console.error(`🚨 XSS ATTEMPT DETECTED: ${key}=${value}`);
      }
    });
  },

  // Validate HTTPS
  checkHTTPS: () => {
    if (window.location.protocol !== 'https:') {
      console.warn(`⚠️ INSECURE CONNECTION: Using ${window.location.protocol}`);
    }
  }
};

export const runSecurityChecks = () => {
  window.addEventListener('load', () => {
    SecurityMonitor.scanForSecrets();
    SecurityMonitor.monitorXSS();
    SecurityMonitor.checkHTTPS();
  });
};
