/** Chapter links remain usable, but a fresh page always opens at the introduction. */
export function resetPortfolioScroll() {
  window.history.scrollRestoration = 'manual';
  if (window.location.hash) {
    window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search);
  }
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
}