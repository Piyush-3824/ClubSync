// ============================================================
// ClubSync — Student Portal Mock Data
// data/student-dashboard.js
//
// Member 2 — Student Portal
// All mock data for the student dashboard.
// Organized so it can be replaced by real API responses later.
// ============================================================

// ── Active Student (logged-in user simulation) ──
const CURRENT_STUDENT = {
  id: 1,
  name: 'Arjun Verma',
  email: 'arjun.verma@college.edu',
  phone: '+91 98765 43210',
  college: 'IIT Delhi',
  year: 2,
  branch: 'Computer Science',
  bio: 'Passionate about web dev & AI. Building cool things.',
  skills: ['Python', 'React', 'Machine Learning', 'Node.js', 'TensorFlow'],
  interests: ['technical', 'entrepreneurship'],
  profilePhoto: null,    // null = use initials avatar
  resume: null,          // null = not uploaded
  linkedIn: '',
  github: 'github.com/arjunverma',
  joinedAt: '2026-07-15T00:00:00Z',
  // Profile completion is calculated dynamically from fields above
};

// ── Profile Completion Fields (calculated in JS) ──
// Each field: key in CURRENT_STUDENT, label, weight
const PROFILE_FIELDS = [
  { key: 'name',         label: 'Full Name',     filled: !!CURRENT_STUDENT.name },
  { key: 'email',        label: 'Email',         filled: !!CURRENT_STUDENT.email },
  { key: 'phone',        label: 'Phone',         filled: !!CURRENT_STUDENT.phone },
  { key: 'college',      label: 'College',       filled: !!CURRENT_STUDENT.college },
  { key: 'bio',          label: 'Bio',           filled: !!CURRENT_STUDENT.bio },
  { key: 'skills',       label: 'Skills',        filled: CURRENT_STUDENT.skills.length > 0 },
  { key: 'profilePhoto', label: 'Profile Photo', filled: !!CURRENT_STUDENT.profilePhoto },
  { key: 'resume',       label: 'Resume',        filled: !!CURRENT_STUDENT.resume },
];

// ── Student Applications ──
const STUDENT_APPLICATIONS = [
  {
    id: 1,
    clubId: 1,
    clubName: 'Coding Club',
    clubEmoji: '💻',
    clubCategory: 'technical',
    position: 'Web Developer',
    appliedDate: '2026-08-08',
    status: 'under-review',    // 'applied' | 'under-review' | 'interview' | 'selected' | 'rejected'
    interviewDate: null,
    interviewTime: null,
    interviewMode: null,
  },
  {
    id: 2,
    clubId: 11,
    clubName: 'AI Club',
    clubEmoji: '🧠',
    clubCategory: 'technical',
    position: 'AI Research Intern',
    appliedDate: '2026-08-06',
    status: 'interview',
    interviewDate: '2026-08-12',
    interviewTime: '4:00 PM',
    interviewMode: 'Online',
  },
  {
    id: 3,
    clubId: 2,
    clubName: 'Robotics Club',
    clubEmoji: '🤖',
    clubCategory: 'technical',
    position: 'Robotics Developer',
    appliedDate: '2026-08-03',
    status: 'applied',
    interviewDate: null,
    interviewTime: null,
    interviewMode: null,
  },
  {
    id: 4,
    clubId: 5,
    clubName: 'E-Cell',
    clubEmoji: '💡',
    clubCategory: 'entrepreneurship',
    position: 'Core Member',
    appliedDate: '2026-07-28',
    status: 'selected',
    interviewDate: null,
    interviewTime: null,
    interviewMode: null,
  },
  {
    id: 5,
    clubId: 13,
    clubName: 'Quizzing Society',
    clubEmoji: '🧩',
    clubCategory: 'academic',
    position: 'General Member',
    appliedDate: '2026-07-20',
    status: 'rejected',
    interviewDate: null,
    interviewTime: null,
    interviewMode: null,
  },
];

// ── Saved Clubs ──
const STUDENT_SAVED_CLUBS = [
  {
    id: 1,
    name: 'Coding Club',
    emoji: '💻',
    category: 'technical',
    recruiting: true,
    deadline: 'Aug 25, 2026',
  },
  {
    id: 11,
    name: 'AI Club',
    emoji: '🧠',
    category: 'technical',
    recruiting: true,
    deadline: 'Aug 22, 2026',
  },
  {
    id: 6,
    name: 'Photography Club',
    emoji: '📸',
    category: 'arts',
    recruiting: true,
    deadline: 'Aug 20, 2026',
  },
];

// ── Notifications ──
const STUDENT_NOTIFICATIONS = [
  {
    id: 1,
    icon: '📋',
    message: 'Your Coding Club application is now under review.',
    time: '2 hours ago',
    date: '2026-08-10',
    read: false,
    type: 'application',
  },
  {
    id: 2,
    icon: '📅',
    message: 'AI Club has scheduled your interview for Aug 12 at 4:00 PM.',
    time: '5 hours ago',
    date: '2026-08-10',
    read: false,
    type: 'interview',
  },
  {
    id: 3,
    icon: '🎉',
    message: 'Congratulations! You have been selected for E-Cell.',
    time: '2 days ago',
    date: '2026-08-08',
    read: true,
    type: 'result',
  },
  {
    id: 4,
    icon: '🔔',
    message: 'New recruitment drive available in Robotics Club.',
    time: '3 days ago',
    date: '2026-08-07',
    read: true,
    type: 'general',
  },
  {
    id: 5,
    icon: '⚠️',
    message: 'Photography Club deadline is in 10 days — apply now!',
    time: '4 days ago',
    date: '2026-08-06',
    read: true,
    type: 'reminder',
  },
];

// ── Upcoming Interviews ──
const STUDENT_INTERVIEWS = [
  {
    id: 1,
    applicationId: 2,
    clubId: 11,
    clubName: 'AI Club',
    clubEmoji: '🧠',
    position: 'AI Research Intern',
    date: '12 August 2026',
    time: '4:00 PM',
    mode: 'Online Interview',
    link: 'https://meet.google.com/xyz-abc-def',  // placeholder
    notes: 'Prepare ML concepts and Python fundamentals.',
  },
];

// ── Quick Actions Config ──
const QUICK_ACTIONS = [
  {
    id: 'qa-explore',
    icon: '🔍',
    label: 'Explore Clubs',
    href: '../pages/explore.html',
    color: 'teal',
  },
  {
    id: 'qa-applications',
    icon: '📋',
    label: 'My Applications',
    href: null,   // placeholder — full page in later day
    color: 'purple',
    comingSoon: true,
  },
  {
    id: 'qa-saved',
    icon: '⭐',
    label: 'Saved Clubs',
    href: null,   // placeholder
    color: 'orange',
    comingSoon: true,
  },
  {
    id: 'qa-profile',
    icon: '👤',
    label: 'Edit Profile',
    href: null,   // placeholder
    color: 'pink',
    comingSoon: true,
  },
];
