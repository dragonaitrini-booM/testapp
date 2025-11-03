// src/utils/cache.ts

// Simple in-memory cache with a Time-to-Live (TTL)
const cache = new Map<string, { data: any; timestamp: number }>();
const FIVE_MINUTES = 5 * 60 * 1000;

/**
 * Caches the result of an async function to prevent duplicate calls.
 * @param key A unique key to identify the cached resource.
 * @param asyncFn The async function to execute if the key is not in the cache.
 * @param ttl The time-to-live for the cached item in milliseconds.
 * @returns The cached or newly fetched data.
 */
export const withCache = async <T>(
  key: string,
  asyncFn: () => Promise<T>,
  ttl: number = FIVE_MINUTES
): Promise<T> => {
  // Return cached result if available and fresh
  if (cache.has(key)) {
    const { data, timestamp } = cache.get(key)!;
    if (Date.now() - timestamp < ttl) {
      console.log(`[Cache] HIT for key: ${key}`);
      return data as T;
    }
    console.log(`[Cache] STALE for key: ${key}`);
  }

  console.log(`[Cache] MISS for key: ${key}`);
  // Make the async call and cache the result
  const data = await asyncFn();
  cache.set(key, { data, timestamp: Date.now() });
  return data;
};
