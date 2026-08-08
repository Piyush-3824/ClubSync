// ============================================================
// ClubSync — Events Logic
// js/events.js
//
// Handles:
//   - Events listing and filtering
//   - Event detail view
//   - RSVP / registration
//   - Calendar integration
//   - Upcoming events widget
//
// TODO (Member 1): Build events listing page (pages/explore-events.html)
// ============================================================

// ── Event Categories ──
const EVENT_TYPES = {
  WORKSHOP:    'workshop',
  COMPETITION: 'competition',
  SEMINAR:     'seminar',
  NETWORKING:  'networking',
  ORIENTATION: 'orientation',
  SOCIAL:      'social',
  OTHER:       'other'
};

// ── Event Type Config ──
const EVENT_TYPE_CONFIG = {
  [EVENT_TYPES.WORKSHOP]:    { label: 'Workshop',    color: '#00d4ff', icon: '🛠️' },
  [EVENT_TYPES.COMPETITION]: { label: 'Competition', color: '#f59e0b', icon: '🏆' },
  [EVENT_TYPES.SEMINAR]:     { label: 'Seminar',     color: '#8b5cf6', icon: '🎤' },
  [EVENT_TYPES.NETWORKING]:  { label: 'Networking',  color: '#00ff41', icon: '🤝' },
  [EVENT_TYPES.ORIENTATION]: { label: 'Orientation', color: '#ec4899', icon: '🧭' },
  [EVENT_TYPES.SOCIAL]:      { label: 'Social',      color: '#f59e0b', icon: '🎉' },
  [EVENT_TYPES.OTHER]:       { label: 'Event',       color: '#6b7280', icon: '📅' },
};

// ── Filter events by date range ──
function filterEventsByDate(events, from, to) {
  return events.filter(ev => {
    const d = new Date(ev.date);
    return (!from || d >= new Date(from)) && (!to || d <= new Date(to));
  });
}

// ── Filter events by club ──
function filterEventsByClub(events, clubId) {
  return events.filter(ev => ev.clubId === clubId);
}

// ── Sort events by date (ascending) ──
function sortEventsByDate(events) {
  return [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
}

// ── Format event date for display ──
function formatEventDate(dateStr) {
  const d = new Date(dateStr);
  return {
    day: d.getDate().toString().padStart(2, '0'),
    month: d.toLocaleString('default', { month: 'short' }).toUpperCase(),
    full: d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  };
}

// ── Get RSVP'd events from localStorage ──
function getRsvpdEvents() {
  return new Set(JSON.parse(localStorage.getItem('cs-rsvp') || '[]'));
}

function toggleRsvp(eventId) {
  const rsvpd = getRsvpdEvents();
  if (rsvpd.has(eventId)) { rsvpd.delete(eventId); } else { rsvpd.add(eventId); }
  localStorage.setItem('cs-rsvp', JSON.stringify([...rsvpd]));
  return rsvpd.has(eventId);
}

// TODO: Build events listing page
// TODO: Build event detail page
// TODO: Build RSVP confirmation flow
// TODO: Add calendar (.ics) download support
