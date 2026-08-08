// ============================================================
// ClubSync — Applications Mock Data
// data/applications.js
//
// Mock application records. Replace with API in production.
// Represents applications submitted by students to clubs.
// ============================================================

const APP_STATUS = {
  PENDING:     'pending',
  SHORTLISTED: 'shortlisted',
  INTERVIEW:   'interview',
  ACCEPTED:    'accepted',
  REJECTED:    'rejected',
  WITHDRAWN:   'withdrawn'
};

const APPLICATIONS_DATA = [
  {
    id: 1,
    studentId: 1,
    studentName: 'Arjun Verma',
    clubId: 1,
    clubName: 'Google Developer Student Club',
    driveId: 101,
    submittedAt: '2026-08-05T10:30:00Z',
    status: APP_STATUS.SHORTLISTED,
    answers: {
      whyJoin: 'I want to build real-world projects and collaborate with Google mentors.',
      skills: 'Python, React, TensorFlow',
      year: '2'
    },
    interviewSlot: '2026-08-20T11:00:00Z',
    notes: 'Strong GitHub profile, good open source contributions.'
  },
  {
    id: 2,
    studentId: 1,
    studentName: 'Arjun Verma',
    clubId: 11,
    clubName: 'Machine Learning Guild',
    driveId: 102,
    submittedAt: '2026-08-06T14:00:00Z',
    status: APP_STATUS.PENDING,
    answers: {
      whyJoin: 'Passionate about deep learning research and Kaggle competitions.',
      skills: 'Python, PyTorch, Scikit-learn',
      year: '2'
    },
    interviewSlot: null,
    notes: ''
  },
  {
    id: 3,
    studentId: 2,
    studentName: 'Sneha Iyer',
    clubId: 6,
    clubName: 'Photography & Filmmaking Club',
    driveId: 103,
    submittedAt: '2026-08-04T09:15:00Z',
    status: APP_STATUS.ACCEPTED,
    answers: {
      whyJoin: 'Photography is my passion and I want to learn filmmaking.',
      skills: 'DSLR Photography, Adobe Lightroom, Premiere Pro',
      year: '3'
    },
    interviewSlot: '2026-08-12T3:00:00Z',
    notes: 'Excellent portfolio. Accepted for design team.'
  },
  {
    id: 4,
    studentId: 3,
    studentName: 'Rahul Gupta',
    clubId: 4,
    clubName: 'Football Club',
    driveId: 104,
    submittedAt: '2026-08-07T08:00:00Z',
    status: APP_STATUS.INTERVIEW,
    answers: {
      whyJoin: 'I played at state level in school and want to continue at college.',
      skills: 'Football (Striker), Fitness, Team Leadership',
      year: '1'
    },
    interviewSlot: '2026-08-21T7:00:00Z',
    notes: 'Trials scheduled on Aug 21.'
  },
  {
    id: 5,
    studentId: 4,
    studentName: 'Kavya Reddy',
    clubId: 5,
    clubName: 'Entrepreneurship Cell',
    driveId: 105,
    submittedAt: '2026-08-03T16:00:00Z',
    status: APP_STATUS.REJECTED,
    answers: {
      whyJoin: 'I want to launch my own startup and need mentorship.',
      skills: 'Business Development, Pitching, Finance',
      year: '2'
    },
    interviewSlot: '2026-08-10T2:00:00Z',
    notes: 'Decent interview but limited prior project experience. Reapply next cycle.'
  }
];
