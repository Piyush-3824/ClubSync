<<<<<<< Updated upstream
=======
# ClubSync — Discover. Apply. Belong.

> A modern college club recruitment portal built as a collaborative team project.

---

## 📁 Project Structure

```
club-recruitment-portal/
│
├── index.html              ← Landing page (cyber grid + hero)
├── README.md
├── .gitignore
│
├── assets/
│   ├── images/             ← Club banners, hero images
│   ├── icons/              ← SVG icons
│   └── logos/              ← Club logos / brand assets
│
├── css/
│   ├── style.css           ← Global design system (shared by all inner pages)
│   ├── landing.css         ← Landing page + Login cyber aesthetic
│   ├── login.css           ← Auth card styles
│   ├── explore.css         ← Explore clubs page
│   ├── club-detail.css     ← Club detail page
│   ├── variables.css       ← (TODO) Extract CSS custom properties
│   ├── navbar.css          ← (TODO) Extract navbar styles
│   ├── footer.css          ← (TODO) Extract footer styles
│   ├── components.css      ← (TODO) Reusable component styles
│   └── responsive.css      ← (TODO) Breakpoint overrides
│
├── js/
│   ├── main.js             ← Global init, auth state, navbar
│   ├── clubs.js            ← Clubs data + helpers (getCategoryBadge, etc.)
│   ├── explore.js          ← Explore page logic (search, filter, sort, paginate)
│   ├── club-detail.js      ← Club detail page logic (populate, apply modal)
│   ├── search.js           ← Global search + autocomplete
│   ├── student.js          ← Student profile + saved clubs logic
│   ├── applications.js     ← Application CRUD + status helpers
│   ├── events.js           ← Events filter + RSVP logic
│   └── recruiter.js        ← Recruiter drive + applicant management
│
├── data/
│   ├── clubs.js            ← 24 mock clubs (source of truth)
│   ├── events.js           ← 6 mock events across clubs
│   ├── students.js         ← 5 mock student profiles
│   └── applications.js     ← 5 mock applications (all statuses)
│
├── pages/
│   ├── login.html          ← Login + Register (tabbed, cyber grid bg)
│   ├── explore.html        ← Club discovery (search, filter, grid/list)
│   └── club-detail.html    ← Club detail + Apply modal
│
└── react/
    ├── App.jsx             ← Root component (future SPA migration)
    ├── components/
    │   ├── Navbar.jsx      ← Auth-aware navbar
    │   ├── Footer.jsx      ← Site footer
    │   ├── Button.jsx      ← Design system button
    │   ├── Modal.jsx       ← Reusable overlay modal
    │   ├── Toast.jsx       ← Auto-dismiss notification
    │   └── ClubCard.jsx    ← Club card (grid + list view)
    └── pages/
        ├── public/         ← Member 1: Club Discovery pages
        ├── student/        ← Member 2: Student Dashboard pages
        └── recruiter/      ← Member 3: Recruiter Dashboard pages
```

---

## 👥 Team Responsibilities

| Member | Area | Key Pages |
|--------|------|-----------|
| **Member 1** | Club Discovery & Public Website | `index.html`, `explore.html`, `club-detail.html`, events |
| **Member 2** | Student Dashboard | `student/dashboard.html`, `student/applications.html`, `student/saved.html` |
| **Member 3** | Recruiter Dashboard | `recruiter/dashboard.html`, `recruiter/drives.html`, `recruiter/applicants.html` |

---

## 🎨 Design System

### Visual Language
- **Landing + Login** → Cyber grid, neon green (`#00ff41`), `Share Tech Mono` font
- **Inner Pages** → Dark glassmorphism, ambient glow blobs, `Inter` font

### Key CSS Variables (in `css/style.css`)
```css
--green-neon: #00ff41
--bg-surface: #0d1117
--glass-bg: rgba(13, 20, 30, 0.6)
--font-main: 'Inter', sans-serif
--font-mono: 'Share Tech Mono', monospace
```

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

---

## 📝 Day 1 Completed (Member 1)

- ✅ Landing page with cyber grid animation
- ✅ Login / Register page with tabbed auth form
- ✅ Explore Clubs page (search, filter, sort, grid/list, pagination)
- ✅ Club Detail page (hero, about, events, team, sidebar, apply modal)
- ✅ 24 mock clubs with full metadata
- ✅ localStorage save/bookmark system
- ✅ Proper folder structure

---

## 📝 Day 1 Completed (Member 3 - Recruitment Management)

- ✅ Recruiter Dashboard layout (`pages/recruiter/dashboard.html`)
- ✅ Dashboard UI with Apple glassmorphism and green aesthetic (`css/recruiter-dashboard.css`)
- ✅ Dashboard logic and interactions, custom Toast notifications (`js/recruiter-dashboard.js`)
- ✅ Integrated reusable React component for statistic cards (`DashboardCard`) via CDN
- ✅ Added "Recruiter Dashboard" CTA button to the landing page hero section

---

## 🔗 Page Flow

```
index.html
  ├── pages/login.html
  └── pages/explore.html
        └── pages/club-detail.html?id=N
```
>>>>>>> Stashed changes
