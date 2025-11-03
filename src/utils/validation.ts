// src/utils/validation.ts

/**
 * Sanitizes a string by removing characters that could be used in XSS attacks.
 * It removes < and > characters to prevent HTML tag injection.
 * @param input The string to sanitize.
 * @returns A sanitized string.
 */
export const sanitizeInput = (input: string): string => {
  return input.replace(/[<>]/g, '').trim();
};

/**
 * Validates a URL to ensure it uses http or https protocols.
 * @param url The URL string to validate.
 * @returns True if the URL is valid, false otherwise.
 */
export const validateURL = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
};
