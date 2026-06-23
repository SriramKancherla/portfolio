export function isPageReload() {
  const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
  return nav?.type === "reload";
}

const INTRO_STORAGE_KEY = "portfolio:intro-done";

/** Survives client-side route changes; resets automatically on full page reload. */
let introCompletedThisSession = false;

/** Valid client-side routes — reload on these should not bounce to home. */
export const SPA_ROUTES = ["/", "/resume"] as const;

function readIntroFromStorage() {
  try {
    return sessionStorage.getItem(INTRO_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function writeIntroToStorage() {
  try {
    sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
  } catch {
    // ignore private browsing / quota errors
  }
}

function clearIntroStorage() {
  try {
    sessionStorage.removeItem(INTRO_STORAGE_KEY);
  } catch {
    // ignore
  }
}

function syncIntroSession() {
  if (typeof window === "undefined") return;

  if (isPageReload()) {
    clearIntroStorage();
    introCompletedThisSession = false;
    return;
  }

  if (readIntroFromStorage()) {
    introCompletedThisSession = true;
  }
}

syncIntroSession();

export function hasIntroCompleted() {
  return introCompletedThisSession;
}

export function markIntroCompleted() {
  introCompletedThisSession = true;
  writeIntroToStorage();
}

export function prepareHomeIntro() {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  window.scrollTo(0, 0);

  if (window.location.hash) {
    history.replaceState(null, "", window.location.pathname + window.location.search);
  }
}

export function resetScrollRestoration() {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "auto";
  }
}
