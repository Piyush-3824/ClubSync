// ============================================================
// ClubSync — Events Data
// data/events.js
//
// Mock events dataset. Replace with API calls in production.
// Each event links to a club via clubId.
// ============================================================

const EVENTS_DATA = [
  {
    id: 1,
    clubId: 1,
    clubName: 'Google Developer Student Club',
    title: 'Web Dev Bootcamp — React & Next.js',
    description: 'A 2-day intensive workshop on modern React patterns and Next.js app router.',
    type: 'workshop',
    date: '2026-08-15',
    time: '10:00 AM',
    endTime: '4:00 PM',
    venue: 'CS Lab 101',
    capacity: 80,
    rsvpCount: 67,
    isFree: true,
    image: null,
    tags: ['React', 'Next.js', 'Web Dev']
  },
  {
    id: 2,
    clubId: 9,
    clubName: 'Cybersecurity Club',
    title: 'CTF: Capture The Flag — Fall Edition',
    description: 'Annual internal CTF competition. All skill levels welcome.',
    type: 'competition',
    date: '2026-08-22',
    time: '9:00 AM',
    endTime: '6:00 PM',
    venue: 'Online (Discord)',
    capacity: 200,
    rsvpCount: 145,
    isFree: true,
    image: null,
    tags: ['CTF', 'Hacking', 'Cybersecurity']
  },
  {
    id: 3,
    clubId: 5,
    clubName: 'Entrepreneurship Cell',
    title: 'Startup Weekend 2026',
    description: '54-hour startup hackathon. Form a team, build an MVP, pitch to investors.',
    type: 'competition',
    date: '2026-09-05',
    time: '6:00 PM',
    endTime: '2026-09-07 6:00 PM',
    venue: 'Innovation Hub',
    capacity: 150,
    rsvpCount: 112,
    isFree: false,
    registrationFee: '₹200',
    image: null,
    tags: ['Startup', 'Hackathon', 'Pitching']
  },
  {
    id: 4,
    clubId: 11,
    clubName: 'Machine Learning Guild',
    title: 'Kaggle Kickoff — Titanic to LLMs',
    description: 'Beginner-friendly Kaggle workshop. Learn feature engineering and model submission.',
    type: 'workshop',
    date: '2026-08-29',
    time: '2:00 PM',
    endTime: '5:00 PM',
    venue: 'Seminar Hall B',
    capacity: 60,
    rsvpCount: 54,
    isFree: true,
    image: null,
    tags: ['Kaggle', 'ML', 'Python']
  },
  {
    id: 5,
    clubId: 3,
    clubName: 'Dramatics & Theatre Society',
    title: 'Annual Play — "The Glass Menagerie"',
    description: 'Watch our award-winning cast perform Tennessee Williams\' classic.',
    type: 'social',
    date: '2026-09-20',
    time: '7:00 PM',
    endTime: '9:30 PM',
    venue: 'Main Auditorium',
    capacity: 500,
    rsvpCount: 380,
    isFree: false,
    registrationFee: '₹50',
    image: null,
    tags: ['Drama', 'Theatre', 'Performance']
  },
  {
    id: 6,
    clubId: 8,
    clubName: 'Debate & Public Speaking Club',
    title: 'MUN 2026 — Model United Nations',
    description: 'Two-day MUN conference with committees on AI Policy, Climate, and Global Conflicts.',
    type: 'seminar',
    date: '2026-09-12',
    time: '9:00 AM',
    endTime: '2026-09-13 6:00 PM',
    venue: 'Conference Centre',
    capacity: 200,
    rsvpCount: 178,
    isFree: false,
    registrationFee: '₹300',
    image: null,
    tags: ['MUN', 'Debate', 'Diplomacy']
  }
];
