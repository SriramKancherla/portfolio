export function isPageReload() {
  const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
  return nav?.type === "reload";
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
