// ============================================================
// ClubSync — Explore Page Logic
// js/explore.js
// Search, Filter, Sort, Render, Pagination, Save
// ============================================================

// ── State ──
let state = {
  clubs: [...CLUBS_DATA],
  filtered: [...CLUBS_DATA],
  category: 'all',
  search: '',
  sort: 'popular',
  view: 'grid',
  page: 1,
  perPage: 9,
  saved: new Set(JSON.parse(localStorage.getItem('cs-saved') || '[]'))
};

// ── DOM refs ──
const grid = document.getElementById('clubs-grid');
const resultsCount = document.getElementById('results-count');
const pageNumbers = document.getElementById('page-numbers');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const searchInput = document.getElementById('search-input');

// ── Render Cards ──
function renderCards() {
  const start = (state.page - 1) * state.perPage;
  const end = start + state.perPage;
  const pageClubs = state.filtered.slice(start, end);

  grid.innerHTML = '';

  if (pageClubs.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <span class="no-results-icon">🔍</span>
        <p class="empty-state-title">No clubs found</p>
        <p class="empty-state-text">Try a different search term or category</p>
      </div>`;
    return;
  }

  pageClubs.forEach((club, idx) => {
    const isSaved = state.saved.has(club.id);
    const pct = Math.round((club.applications / club.maxApplications) * 100);
    const badgeClass = getCategoryBadge(club.category);

    const card = document.createElement('div');
    card.className = `club-card ${club.recruiting ? 'recruiting' : ''}`;
    card.setAttribute('data-club-id', club.id);
    card.style.animation = `fadeInUp 0.4s ease ${idx * 0.05}s both`;

    // NOTE: Both explore.html and club-detail.html are in pages/ — same directory
    card.innerHTML = `
      ${club.recruiting ? '<div class="recruiting-ribbon">Recruiting</div>' : ''}

      <div class="club-banner">
        <div class="club-banner-gradient" style="background: ${club.bannerGradient};"></div>
        <div class="club-banner-pattern"></div>
        <div class="club-banner-icon">${club.emoji}</div>
      </div>

      <div class="club-card-body">
        <div class="club-card-header">
          <div>
            <h3 class="club-name">${club.name}</h3>
          </div>
          <button class="save-btn ${isSaved ? 'saved' : ''}"
            id="save-btn-${club.id}"
            onclick="toggleSave(event, ${club.id})"
            aria-label="${isSaved ? 'Unsave' : 'Save'} ${club.name}"
            title="${isSaved ? 'Remove from saved' : 'Save club'}">
            ${isSaved ? '⭐' : '☆'}
          </button>
        </div>

        <p class="club-desc">${club.description}</p>

        <div class="club-tags">
          <span class="badge ${badgeClass}">${getCategoryLabel(club.category)}</span>
          ${club.tags.slice(0, 2).map(t => `<span class="tag">${t}</span>`).join('')}
        </div>

        <div class="club-meta">
          <div class="club-meta-item">
            <span class="meta-icon">👥</span>
            <span>${club.members} members</span>
          </div>
          <div class="club-meta-item">
            <span class="meta-icon">📅</span>
            <span>${club.events} events</span>
          </div>
          <div class="club-meta-spacer"></div>
          <div class="club-meta-item">
            <span style="color: ${club.accentColor}; text-shadow: 0 0 6px ${club.accentColor}40;">
              ★ ${club.rating}
            </span>
          </div>
        </div>
      </div>

      <div class="club-card-footer">
        ${club.recruiting ? `
          <div class="app-progress" style="flex:1;">
            <div class="app-progress-text">
              <span>Applications</span>
              <span>${club.applications}/${club.maxApplications}</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${pct}%; background: linear-gradient(90deg, ${club.accentColor}88, ${club.accentColor});"></div>
            </div>
          </div>
          <a href="club-detail.html?id=${club.id}" class="btn btn-sm btn-outline-green" id="view-club-${club.id}"
            style="border-color: ${club.accentColor}44; color: ${club.accentColor}; background: ${club.accentColor}0a;"
            onmouseover="this.style.background='${club.accentColor}18'; this.style.boxShadow='0 0 12px ${club.accentColor}30';"
            onmouseout="this.style.background='${club.accentColor}0a'; this.style.boxShadow='none';">
            View →
          </a>
        ` : `
          <span style="font-size:0.78rem; color: var(--text-muted); flex:1;">
            🔒 Recruitment closed
          </span>
          <a href="club-detail.html?id=${club.id}" class="btn btn-sm btn-ghost" id="view-club-${club.id}">
            View →
          </a>
        `}
      </div>
    `;

    grid.appendChild(card);
  });

  resultsCount.innerHTML = `Showing <strong>${state.filtered.length}</strong> club${state.filtered.length !== 1 ? 's' : ''}`;
  renderPagination();
}

// ── Render Pagination ──
function renderPagination() {
  const totalPages = Math.ceil(state.filtered.length / state.perPage);
  pageNumbers.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.className = `page-number ${i === state.page ? 'active' : ''}`;
    btn.textContent = i;
    btn.id = `page-btn-${i}`;
    btn.onclick = () => { state.page = i; renderCards(); window.scrollTo({top: 0, behavior:'smooth'}); };
    pageNumbers.appendChild(btn);
  }

  prevBtn.disabled = state.page <= 1;
  nextBtn.disabled = state.page >= totalPages;
}

// ── Filter & Sort ──
function applyFiltersAndSort() {
  let result = [...state.clubs];

  if (state.category !== 'all') {
    result = result.filter(c => c.category === state.category);
  }

  if (state.search) {
    const q = state.search.toLowerCase();
    result = result.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.tags.some(t => t.toLowerCase().includes(q)) ||
      c.category.toLowerCase().includes(q) ||
      c.shortName.toLowerCase().includes(q)
    );
  }

  switch (state.sort) {
    case 'newest':       result.sort((a, b) => b.founded - a.founded); break;
    case 'alphabetical': result.sort((a, b) => a.name.localeCompare(b.name)); break;
    case 'members':      result.sort((a, b) => b.members - a.members); break;
    case 'recruiting':   result.sort((a, b) => Number(b.recruiting) - Number(a.recruiting)); break;
    default:             result.sort((a, b) => b.rating - a.rating);
  }

  state.filtered = result;
  state.page = 1;
  renderCards();
}

// ── Event Handlers ──
function filterCategory(cat, btn) {
  state.category = cat;
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  applyFiltersAndSort();
}

function sortClubs(value) {
  state.sort = value;
  applyFiltersAndSort();
}

function setView(view) {
  state.view = view;
  grid.classList.toggle('list-view', view === 'list');
  document.getElementById('view-grid-btn').classList.toggle('active', view === 'grid');
  document.getElementById('view-list-btn').classList.toggle('active', view === 'list');
}

function changePage(dir) {
  const total = Math.ceil(state.filtered.length / state.perPage);
  state.page = Math.max(1, Math.min(total, state.page + dir));
  renderCards();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleSave(e, clubId) {
  e.preventDefault();
  e.stopPropagation();
  const btn = document.getElementById(`save-btn-${clubId}`);

  if (state.saved.has(clubId)) {
    state.saved.delete(clubId);
    btn.textContent = '☆';
    btn.classList.remove('saved');
  } else {
    state.saved.add(clubId);
    btn.textContent = '⭐';
    btn.classList.add('saved');
    btn.style.transform = 'scale(1.4)';
    setTimeout(() => { btn.style.transform = ''; }, 200);
  }

  localStorage.setItem('cs-saved', JSON.stringify([...state.saved]));
}

// ── Search Debounce ──
let searchTimer;
searchInput.addEventListener('input', (e) => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    state.search = e.target.value.trim();
    applyFiltersAndSort();
  }, 250);
});

// ── Initialize ──
applyFiltersAndSort();
