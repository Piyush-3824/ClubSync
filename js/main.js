// ============================================================
// ClubSync — Main Entry Point
// js/main.js
//
// Initializes global app behavior:
//   - Theme / dark mode
//   - Global navbar interactions
//   - Notification system bootstrap
//   - Auth state check (redirect if not logged in)
//
// TODO (Member 1): Wire up navbar active states on page load
// TODO (Member 2): Hook in student auth state
// TODO (Member 3): Hook in recruiter auth state
// ============================================================

// ── Auth State (placeholder) ──
const AppState = {
  isLoggedIn: false,
  userRole: null, // 'student' | 'recruiter' | null
  userName: null,
};

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  checkAuthState();
});

function initNavbar() {
  // Highlight active nav link based on current page
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') && currentPath.includes(link.getAttribute('href'))) {
      link.classList.add('active');
    }
  });
}

function checkAuthState() {
  // TODO: Replace with real auth check (Firebase / JWT / session)
  const stored = sessionStorage.getItem('cs-user');
  if (stored) {
    const user = JSON.parse(stored);
    AppState.isLoggedIn = true;
    AppState.userRole = user.role;
    AppState.userName = user.name;
  }
}
