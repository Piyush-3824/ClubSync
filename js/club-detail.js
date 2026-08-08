// ============================================================
// ClubSync — Club Detail Page Logic
// js/club-detail.js
// Reads ?id=N from URL, populates all sections dynamically
// ============================================================

// ── Mock extended data per club ──
const CLUB_EXTENDED = {
  activities: [
    { icon: '🛠️', title: 'Workshops', desc: 'Hands-on sessions with industry experts and alumni' },
    { icon: '🏆', title: 'Competitions', desc: 'Inter-college and national level events' },
    { icon: '🤝', title: 'Networking', desc: 'Meet like-minded peers and professionals' },
    { icon: '📖', title: 'Learning Sessions', desc: 'Weekly deep-dive study groups and demos' }
  ],
  teamTemplates: [
    { name: 'Aanya Sharma',  role: 'President',     initials: 'AS', color: '#00ff41' },
    { name: 'Rohan Mehta',   role: 'Vice President', initials: 'RM', color: '#00d4ff' },
    { name: 'Priya Nair',    role: 'Secretary',      initials: 'PN', color: '#8b5cf6' },
    { name: 'Karan Patel',   role: 'Tech Lead',      initials: 'KP', color: '#f59e0b' },
    { name: 'Divya Rao',     role: 'Events Head',    initials: 'DR', color: '#ec4899' },
    { name: 'Aditya Kumar',  role: 'Design Lead',    initials: 'AK', color: '#00ff41' },
  ],
  eventsTemplates: [
    { day: '15', month: 'Aug', name: 'Annual Orientation Drive',   time: '10:00 AM', venue: 'Main Auditorium', tag: 'Orientation' },
    { day: '22', month: 'Aug', name: 'Workshop: Intro to the Domain', time: '2:00 PM',  venue: 'Room 301',         tag: 'Workshop'     },
    { day: '01', month: 'Sep', name: 'Inter-College Competition',  time: '9:00 AM',  venue: 'Sports Complex',    tag: 'Competition'  },
    { day: '14', month: 'Sep', name: 'Alumni Networking Night',    time: '6:00 PM',  venue: 'Campus Grounds',    tag: 'Networking'   },
  ],
  requirements: [
    'Open to all years and branches',
    'Passion for the domain (experience a plus)',
    'Commitment to attending regular meetings',
    'Willingness to contribute to club projects',
    'Good communication and teamwork skills',
  ]
};

// ── Get Club from URL ──
const params = new URLSearchParams(window.location.search);
const clubId = parseInt(params.get('id')) || 1;
const club = CLUBS_DATA.find(c => c.id === clubId) || CLUBS_DATA[0];

// ── Saved State ──
let savedSet = new Set(JSON.parse(localStorage.getItem('cs-saved') || '[]'));

// ── Populate Hero ──
function populateHero() {
  document.title = `ClubSync — ${club.name}`;
  document.querySelector('meta[name="description"]').content =
    `Learn about ${club.name} on ClubSync. ${club.description}`;

  document.getElementById('bc-club-name').textContent = club.name;
  document.getElementById('hero-banner-bg').style.background = club.bannerGradient;

  const avatar = document.getElementById('club-avatar');
  avatar.textContent = club.emoji;
  avatar.style.borderColor = club.accentColor + '44';

  const badgeContainer = document.getElementById('club-info-badges');
  const badgeClass = getCategoryBadge(club.category);
  badgeContainer.innerHTML = `
    <span class="badge ${badgeClass}">${getCategoryLabel(club.category)}</span>
    ${club.recruiting
      ? `<span class="badge badge-green" style="animation: pulse 2s ease-in-out infinite;">🟢 Recruiting Now</span>`
      : `<span class="badge" style="background:rgba(255,255,255,0.06); color: var(--text-muted); border:1px solid var(--border-subtle);">🔒 Closed</span>`
    }
  `;

  document.getElementById('club-full-name').textContent = club.name;
  document.getElementById('qs-members').textContent = club.members;
  document.getElementById('qs-founded').textContent = club.founded;
  document.getElementById('qs-events').textContent = club.events;
  document.getElementById('qs-rating').innerHTML =
    `<span style="color:${club.accentColor}; text-shadow: 0 0 8px ${club.accentColor}40;">★ ${club.rating}</span>`;

  const applyBtn = document.getElementById('apply-btn');
  if (!club.recruiting) {
    applyBtn.textContent = '🔒 Recruitment Closed';
    applyBtn.disabled = true;
    applyBtn.style.opacity = '0.5';
    applyBtn.style.cursor = 'not-allowed';
  } else {
    applyBtn.style.background = `linear-gradient(135deg, ${club.accentColor}cc, ${club.accentColor})`;
    applyBtn.style.borderColor = club.accentColor;
    applyBtn.style.boxShadow = `0 0 20px ${club.accentColor}40`;
    applyBtn.style.color = '#000';
  }

  document.getElementById('modal-title').textContent = `Apply to ${club.name}`;
  updateSaveBtn();
}

// ── Populate About ──
function populateAbout() {
  document.getElementById('about-text').textContent = club.description +
    ' We are a vibrant community of passionate individuals who believe in learning by doing. Our members regularly go on to top companies, research institutions, and founding their own ventures. Joining us means access to a powerful alumni network and mentors who genuinely care about your growth.';

  const tagsRow = document.getElementById('tags-row');
  tagsRow.innerHTML = club.tags.map(t => `<span class="tag">${t}</span>`).join('');
}

// ── Populate Activities ──
function populateActivities() {
  document.getElementById('activities-grid').innerHTML =
    CLUB_EXTENDED.activities.map(a => `
      <div class="activity-card">
        <span class="activity-icon">${a.icon}</span>
        <div class="activity-title">${a.title}</div>
        <div class="activity-desc">${a.desc}</div>
      </div>
    `).join('');
}

// ── Populate Events ──
function populateEvents() {
  document.getElementById('events-badge').textContent = `${club.events} events`;
  document.getElementById('events-list').innerHTML =
    CLUB_EXTENDED.eventsTemplates.map(ev => `
      <div class="event-item">
        <div class="event-date-block">
          <span class="event-day">${ev.day}</span>
          <span class="event-month">${ev.month}</span>
        </div>
        <div class="event-info">
          <div class="event-name">${ev.name}</div>
          <div class="event-meta">
            <span>⏰ ${ev.time}</span>
            <span>📍 ${ev.venue}</span>
          </div>
        </div>
        <span class="event-tag">${ev.tag}</span>
      </div>
    `).join('');
}

// ── Populate Team ──
function populateTeam() {
  document.getElementById('team-grid').innerHTML =
    CLUB_EXTENDED.teamTemplates.map(member => `
      <div class="team-card">
        <div class="team-avatar" style="background: ${member.color}18; border-color: ${member.color}33;">
          <span style="color: ${member.color};">${member.initials}</span>
        </div>
        <div class="team-name">${member.name}</div>
        <div class="team-role">${member.role}</div>
      </div>
    `).join('');
}

// ── Populate Sidebar ──
function populateSidebar() {
  const pct = Math.round((club.applications / club.maxApplications) * 100);
  const body = document.getElementById('app-status-body');

  if (club.recruiting) {
    body.innerHTML = `
      <div class="recruit-status">
        <div class="glow-dot"></div>
        Recruitment Open
      </div>
      <div class="app-bar-wrapper">
        <div class="app-bar-labels">
          <span>Applications Received</span>
          <span>${club.applications} / ${club.maxApplications}</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${pct}%; background: linear-gradient(90deg, ${club.accentColor}88, ${club.accentColor});"></div>
        </div>
        <div style="margin-top: 0.4rem; font-size: 0.72rem; color: var(--text-muted);">
          ${club.maxApplications - club.applications} spots remaining
        </div>
      </div>
      <button class="btn btn-primary sidebar-apply-btn" onclick="handleApply()"
        style="background: linear-gradient(135deg, ${club.accentColor}cc, ${club.accentColor}); border-color: ${club.accentColor}; color: #000; box-shadow: 0 0 16px ${club.accentColor}40;">
        Apply Now →
      </button>
    `;
    document.getElementById('recruit-dot').style.display = 'block';
  } else {
    body.innerHTML = `
      <div style="padding: 1rem; text-align: center; background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">
        <span style="font-size: 1.5rem; display: block; margin-bottom: 0.5rem;">🔒</span>
        <p style="font-size: 0.85rem; color: var(--text-secondary);">Recruitment is currently closed.</p>
        <p style="font-size: 0.78rem; color: var(--text-muted); margin-top: 0.3rem;">Save this club to get notified when it opens.</p>
      </div>
      <button class="btn btn-outline-green sidebar-apply-btn" style="margin-top: 1rem;" onclick="toggleDetailSave()">
        ☆ Save for Later
      </button>
    `;
    document.getElementById('recruit-dot').style.display = 'none';
  }

  document.getElementById('dates-list').innerHTML = `
    <div class="date-item">
      <span class="date-item-label">Application Deadline</span>
      <span class="date-item-val ${club.recruiting && club.deadline !== 'Closed' ? 'urgent' : ''}">
        ${club.deadline}
      </span>
    </div>
    <div class="date-item">
      <span class="date-item-label">Interview Period</span>
      <span class="date-item-val">Sep 2026</span>
    </div>
    <div class="date-item">
      <span class="date-item-label">Results Announced</span>
      <span class="date-item-val">Sep 15, 2026</span>
    </div>
    <div class="date-item">
      <span class="date-item-label">Orientation</span>
      <span class="date-item-val">Sep 20, 2026</span>
    </div>
  `;

  document.getElementById('req-list').innerHTML =
    CLUB_EXTENDED.requirements.map(r => `<li>${r}</li>`).join('');

  // Similar clubs — same pages/ directory, so link is just club-detail.html?id=N
  const similar = CLUBS_DATA
    .filter(c => c.category === club.category && c.id !== club.id)
    .slice(0, 3);

  const similarList = document.getElementById('similar-list');
  if (similar.length === 0) {
    similarList.innerHTML = '<p style="font-size:0.82rem; color: var(--text-muted);">No similar clubs found.</p>';
  } else {
    similarList.innerHTML = similar.map(c => `
      <a href="club-detail.html?id=${c.id}" class="similar-item" id="similar-${c.id}">
        <span class="similar-icon">${c.emoji}</span>
        <div class="similar-info">
          <span class="similar-name">${c.name}</span>
          <span class="similar-members">👥 ${c.members} members</span>
        </div>
        <span style="font-size: 0.75rem; color: var(--text-muted);">→</span>
      </a>
    `).join('');
  }
}

// ── Save Toggle ──
function updateSaveBtn() {
  const btn = document.getElementById('detail-save-btn');
  const isSaved = savedSet.has(club.id);
  btn.textContent = isSaved ? '⭐ Saved' : '☆ Save';
  btn.classList.toggle('saved', isSaved);
}

function toggleDetailSave() {
  if (savedSet.has(club.id)) {
    savedSet.delete(club.id);
  } else {
    savedSet.add(club.id);
  }
  localStorage.setItem('cs-saved', JSON.stringify([...savedSet]));
  updateSaveBtn();
}

// ── Share ──
function shareClub() {
  if (navigator.share) {
    navigator.share({ title: club.name + ' — ClubSync', text: club.description, url: window.location.href });
  } else {
    navigator.clipboard?.writeText(window.location.href);
    showToast('🔗 Link copied to clipboard!');
  }
}

// ── Apply Modal ──
function handleApply() {
  if (!club.recruiting) return;
  document.getElementById('apply-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('apply-modal').classList.remove('open');
  document.body.style.overflow = '';
}

function submitApplication(e) {
  e.preventDefault();
  const btn = document.getElementById('modal-submit-btn');
  btn.textContent = 'Submitting...';
  btn.disabled = true;
  setTimeout(() => {
    closeModal();
    showToast('✅ Application submitted! We\'ll be in touch soon.');
    document.getElementById('apply-form').reset();
    btn.textContent = 'Submit Application →';
    btn.disabled = false;
  }, 1500);
}

// ── Toast ──
function showToast(msg) {
  const toast = document.getElementById('success-toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

// ── Modal close on backdrop / Escape ──
document.getElementById('apply-modal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ── Initialize ──
populateHero();
populateAbout();
populateActivities();
populateEvents();
populateTeam();
populateSidebar();
