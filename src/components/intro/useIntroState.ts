'use client';

import { useCallback } from 'react';

const SESSION_KEY = 'vlv_intro_seen';

/**
 * Session-scoped "has the visitor already seen the intro?" guard.
 *
 * Exposed as stable callbacks rather than state values so the parent can poll
 * them inside a layout effect without causing SSR/hydration mismatches and
 * without the effect re-firing on unrelated renders. sessionStorage only exists
 * on the client, so we never read it during render.
 */
export function useIntroState() {
  const hasSeen = useCallback((): boolean => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === 'true';
    } catch {
      // storage unavailable (private mode) — treat as not seen
      return false;
    }
  }, []);

  const markSeen = useCallback((): void => {
    try {
      sessionStorage.setItem(SESSION_KEY, 'true');
    } catch {
      // storage unavailable (private mode) — the gate simply can't remember
    }
  }, []);

  return { hasSeen, markSeen };
}