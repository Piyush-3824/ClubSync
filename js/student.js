// ============================================================
// ClubSync — Student Dashboard Logic
// js/student.js
//
// Handles student-specific features:
//   - Student profile management
//   - Saved clubs (bookmarks)
//   - Application history view
//   - Notification preferences
//   - Recommended clubs (based on interests)
//
// TODO (Member 2 — Student Dashboard): Implement these features
// ============================================================

// ── Student Profile (placeholder) ──
const StudentProfile = {
  id: null,
  name: '',
  email: '',
  college: '',
  year: null,
  branch: '',
  interests: [],   // e.g. ['technical', 'sports']
  savedClubs: [],  // club IDs
  applications: [] // application IDs
};

// ── Load profile from localStorage (offline placeholder) ──
function loadStudentProfile() {
  const stored = localStorage.getItem('cs-student-profile');
  if (stored) Object.assign(StudentProfile, JSON.parse(stored));
  return StudentProfile;
}

// ── Save profile ──
function saveStudentProfile(data) {
  Object.assign(StudentProfile, data);
  localStorage.setItem('cs-student-profile', JSON.stringify(StudentProfile));
}

// ── Get saved clubs ──
function getSavedClubIds() {
  return new Set(JSON.parse(localStorage.getItem('cs-saved') || '[]'));
}

// ── Get recommended clubs based on interests ──
function getRecommendedClubs(clubs, interests = []) {
  if (!interests.length) return clubs.slice(0, 6);
  const scored = clubs.map(club => ({
    ...club,
    score: interests.includes(club.category) ? 2 : 0 +
           club.tags.filter(t => interests.includes(t.toLowerCase())).length
  }));
  return scored.sort((a, b) => b.score - a.score).slice(0, 6);
}

// TODO: Build student dashboard page (pages/student/dashboard.html)
// TODO: Build student profile page (pages/student/profile.html)
// TODO: Build my-applications page (pages/student/applications.html)
// TODO: Build saved-clubs page (pages/student/saved.html)
