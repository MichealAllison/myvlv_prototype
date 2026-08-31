'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

export type ViewKey =
  | 'home'
  | 'about'
  | 'ecosystem'
  | 'services'
  | 'blog'
  | 'contact';

export const VIEW_KEYS: ViewKey[] = [
  'home',
  'about',
  'ecosystem',
  'services',
  'blog',
  'contact',
];

/** Menu items — what the overlay actually routes between. */
export interface NavItem {
  key: ViewKey;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { key: 'about', label: 'About' },
  { key: 'ecosystem', label: 'Ecosystem' },
  { key: 'services', label: 'Services' },
  { key: 'blog', label: 'Blog' },
  { key: 'contact', label: 'Contact' },
];

function hashFromView(view: ViewKey): string {
  return view === 'home' ? '#/' : `#/${view}`;
}

/** Read the current view from the URL hash, defaulting to home. */
function viewFromHash(): ViewKey {
  if (typeof window === 'undefined') return 'home';
  const clean = window.location.hash.replace(/^#\/?/, '').toLowerCase();
  return (VIEW_KEYS as string[]).includes(clean)
    ? (clean as ViewKey)
    : 'home';
}

interface ViewContextValue {
  view: ViewKey;
  /** Swap the visible view and record it in the URL (back/forward works). */
  navigate: (view: ViewKey) => void;
}

const ViewContext = createContext<ViewContextValue | null>(null);

/**
 * Single source of truth for the currently-visible view. Back/forward support
 * comes for free because each navigate() pushes a `#/view` history entry and a
 * popstate/hashchange listener restores state when the user goes back/forward.
 */
export function ViewProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<ViewKey>('home');

  // Initial view from the URL (client only — SSR always renders home).
  useEffect(() => {
    setView(viewFromHash());
  }, []);

  // Keep state in sync with the browser history (back / forward buttons).
  useEffect(() => {
    const sync = () => setView(viewFromHash());
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('hashchange', sync);
    };
  }, []);

  const navigate = useCallback((next: ViewKey) => {
    setView(next);
    // Push, don't assign location.hash, so back/forward fire popstate cleanly.
    try {
      window.history.pushState(null, '', hashFromView(next));
    } catch {
      // history API unavailable (rare) — state is already updated regardless.
    }
  }, []);

  return (
    <ViewContext.Provider value={{ view, navigate }}>
      {children}
    </ViewContext.Provider>
  );
}

export function useView(): ViewContextValue {
  const ctx = useContext(ViewContext);
  if (!ctx) throw new Error('useView must be used within <ViewProvider>');
  return ctx;
}