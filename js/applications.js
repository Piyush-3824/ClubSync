// ============================================================
// ClubSync — Applications Logic
// js/applications.js
//
// Handles:
//   - Application submission
//   - Application status tracking (pending / shortlisted / rejected / accepted)
//   - Application list rendering (student view)
//   - Application review (recruiter view)
//
// TODO (Member 2): Student application tracking page
// TODO (Member 3): Recruiter application review dashboard
// ============================================================

// ── Application Status Enum ──
const APP_STATUS = {
  PENDING:      'pending',
  SHORTLISTED:  'shortlisted',
  INTERVIEW:    'interview',
  ACCEPTED:     'accepted',
  REJECTED:     'rejected',
  WITHDRAWN:    'withdrawn'
};

// ── Status Display Config ──
const STATUS_CONFIG = {
  [APP_STATUS.PENDING]:     { label: 'Under Review',  color: '#f59e0b', icon: '⏳' },
  [APP_STATUS.SHORTLISTED]: { label: 'Shortlisted',   color: '#00d4ff', icon: '⭐' },
  [APP_STATUS.INTERVIEW]:   { label: 'Interview',     color: '#8b5cf6', icon: '📅' },
  [APP_STATUS.ACCEPTED]:    { label: 'Accepted! 🎉',  color: '#00ff41', icon: '✅' },
  [APP_STATUS.REJECTED]:    { label: 'Not Selected',  color: '#6b7280', icon: '❌' },
  [APP_STATUS.WITHDRAWN]:   { label: 'Withdrawn',     color: '#6b7280', icon: '↩️' },
};

// ── Local Applications Storage (offline / placeholder) ──
const APPLICATIONS_KEY = 'cs-applications';

function getApplications() {
  return JSON.parse(localStorage.getItem(APPLICATIONS_KEY) || '[]');
}

function saveApplication(applicationData) {
  const apps = getApplications();
  const newApp = {
    id: Date.now(),
    submittedAt: new Date().toISOString(),
    status: APP_STATUS.PENDING,
    ...applicationData
  };
  apps.push(newApp);
  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(apps));
  return newApp;
}

function withdrawApplication(appId) {
  const apps = getApplications();
  const idx = apps.findIndex(a => a.id === appId);
  if (idx !== -1) {
    apps[idx].status = APP_STATUS.WITHDRAWN;
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(apps));
  }
}

function getApplicationByClub(clubId) {
  return getApplications().find(a => a.clubId === clubId) || null;
}

// ── Status badge HTML helper ──
function renderStatusBadge(status) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG[APP_STATUS.PENDING];
  return `<span style="
    display: inline-flex; align-items: center; gap: 0.3rem;
    padding: 0.2rem 0.65rem; border-radius: 999px;
    font-size: 0.72rem; font-weight: 600;
    background: ${config.color}18;
    color: ${config.color};
    border: 1px solid ${config.color}33;
  ">${config.icon} ${config.label}</span>`;
}

// TODO: Build applications list page (pages/student/applications.html)
// TODO: Build recruiter review panel (pages/recruiter/applications.html)
// TODO: Replace localStorage with real API calls
