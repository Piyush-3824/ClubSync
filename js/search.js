// ============================================================
// ClubSync — Search Logic
// js/search.js
//
// Handles:
//   - Global search bar (header search)
//   - Autocomplete suggestions
//   - Search results page rendering
//   - Recent searches (localStorage)
//
// TODO (Member 1): Implement full-text search across clubs + events
// ============================================================

const RECENT_SEARCHES_KEY = 'cs-recent-searches';
const MAX_RECENT = 5;

// ── Save recent search ──
function saveRecentSearch(query) {
  let recent = JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY) || '[]');
  recent = [query, ...recent.filter(q => q !== query)].slice(0, MAX_RECENT);
  localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recent));
}

// ── Get recent searches ──
function getRecentSearches() {
  return JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY) || '[]');
}

// ── Clear recent searches ──
function clearRecentSearches() {
  localStorage.removeItem(RECENT_SEARCHES_KEY);
}

// ── Debounce helper ──
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// ── Search clubs by query ──
function searchClubs(query, clubs = []) {
  if (!query || !query.trim()) return clubs;
  const q = query.toLowerCase().trim();
  return clubs.filter(club =>
    club.name.toLowerCase().includes(q) ||
    club.shortName.toLowerCase().includes(q) ||
    club.description.toLowerCase().includes(q) ||
    club.tags.some(tag => tag.toLowerCase().includes(q)) ||
    club.category.toLowerCase().includes(q)
  );
}

// TODO: Wire up global search input from navbar
// TODO: Build autocomplete dropdown UI
// TODO: Navigate to explore.html?q=<query> on submit
