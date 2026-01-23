/**
 * Rate limit utility for managing API request limits
 */

export interface RateLimitInfo {
  isLimited: boolean;
  remainingTime: number;
  limitUntil: number | null;
}

/**
 * Check if a rate limit is active
 */
export function checkRateLimit(key: string): RateLimitInfo {
  if (typeof window === 'undefined') {
    return { isLimited: false, remainingTime: 0, limitUntil: null };
  }

  const storedLimit = localStorage.getItem(key);
  if (!storedLimit) {
    return { isLimited: false, remainingTime: 0, limitUntil: null };
  }

  const limitTime = parseInt(storedLimit);
  const now = Date.now();

  if (limitTime > now) {
    const remainingTime = Math.ceil((limitTime - now) / 1000);
    return { isLimited: true, remainingTime, limitUntil: limitTime };
  }

  // Rate limit expired, clear it
  localStorage.removeItem(key);
  return { isLimited: false, remainingTime: 0, limitUntil: null };
}

/**
 * Set a rate limit
 */
export function setRateLimit(key: string, retryAfterSeconds: number): RateLimitInfo {
  if (typeof window === 'undefined') {
    return { isLimited: false, remainingTime: 0, limitUntil: null };
  }

  const limitUntil = Date.now() + (retryAfterSeconds * 1000);
  localStorage.setItem(key, limitUntil.toString());

  return {
    isLimited: true,
    remainingTime: retryAfterSeconds,
    limitUntil,
  };
}

/**
 * Clear a rate limit
 */
export function clearRateLimit(key: string): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(key);
}

/**
 * Format remaining time for display
 */
export function formatRemainingTime(seconds: number): string {
  if (seconds >= 60) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return remainingSeconds > 0 
      ? `${minutes}분 ${remainingSeconds}초`
      : `${minutes}분`;
  }
  return `${seconds}초`;
}

/**
 * Rate limit keys
 */
export const RATE_LIMIT_KEYS = {
  AI_GENERATE: 'ai_generate_rate_limit',
  AI_PREDICT: 'ai_predict_rate_limit',
} as const;
