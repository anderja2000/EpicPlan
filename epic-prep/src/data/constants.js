// src/data/constants.js
export const ROLE_NAMES = {
  'software-engineer': 'Software Engineer',
  'project-manager': 'Project Manager'
};

export const DEFAULT_PROFILE_DATA = {
  'software-engineer': {
    name: 'Software Engineer Track',
    role: 'software-engineer',
    phase1: 0,
    phase2: 0,
    studyHours: 0,
    completedTasks: 0,
    totalTasks: 25,
    tasks: [
      { id: 1, text: 'Review data structures (Arrays, LinkedLists)', completed: false },
      { id: 2, text: 'Solve 2 LeetCode Easy problems', completed: false },
      { id: 3, text: 'Read Epic company culture page', completed: false },
      { id: 4, text: 'Study healthcare IT basics (30 min)', completed: false },
      { id: 5, text: 'Practice typing exercises', completed: false },
      { id: 6, text: 'Complete NeetCode Arrays section', completed: false },
      { id: 7, text: 'Study Epic assessment format', completed: false },
      { id: 8, text: 'Practice system design basics', completed: false },
      { id: 9, text: 'Mock coding interview practice', completed: false },
      { id: 10, text: 'Review Java/Python fundamentals', completed: false }
    ],
    achievements: [
      { id: 'first-study', title: 'First Study Session', description: 'Complete your first study session', unlocked: false },
      { id: 'week-complete', title: 'Week Warrior', description: 'Complete a full week of studying', unlocked: false },
      { id: 'cast-freedom', title: 'Cast Freedom', description: 'Cast removal milestone reached', unlocked: false },
      { id: 'phase-master', title: 'Phase Master', description: 'Complete Phase 1', unlocked: false },
      { id: 'coding-champion', title: 'Coding Champion', description: 'Solve 50 LeetCode problems', unlocked: false }
    ],
    studyStreak: 0,
    lastStudyDate: null,
    preferences: {
      theme: 'light',
      notifications: true,
      defaultTimerMinutes: 25
    }
  },
  'project-manager': {
    name: 'Project Manager Track',
    role: 'project-manager',
    phase1: 0,
    phase2: 0,
    studyHours: 0,
    completedTasks: 0,
    totalTasks: 22,
    tasks: [
      { id: 1, text: 'Review Agile methodology principles', completed: false },
      { id: 2, text: 'Practice STAR method examples', completed: false },
      { id: 3, text: 'Read healthcare industry trends', completed: false },
      { id: 4, text: 'Prepare stakeholder management case study', completed: false },
      { id: 5, text: 'Review Epic PM job requirements', completed: false },
      { id: 6, text: 'Study Scrum framework in detail', completed: false },
      { id: 7, text: 'Practice presentation skills', completed: false },
      { id: 8, text: 'Create portfolio of PM examples', completed: false }
    ],
    achievements: [
      { id: 'first-study', title: 'First Study Session', description: 'Complete your first study session', unlocked: false },
      { id: 'week-complete', title: 'Week Warrior', description: 'Complete a full week of studying', unlocked: false },
      { id: 'cast-freedom', title: 'Cast Freedom', description: 'Cast removal milestone reached', unlocked: false },
      { id: 'phase-master', title: 'Phase Master', description: 'Complete Phase 1', unlocked: false },
      { id: 'pm-expert', title: 'PM Expert', description: 'Complete 10 case studies', unlocked: false }
    ],
    studyStreak: 0,
    lastStudyDate: null,
    preferences: {
      theme: 'light',
      notifications: true,
      defaultTimerMinutes: 25
    }
  }
};

export const TIMELINE_PHASES = [
  {
    name: 'Foundation Building',
    startDate: '2025-09-15',
    endDate: '2025-11-10',
    duration: '8 weeks',
    studyHoursPerWeek: 8,
    totalHours: 64,
    description: 'Skill building while hand heals, low-pressure learning',
    softwareEngineerFocus: [
      'Software Engineering Fundamentals',
      'Data structures and algorithms theory',
      'Epic company research',
      'Healthcare IT basics',
      'Light coding practice when comfortable'
    ],
    projectManagerFocus: [
      'Project Management Concepts',
      'Agile and Scrum methodology',
      'Stakeholder management',
      'Healthcare industry knowledge',
      'Behavioral interview prep'
    ]
  },
  {
    name: 'Intensive Preparation',
    startDate: '2025-11-10',
    endDate: '2025-12-22',
    duration: '6 weeks',
    studyHoursPerWeek: 12,
    totalHours: 72,
    description: 'Mock interviews, assessment practice, full preparation',
    softwareEngineerFocus: [
      'LeetCode Practice (Easy/Medium problems)',
      'Epic-specific coding (4 problems similar to medium difficulty)',
      'System design basics',
      'Mock assessments (3-4 hour timed sessions)',
      'Healthcare application architecture'
    ],
    projectManagerFocus: [
      'Case study practice',
      'Healthcare project scenarios',
      'Behavioral interviews',
      'Presentation skills',
      'Epic PM-specific questions'
    ]
  }
];

export const MILESTONES = {
  castRemovalDate: '2025-09-29',
  applicationDate: '2025-12-22',
  phase1Start: '2025-09-15',
  phase1End: '2025-11-10',
  phase2Start: '2025-11-10',
  phase2End: '2025-12-22'
};

export const INTERVIEW_PROCESS = {
  softwareEngineer: [
    {
      step: "Application Review",
      duration: "1-2 days",
      description: "Initial resume and application screening"
    },
    {
      step: "Skills Assessment", 
      duration: "3-4 hours",
      description: "ProctorU monitored assessment",
      components: [
        "Math/Logic questions (10 questions)",
        "Proprietary language interpretation (20 questions)", 
        "Coding problems (4 LeetCode-style, Easy to Medium)"
      ]
    },
    {
      step: "Final Interview",
      duration: "4+ hours",
      components: [
        "Technical coding interview (45 min)",
        "System design case study (45 min)",
        "Behavioral interviews",
        "Company presentation"
      ]
    }
  ],
  projectManager: [
    {
      step: "Phone Screen",
      duration: "30 minutes", 
      description: "Initial conversation with recruiter"
    },
    {
      step: "Skills Assessment",
      duration: "2-3 hours",
      description: "Similar structure to SE, less coding focus"
    },
    {
      step: "Final Interview", 
      duration: "Multiple hours",
      components: [
        "Case study presentations",
        "Behavioral interviews", 
        "Panel discussions"
      ]
    }
  ]
};