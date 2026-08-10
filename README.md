# ClubSync — Discover. Apply. Belong.

> A modern college club recruitment portal built as a collaborative team project.

![ClubSync](https://img.shields.io/badge/ClubSync-v1.0--day1-00ff41?style=flat-square&labelColor=000000)
![Vite](https://img.shields.io/badge/Vite-6.x-646cff?style=flat-square&labelColor=000000)
![HTML](https://img.shields.io/badge/HTML5-Vanilla-e34f26?style=flat-square&labelColor=000000)
![CSS](https://img.shields.io/badge/CSS-Glassmorphism-00d4ff?style=flat-square&labelColor=000000)
![Branch](https://img.shields.io/badge/branch-feature%2Fstudent--portal-a78bfa?style=flat-square&labelColor=000000)

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Then open your browser at **http://localhost:5173**

### Quick Links (dev server must be running)

| Page | URL |
|------|-----|
| 🏠 Landing Page | http://localhost:5173/ |
| 🔍 Explore Clubs | http://localhost:5173/pages/explore.html |
| 🔐 Login | http://localhost:5173/pages/login.html |
| 🎓 **Student Dashboard** | http://localhost:5173/pages/student/dashboard.html |
| 📋 Club Detail (example) | http://localhost:5173/pages/club-detail.html?id=1 |

---

## 📁 Project Structure

```
ClubSync/
│
├── index.html                    ← Landing page (cyber grid + hero + Student Portal button)
├── README.md
├── .gitignore
├── package.json                  ← Vite dev server
│
├── css/
│   ├── style.css                 ← Global design system (shared tokens, components)
│   ├── landing.css               ← Landing page cyber aesthetic + Student Portal CTA
│   ├── login.css                 ← Auth card styles
│   ├── explore.css               ← Explore clubs page
│   ├── club-detail.css           ← Club detail page
│   └── student-dashboard.css     ← [Member 2] Student portal glassmorphism UI ✨
│
├── js/
│   ├── main.js                   ← Global init
│   ├── clubs.js                  ← Club helpers
│   ├── explore.js                ← Explore page logic
│   ├── club-detail.js            ← Club detail logic
│   ├── search.js                 ← Search + autocomplete
│   ├── student.js                ← Student profile helpers (shared)
│   ├── student-dashboard.js      ← [Member 2] Dashboard renderer + interactions ✨
│   ├── applications.js           ← Application CRUD helpers
│   ├── events.js                 ← Events logic
│   └── recruiter.js              ← Recruiter logic
│
├── data/
│   ├── clubs.js                  ← 24 mock clubs (source of truth)
│   ├── events.js                 ← Mock events
│   ├── students.js               ← Mock student profiles
│   ├── applications.js           ← Mock applications (all statuses)
│   └── student-dashboard.js      ← [Member 2] Student portal mock data ✨
│
├── pages/
│   ├── login.html                ← Login + Register (redirects to student dashboard)
│   ├── explore.html              ← Club discovery (search, filter, grid/list)
│   ├── club-detail.html          ← Club detail + Apply modal
│   └── student/                  ← [Member 2] Student Portal pages ✨
│       └── dashboard.html        ← Student Dashboard (Day 1 complete)
│
└── react/
    ├── App.jsx                   ← Root component (future SPA migration)
    └── components/
        ├── Navbar.jsx
        ├── Footer.jsx
        ├── Button.jsx
        ├── Modal.jsx
        ├── Toast.jsx
        └── ClubCard.jsx
```

---

## 👥 Team Responsibilities

| Member | Branch | Area | Status |
|--------|--------|------|----|
| **Member 1** | `feature/club-discovery` | Club Discovery & Public Website | ✅ Day 1 Done |
| **Member 2** | `feature/student-portal` | Student Dashboard & Portal | ✅ Day 1 Done |
| **Member 3** | `feature/recruitment-management` | Recruiter Dashboard | 🔄 In Progress |

---

## 🎓 Member 2 — Student Portal Progress

### ✅ Day 1 — Dashboard Foundation (Complete)

| Component | File | Status |
|-----------|------|--------|
| Student Navbar | `pages/student/dashboard.html` + CSS | ✅ |
| Student Sidebar (desktop + mobile drawer) | CSS + JS | ✅ |
| Dashboard Stats (4 cards, computed from data) | JS | ✅ |
| Profile Completion (dynamic %, field chips) | JS | ✅ |
| Recent Applications (3 preview cards + status badges) | JS | ✅ |
| Upcoming Interview card | JS | ✅ |
| Saved Clubs preview | JS | ✅ |
| Notifications preview (unread count + badge) | JS | ✅ |
| Quick Actions (4 buttons) | JS | ✅ |
| Responsive layout (desktop / tablet / mobile) | CSS | ✅ |
| Mock data (separated from UI) | `data/student-dashboard.js` | ✅ |
| Apple glassmorphism + neon green UI | CSS | ✅ |
| Landing page "Student Portal" button | `index.html` + `css/landing.css` | ✅ |

### 📅 Upcoming Days (Student Portal Roadmap)

| Day | Feature |
|-----|---------|
| Day 2 | My Profile page + Edit Profile |
| Day 3 | My Applications full page + Application Details |
| Day 4 | Saved Clubs full page |
| Day 5 | Notifications full page |
| Day 6 | Apply Form (submit application to a club) |
| Day 7–8 | Polish, animations, skeleton loaders |
| Day 9–10 | Integration with teammates' data + final review |

---

## 🎨 Design System

### Visual Language
- **Landing + Login** → Cyber grid animation, neon green (`#00ff41`), `Share Tech Mono` font, pure black `#000`
- **Student Portal** → Apple-style glassmorphism, `backdrop-filter: blur(24px)`, neon green + teal + purple accents, cyber grid background to match landing

### Key CSS Variables (`css/style.css`)
```css
--green-neon:   #00ff41
--accent-teal:  #00d4ff
--accent-purple:#8b5cf6
--bg-void:      #000000
--bg-deep:      #080c10
--glass-bg:     rgba(13, 20, 30, 0.6)
--font-main:    'Inter', sans-serif
--font-mono:    'Share Tech Mono', monospace
```

---

## 🔗 Page Flow

```
index.html
  ├── 🎓 Student Portal  →  pages/student/dashboard.html
  ├── 🔐 Login/Register  →  pages/login.html  →  pages/student/dashboard.html
  └── 🔍 Explore Clubs   →  pages/explore.html
                                └── pages/club-detail.html?id=N
```

---

## 📝 Day 1 Completed — All Members

### Member 1 — Club Discovery
- [x] Landing page with cyber grid animation + Student Portal CTA button
- [x] Login / Register page (redirects to student dashboard after login)
- [x] Explore Clubs page (search, filter, sort, grid/list, pagination)
- [x] Club Detail page (hero, about, events, team, sidebar, apply modal)
- [x] 24 mock clubs with full metadata

### Member 2 — Student Portal ✨
- [x] Student Dashboard with Apple glassmorphism + neon green UI
- [x] Sidebar navigation (desktop sticky + mobile drawer)
- [x] Stats cards (Total, Under Review, Interviews, Selected)
- [x] Profile Completion tracker (dynamic % calculation)
- [x] Recent Applications preview (3 cards + color-coded status badges)
- [x] Upcoming Interview section
- [x] Saved Clubs preview (3 clubs)
- [x] Notifications preview with unread count
- [x] Quick Actions panel
- [x] Fully responsive (mobile/tablet/desktop)
- [x] All mock data separated in `data/student-dashboard.js`
- [x] "Student Portal" button added to landing page

---

## 🔧 Git Workflow

Each member works on their own branch:

```bash
# Switch to your branch
git checkout feature/student-portal

# After making changes
git status
git add .
git commit -m "feat: describe your change"
git push origin feature/student-portal
```

> ⚠️ **Never push directly to `main`.** All merges go through pull requests.
