// src/utils/errors.ts

/**
 * A secure error handler that logs detailed error messages for developers
 * while returning a generic, user-friendly message to the UI.
 * @param error The error object caught in a try-catch block.
 * @param context A string providing context about where the error occurred.
 * @returns A generic error message suitable for display to the user.
 */
export const handleSecureError = (error: unknown, context: string): string => {
  const

errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  // Log the detailed error for debugging purposes (server-side logging is ideal)
  console.error(`[${context}] Request ID: ${requestId} | Error: ${errorMessage}`, {
    errorObject: error,
  });

  // Return a generic message to the user to avoid leaking implementation details
  return `An unexpected error occurred. Please try again later. (Error ID: ${requestId})`;
};
