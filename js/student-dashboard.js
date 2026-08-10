// ============================================================
// ClubSync — Student Dashboard Logic
// js/student-dashboard.js
//
// Member 2 — Student Portal — Day 1
// Renders all dashboard components from mock data.
// No backend. No auth. Pure frontend only.
// ============================================================

/* ── Helpers ── */
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 17) return 'Good Afternoon';
  return 'Good Evening';
}

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

/* ── Profile Completion ── */
function calcProfileCompletion() {
  const done = PROFILE_FIELDS.filter(f => f.filled).length;
  return Math.round((done / PROFILE_FIELDS.length) * 100);
}

function renderProfileProgress() {
  const pct = calcProfileCompletion();
  const el = document.getElementById('profile-progress-wrap');
  if (!el) return;

  const chips = PROFILE_FIELDS.map(f => `
    <span class="pp-field-chip ${f.filled ? 'done' : 'missing'}">
      ${f.filled ? '✓' : '✗'} ${f.label}
    </span>
  `).join('');

  el.innerHTML = `
    <div class="pp-top">
      <span class="pp-label">Profile Completion</span>
      <span class="pp-pct">${pct}%</span>
    </div>
    <div class="pp-bar"><div class="pp-fill" id="pp-fill-bar" style="width:0%"></div></div>
    <p class="pp-hint">Complete your profile to improve selection chances.</p>
    <div class="pp-fields">${chips}</div>
  `;

  // Animate bar after render
  setTimeout(() => {
    const bar = document.getElementById('pp-fill-bar');
    if (bar) bar.style.width = pct + '%';
  }, 100);
}

/* ── Stats Cards ── */
function calcStats() {
  const apps = STUDENT_APPLICATIONS;
  return {
    total:      apps.length,
    underReview: apps.filter(a => a.status === 'under-review').length,
    interviews: apps.filter(a => a.status === 'interview').length,
    selected:   apps.filter(a => a.status === 'selected').length,
  };
}

function renderStats() {
  const s = calcStats();
  const container = document.getElementById('stats-row');
  if (!container) return;

  const cards = [
    { icon: '📋', num: s.total,      label: 'Total Applications', sub: 'All time', accent: 'green' },
    { icon: '🔍', num: s.underReview, label: 'Under Review',       sub: 'Being evaluated', accent: 'teal' },
    { icon: '🗓️', num: s.interviews,  label: 'Interviews',         sub: 'Scheduled', accent: 'orange' },
    { icon: '🏆', num: s.selected,    label: 'Selected',           sub: 'Accepted to club', accent: 'purple' },
  ];

  container.innerHTML = cards.map(c => `
    <div class="stat-card stat-accent-${c.accent}" role="region" aria-label="${c.label}">
      <div class="stat-card-icon">${c.icon}</div>
      <div class="stat-card-num">${c.num}</div>
      <div class="stat-card-label">${c.label}</div>
      <div class="stat-card-sub">${c.sub}</div>
    </div>
  `).join('');
}

/* ── Status Badge ── */
function statusBadge(status) {
  const map = {
    'applied':      { cls: 'status-applied',      text: 'Applied' },
    'under-review': { cls: 'status-under-review',  text: 'Under Review' },
    'interview':    { cls: 'status-interview',     text: 'Interview' },
    'selected':     { cls: 'status-selected',      text: 'Selected' },
    'rejected':     { cls: 'status-rejected',      text: 'Rejected' },
  };
  const s = map[status] || { cls: 'status-applied', text: status };
  return `<span class="status-badge ${s.cls}">${s.text}</span>`;
}

/* ── Recent Applications ── */
function renderApplications() {
  const container = document.getElementById('recent-apps-list');
  if (!container) return;

  const recent = STUDENT_APPLICATIONS.slice(0, 3);

  if (!recent.length) {
    container.innerHTML = `<div class="empty-state"><div class="empty-state-icon">📭</div>
      <p class="empty-state-title">No applications yet</p>
      <p class="empty-state-text">Explore clubs and apply to get started.</p></div>`;
    return;
  }

  container.innerHTML = recent.map(app => `
    <div class="app-card">
      <div class="app-card-emoji">${app.clubEmoji}</div>
      <div class="app-card-info">
        <div class="app-card-club">${app.clubName}</div>
        <div class="app-card-pos">Position: ${app.position}</div>
        <div class="app-card-date">Applied: ${formatDate(app.appliedDate)}</div>
      </div>
      ${statusBadge(app.status)}
    </div>
  `).join('');
}

/* ── Upcoming Interview ── */
function renderInterview() {
  const container = document.getElementById('interview-wrap');
  if (!container) return;

  if (!STUDENT_INTERVIEWS.length) {
    container.innerHTML = `<div class="empty-state" style="padding:2rem 0">
      <div class="empty-state-icon">📅</div>
      <p class="empty-state-title" style="font-size:0.9rem">No upcoming interviews</p></div>`;
    return;
  }

  const iv = STUDENT_INTERVIEWS[0];
  container.innerHTML = `
    <div class="interview-card">
      <div class="ic-top">
        <div class="ic-emoji">${iv.clubEmoji}</div>
        <div>
          <div class="ic-club">${iv.clubName}</div>
          <div class="ic-pos">${iv.position}</div>
        </div>
      </div>
      <div class="ic-details">
        <div class="ic-detail-item">
          <span class="ic-detail-label">Date</span>
          <span class="ic-detail-val">📅 ${iv.date}</span>
        </div>
        <div class="ic-detail-item">
          <span class="ic-detail-label">Time</span>
          <span class="ic-detail-val">🕐 ${iv.time}</span>
        </div>
        <div class="ic-detail-item" style="grid-column:1/-1">
          <span class="ic-detail-label">Mode</span>
          <span class="ic-detail-val">💻 ${iv.mode}</span>
        </div>
      </div>
      <button class="ic-btn" id="iv-view-btn" onclick="showComingSoonToast('Application details coming soon!')">
        View Application →
      </button>
    </div>
  `;
}

/* ── Saved Clubs ── */
function renderSavedClubs() {
  const container = document.getElementById('saved-clubs-list');
  if (!container) return;

  const categoryLabel = { technical:'Technical', arts:'Arts', cultural:'Cultural', sports:'Sports', academic:'Academic', entrepreneurship:'Entrepreneurship' };

  container.innerHTML = STUDENT_SAVED_CLUBS.map(c => `
    <div class="saved-club-card">
      <div class="scc-emoji">${c.emoji}</div>
      <div class="scc-info">
        <div class="scc-name">${c.name}</div>
        <div class="scc-meta">${categoryLabel[c.category] || c.category} · Deadline: ${c.deadline}</div>
      </div>
      <span class="scc-bookmark" title="Saved">⭐</span>
    </div>
  `).join('');
}

/* ── Notifications ── */
function renderNotifications() {
  const container = document.getElementById('notifications-list');
  if (!container) return;

  const unreadCount = STUDENT_NOTIFICATIONS.filter(n => !n.read).length;
  const badge = document.getElementById('notif-badge');
  if (badge) badge.textContent = unreadCount > 0 ? unreadCount : '';

  const recent = STUDENT_NOTIFICATIONS.slice(0, 4);
  container.innerHTML = recent.map(n => `
    <div class="notif-item ${n.read ? '' : 'unread'}">
      <div class="notif-icon-wrap">${n.icon}</div>
      <div class="notif-text-wrap">
        <div class="notif-msg">${n.message}</div>
        <div class="notif-time">${n.time}</div>
      </div>
      ${!n.read ? '<div class="notif-dot" title="Unread"></div>' : ''}
    </div>
  `).join('');
}

/* ── Quick Actions ── */
function renderQuickActions() {
  const container = document.getElementById('quick-actions-grid');
  if (!container) return;

  container.innerHTML = QUICK_ACTIONS.map(qa => `
    <${qa.href ? `a href="${qa.href}"` : 'button onclick="showComingSoonToast(\'Coming soon!\')"'}
      id="${qa.id}"
      class="qa-btn qa-btn-${qa.color}"
      ${qa.href ? '' : 'type="button"'}>
      <span class="qa-icon">${qa.icon}</span>
      <span class="qa-label">${qa.label}</span>
    </${qa.href ? 'a' : 'button'}>
  `).join('');
}

/* ── Navbar Avatar ── */
function renderNavbar() {
  const avatar = document.getElementById('snav-avatar');
  if (avatar) avatar.textContent = getInitials(CURRENT_STUDENT.name);

  const greeting = document.getElementById('welcome-greeting');
  if (greeting) greeting.textContent = `${getGreeting()}, ${CURRENT_STUDENT.name.split(' ')[0]} 👋`;
}

/* ── Mobile Sidebar Toggle ── */
function initSidebar() {
  const hamburger = document.getElementById('snav-hamburger');
  const sidebar   = document.getElementById('student-sidebar');
  const overlay   = document.getElementById('sidebar-overlay');

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openSidebar);
  if (overlay)   overlay.addEventListener('click', closeSidebar);
}

/* ── Active Sidebar Item ── */
function setActiveSidebarItem(id) {
  document.querySelectorAll('.sidebar-nav-item').forEach(el => el.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) target.classList.add('active');
}

/* ── Toast ── */
let toastTimer;
function showComingSoonToast(msg = 'This feature will be available soon!') {
  const toast = document.getElementById('sp-toast');
  if (!toast) return;
  document.getElementById('sp-toast-msg').textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ── Boot ── */
document.addEventListener('DOMContentLoaded', () => {
  renderNavbar();
  renderStats();
  renderProfileProgress();
  renderApplications();
  renderInterview();
  renderSavedClubs();
  renderNotifications();
  renderQuickActions();
  initSidebar();
  setActiveSidebarItem('nav-dashboard');
});
