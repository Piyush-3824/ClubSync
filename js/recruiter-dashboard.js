// ============================================================
// ClubSync — Recruiter Dashboard Logic
// js/recruiter-dashboard.js
//
// Member 3: Recruitment Management — Day 1 (Dashboard)
//
// Responsibilities:
//   - Sidebar toggle (mobile)
//   - Notification panel
//   - Profile dropdown
//   - Toast notifications
//   - Table data rendering
//   - Quick action interactions
// ============================================================

/* ── Mock Data ── */

/** Recent activity feed */
const ACTIVITY_DATA = [
  {
    id: 1,
    initials: 'RS',
    color: '#00d4ff',
    name: 'Rahul Sharma',
    action: 'applied for',
    target: 'Web Developer',
    time: '2 hours ago',
    status: 'applied',
  },
  {
    id: 2,
    initials: 'AV',
    color: '#22c55e',
    name: 'Aman Verma',
    action: 'was shortlisted for',
    target: 'UI/UX Design',
    time: '4 hours ago',
    status: 'shortlisted',
  },
  {
    id: 3,
    initials: 'PS',
    color: '#a855f7',
    name: 'Priya Singh',
    action: 'interview scheduled —',
    target: 'AI/ML Researcher',
    time: '6 hours ago',
    status: 'interview',
  },
  {
    id: 4,
    initials: 'NK',
    color: '#f59e0b',
    name: 'Neha Kapoor',
    action: 'was selected for',
    target: 'Content Strategy',
    time: '1 day ago',
    status: 'selected',
  },
  {
    id: 5,
    initials: 'SK',
    color: '#00d4ff',
    name: 'Siddharth Kumar',
    action: 'applied for',
    target: 'Backend Development',
    time: '1 day ago',
    status: 'applied',
  },
  {
    id: 6,
    initials: 'DM',
    color: '#ec4899',
    name: 'Divya Mehta',
    action: 'was shortlisted for',
    target: 'Graphic Design',
    time: '2 days ago',
    status: 'shortlisted',
  },
];

/** Upcoming interviews (schedule panel) */
const SCHEDULE_DATA = [
  {
    id: 1,
    day: 'Mon',
    num: '12',
    month: 'Aug',
    candidate: 'Priya Singh',
    role: 'AI/ML Researcher · 11:00 AM',
    avatarColors: ['#00d4ff', '#a855f7'],
    avatarInitials: ['PS', 'RJ'],
  },
  {
    id: 2,
    day: 'Tue',
    num: '13',
    month: 'Aug',
    candidate: 'Rohit Joshi',
    role: 'Web Developer · 2:30 PM',
    avatarColors: ['#22c55e', '#f59e0b'],
    avatarInitials: ['RJ', 'AM'],
  },
  {
    id: 3,
    day: 'Wed',
    num: '14',
    month: 'Aug',
    candidate: 'Ananya Mishra',
    role: 'Data Analyst · 10:00 AM',
    avatarColors: ['#ec4899', '#00d4ff'],
    avatarInitials: ['AM', 'VK'],
  },
];

/** Active recruitment drives */
const DRIVES_DATA = [
  {
    id: 1,
    icon: '💻',
    iconBg: 'rgba(0,212,255,0.12)',
    accentColor: '#00d4ff',
    name: 'Web Development 2026',
    club: 'Coding Club',
    applications: 42,
    capacity: 50,
    status: 'open',
    deadline: 'Aug 20, 2026',
  },
  {
    id: 2,
    icon: '🤖',
    iconBg: 'rgba(168,85,247,0.12)',
    accentColor: '#a855f7',
    name: 'AI / ML Recruitment 2026',
    club: 'AI Club',
    applications: 28,
    capacity: 40,
    status: 'open',
    deadline: 'Aug 18, 2026',
  },
  {
    id: 3,
    icon: '🎨',
    iconBg: 'rgba(236,72,153,0.12)',
    accentColor: '#ec4899',
    name: 'UI/UX Design Sprint 2026',
    club: 'Design Society',
    applications: 14,
    capacity: 20,
    status: 'closing',
    deadline: 'Aug 12, 2026',
  },
];

/** Notifications */
const NOTIFICATIONS_DATA = [
  { id: 1, text: 'Rahul Sharma submitted a new application for Web Developer.', time: '2 hrs ago', read: false },
  { id: 2, text: 'Interview with Priya Singh confirmed for Aug 12, 11:00 AM.', time: '5 hrs ago', read: false },
  { id: 3, text: 'Recruitment drive "AI/ML 2026" closing in 6 days.', time: '1 day ago', read: true },
  { id: 4, text: 'Neha Kapoor accepted the offer for Content Strategy.', time: '2 days ago', read: true },
];

/* ── DOM References ── */
const sidebar       = document.getElementById('dash-sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const notifBtn      = document.getElementById('notif-btn');
const notifPanel    = document.getElementById('notif-panel');
const notifList     = document.getElementById('notif-list');
const profileBtn    = document.getElementById('profile-btn');
const profileDrop   = document.getElementById('profile-dropdown');
const activityList  = document.getElementById('activity-list');
const scheduledList = document.getElementById('schedule-list');
const drivesTableBody = document.getElementById('drives-tbody');
const toastContainer = document.getElementById('toast-container');

/* ============================================================
   RENDER FUNCTIONS
   ============================================================ */

/** Render the Recent Activity list */
function renderActivity() {
  if (!activityList) return;
  activityList.innerHTML = ACTIVITY_DATA.map(item => `
    <li class="activity-item">
      <div class="activity-avatar" style="background:${item.color};">${item.initials}</div>
      <div class="activity-body">
        <div class="activity-desc">
          <strong>${item.name}</strong> ${item.action} <strong>${item.target}</strong>
        </div>
        <div class="activity-meta">
          <span class="activity-time">${item.time}</span>
          <span class="activity-status status-${item.status}">${item.status}</span>
        </div>
      </div>
    </li>
  `).join('');
}

/** Render the Upcoming Interviews schedule panel */
function renderSchedule() {
  if (!scheduledList) return;
  scheduledList.innerHTML = SCHEDULE_DATA.map(item => `
    <li class="schedule-item">
      <div class="schedule-time-block">
        <span class="schedule-time-day">${item.day}</span>
        <span class="schedule-time-num">${item.num}</span>
        <span class="schedule-time-month">${item.month}</span>
      </div>
      <div class="schedule-body">
        <div class="schedule-candidate">${item.candidate}</div>
        <div class="schedule-detail">${item.role}</div>
      </div>
      <div class="schedule-avatars">
        ${item.avatarInitials.map((init, i) => `
          <div class="schedule-mini-avatar" style="background:${item.avatarColors[i]};">${init}</div>
        `).join('')}
      </div>
    </li>
  `).join('');
}

/** Render the Active Recruitment Drives table */
function renderDrives() {
  if (!drivesTableBody) return;
  drivesTableBody.innerHTML = DRIVES_DATA.map(drive => {
    const pct = Math.round((drive.applications / drive.capacity) * 100);
    return `
      <tr>
        <td>
          <div class="drive-name-cell">
            <div class="drive-icon-circle" style="background:${drive.iconBg};">${drive.icon}</div>
            <div>
              <div class="drive-name">${drive.name}</div>
              <div class="drive-club">${drive.club}</div>
            </div>
          </div>
        </td>
        <td>
          <div class="app-count-val">${drive.applications}</div>
          <div class="app-count-label">of ${drive.capacity} seats</div>
          <div class="mini-progress">
            <div class="mini-progress-fill"
              style="width:${pct}%; background:${drive.accentColor};"></div>
          </div>
        </td>
        <td>
          <span class="drive-status-badge drive-status-${drive.status}">
            ${drive.status === 'open' ? '● Open' : drive.status === 'closing' ? '⚠ Closing Soon' : '✕ Closed'}
          </span>
        </td>
        <td style="color:var(--t3);font-size:0.78rem;">${drive.deadline}</td>
        <td>
          <button class="btn-view" onclick="showToast('Recruitment details will be available soon.', 'info')">
            View →
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

/** Render the Notifications panel */
function renderNotifications() {
  if (!notifList) return;
  notifList.innerHTML = NOTIFICATIONS_DATA.map(n => `
    <div class="notif-item ${n.read ? '' : 'unread'}" onclick="markRead(${n.id})">
      <div class="notif-dot ${n.read ? 'read' : ''}"></div>
      <div>
        <div class="notif-text">${n.text}</div>
        <div class="notif-time">${n.time}</div>
      </div>
    </div>
  `).join('');
}

/** Mark a notification as read */
function markRead(id) {
  const n = NOTIFICATIONS_DATA.find(x => x.id === id);
  if (n) n.read = true;
  renderNotifications();
  updateNotifBadge();
}

/** Mark all notifications as read */
function markAllRead() {
  NOTIFICATIONS_DATA.forEach(n => n.read = true);
  renderNotifications();
  updateNotifBadge();
}

/** Update the red badge count on the bell icon */
function updateNotifBadge() {
  const badge = document.getElementById('notif-badge');
  if (!badge) return;
  const unread = NOTIFICATIONS_DATA.filter(n => !n.read).length;
  badge.textContent = unread;
  badge.style.display = unread > 0 ? 'flex' : 'none';
}

/* ============================================================
   TOAST SYSTEM
   ============================================================ */

/**
 * Show a toast message.
 * @param {string} message - Toast text
 * @param {'info'|'success'|'warning'|'error'} type
 */
function showToast(message, type = 'info') {
  if (!toastContainer) return;

  const icons = {
    info:    'ℹ️',
    success: '✅',
    warning: '⚠️',
    error:   '❌',
  };

  const colors = {
    info:    '#22c55e',
    success: '#4ade80',
    warning: '#eab308',
    error:   '#ef4444',
  };

  const toast = document.createElement('div');
  toast.className = 'toast-item';
  toast.style.setProperty('--toast-color', colors[type] || colors.info);
  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || icons.info}</span>
    <span>${message}</span>
    <button class="toast-close" aria-label="Close">&times;</button>
  `;

  toastContainer.appendChild(toast);

  // Show with animation
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });

  // Close button
  toast.querySelector('.toast-close').addEventListener('click', () => {
    dismissToast(toast);
  });

  // Auto-dismiss after 4s
  setTimeout(() => dismissToast(toast), 4000);
}

function dismissToast(toast) {
  toast.classList.remove('show');
  setTimeout(() => toast.remove(), 350);
}

/* ============================================================
   SIDEBAR TOGGLE (mobile)
   ============================================================ */
function openSidebar() {
  sidebar.classList.add('open');
  sidebarOverlay.classList.add('visible');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  sidebar.classList.remove('open');
  sidebarOverlay.classList.remove('visible');
  document.body.style.overflow = '';
}

if (sidebarToggle) {
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
  });
}

if (sidebarOverlay) {
  sidebarOverlay.addEventListener('click', closeSidebar);
}

/* ============================================================
   NOTIFICATION PANEL TOGGLE
   ============================================================ */
if (notifBtn && notifPanel) {
  notifBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = notifPanel.classList.toggle('open');
    // Close profile dropdown if open
    profileDrop?.classList.remove('open');
    profileBtn?.classList.remove('open');
    if (isOpen) renderNotifications();
  });
}

/* ============================================================
   PROFILE DROPDOWN TOGGLE
   ============================================================ */
if (profileBtn && profileDrop) {
  profileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    profileDrop.classList.toggle('open');
    profileBtn.classList.toggle('open');
    // Close notif panel
    notifPanel?.classList.remove('open');
  });
}

/* Close dropdowns on outside click */
document.addEventListener('click', () => {
  notifPanel?.classList.remove('open');
  profileDrop?.classList.remove('open');
  profileBtn?.classList.remove('open');
});

/* ============================================================
   SEARCH — focus effect feedback
   ============================================================ */
const searchInput = document.getElementById('topbar-search');
if (searchInput) {
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && searchInput.value.trim()) {
      showToast(`Searching for "${searchInput.value.trim()}"…`, 'info');
    }
  });
}

/* ============================================================
   QUICK ACTIONS
   ============================================================ */
function quickAction(label) {
  showToast(`${label} — This feature will be available soon.`, 'info');
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  renderActivity();
  renderSchedule();
  renderDrives();
  renderNotifications();
  updateNotifBadge();
});
