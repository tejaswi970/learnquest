import {
  QuizResult,
  StudentProfile,
  SubjectType,
  TopicMastery,
  Recommendation,
} from './types';
import { ALL_TOPICS } from './syllabusData';

const STORAGE_KEYS = {
  PROFILE: 'learnquest_profile_v1',
  RESULTS: 'learnquest_results_v1',
  SOUND: 'learnquest_sound_v1',
};

export const DEFAULT_PROFILE: StudentProfile = {
  id: 'student-demo-1',
  name: 'Alex Rivera',
  grade: 'Grade 5',
  preferredSubjects: ['Mathematics', 'Science', 'Computer Science'],
  difficulty: 'Challenger',
  interests: ['Space & Astronomy', 'Robotics & Tech', 'Puzzles & Logic'],
  learningStyle: 'Game-based & Fast',
  avatar: '🚀',
  totalXp: 380,
  streakDays: 4,
  lastActiveDate: new Date().toISOString(),
};

// Safe LocalStorage helpers with memory fallback
const memoryStore: Record<string, string> = {};

function safeGetItem(key: string): string | null {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(key);
    }
  } catch (e) {
    console.warn('LocalStorage not accessible, falling back to memory store:', e);
  }
  return memoryStore[key] || null;
}

function safeSetItem(key: string, value: string): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  } catch (e) {
    console.warn('LocalStorage write failed, using memory store:', e);
  }
  memoryStore[key] = value;
}

// Profile management
export function getStoredProfile(): StudentProfile {
  const raw = safeGetItem(STORAGE_KEYS.PROFILE);
  if (!raw) {
    safeSetItem(STORAGE_KEYS.PROFILE, JSON.stringify(DEFAULT_PROFILE));
    return DEFAULT_PROFILE;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveStoredProfile(profile: StudentProfile): void {
  safeSetItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('learnquest-profile-updated', { detail: profile }));
  }
}

// Results & Analytics
export function getStoredResults(): QuizResult[] {
  const raw = safeGetItem(STORAGE_KEYS.RESULTS);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveQuizResult(result: QuizResult): void {
  const current = getStoredResults();
  const updated = [result, ...current];
  safeSetItem(STORAGE_KEYS.RESULTS, JSON.stringify(updated));

  // Update profile XP and streak
  const profile = getStoredProfile();
  const newXp = (profile.totalXp || 0) + (result.xpEarned || 0);

  // Simple streak calculation
  const todayStr = new Date().toDateString();
  const lastActiveStr = profile.lastActiveDate ? new Date(profile.lastActiveDate).toDateString() : '';
  let newStreak = profile.streakDays || 1;
  if (lastActiveStr !== todayStr) {
    newStreak += 1;
  }

  saveStoredProfile({
    ...profile,
    totalXp: newXp,
    streakDays: newStreak,
    lastActiveDate: new Date().toISOString(),
  });

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('learnquest-results-updated', { detail: updated }));
  }
}

// Compute Topic Mastery
export function computeTopicMastery(results: QuizResult[]): TopicMastery[] {
  const map: Record<string, { attempts: number; scores: number[]; lastDate: string; title: string; subject: SubjectType; grade: any }> = {};

  results.forEach((r) => {
    if (!map[r.topicId]) {
      map[r.topicId] = {
        attempts: 0,
        scores: [],
        lastDate: r.timestamp,
        title: r.topicTitle,
        subject: r.subject,
        grade: r.grade,
      };
    }
    map[r.topicId].attempts += 1;
    map[r.topicId].scores.push(r.scorePercentage);
  });

  return Object.entries(map).map(([topicId, data]) => {
    const avg = Math.round(data.scores.reduce((a, b) => a + b, 0) / data.scores.length);
    const highest = Math.max(...data.scores);
    let status: 'Mastered' | 'In Progress' | 'Needs Practice' = 'In Progress';
    if (avg >= 80 && data.attempts >= 1) {
      status = 'Mastered';
    } else if (avg < 60) {
      status = 'Needs Practice';
    }

    return {
      topicId,
      topicTitle: data.title,
      subject: data.subject,
      grade: data.grade,
      attemptsCount: data.attempts,
      highestScore: highest,
      averageScore: avg,
      lastAttemptDate: data.lastDate,
      status,
    };
  });
}

// Generate smart recommendations based on real progress
export function generateRecommendations(results: QuizResult[], profile: StudentProfile): Recommendation[] {
  const mastery = computeTopicMastery(results);
  const weakTopics = mastery.filter((m) => m.status === 'Needs Practice');
  const inProgressTopics = mastery.filter((m) => m.status === 'In Progress');

  const recs: Recommendation[] = [];

  // 1. Weak topic boost
  if (weakTopics.length > 0) {
    const target = weakTopics[0];
    recs.push({
      id: `rec-weak-${target.topicId}`,
      title: `Power Up: ${target.topicTitle}`,
      topicId: target.topicId,
      topicTitle: target.topicTitle,
      subject: target.subject,
      grade: target.grade,
      reason: `Recent score was ${target.averageScore}%. A quick challenge will boost your mastery!`,
      recommendedDifficulty: 'Explorer',
      xpBonus: 60,
      activityType: 'quiz',
    });
  }

  // 2. In progress topic
  if (inProgressTopics.length > 0) {
    const target = inProgressTopics[0];
    recs.push({
      id: `rec-prog-${target.topicId}`,
      title: `Mastery Sprint: ${target.topicTitle}`,
      topicId: target.topicId,
      topicTitle: target.topicTitle,
      subject: target.subject,
      grade: target.grade,
      reason: `You're close to mastering this! Score 80%+ to unlock the Master badge.`,
      recommendedDifficulty: 'Challenger',
      xpBonus: 50,
      activityType: 'speed',
    });
  }

  // 3. Recommended topic from student's preferred subjects
  const availableTopics = ALL_TOPICS.filter((t) => t.grade === profile.grade && profile.preferredSubjects.includes(t.subject));
  const unattempted = availableTopics.filter((t) => !results.some((r) => r.topicId === t.id));
  const pick = unattempted[0] || availableTopics[0] || ALL_TOPICS[0];

  if (pick) {
    recs.push({
      id: `rec-next-${pick.id}`,
      title: `New Quest: ${pick.title}`,
      topicId: pick.id,
      topicTitle: pick.title,
      subject: pick.subject,
      grade: pick.grade,
      reason: `Recommended for your ${profile.grade} curriculum and preferred subject ${pick.subject}.`,
      recommendedDifficulty: pick.difficulty,
      xpBonus: 45,
      activityType: 'quiz',
    });
  }

  return recs;
}

// Seed realistic sample progress for demo
export function seedSampleDemoData(): void {
  const sampleResults: QuizResult[] = [
    {
      id: 'res-sample-1',
      topicId: 'g5-math-decimals',
      topicTitle: 'Decimals Operations in Real Life',
      subject: 'Mathematics',
      grade: 'Grade 5',
      difficulty: 'Challenger',
      activityType: 'Interactive Quiz',
      totalQuestions: 4,
      correctAnswers: 4,
      scorePercentage: 100,
      xpEarned: 100,
      timeSpentSeconds: 95,
      timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
      answers: [],
    },
    {
      id: 'res-sample-2',
      topicId: 'g5-math-geometry',
      topicTitle: 'Perimeter and Area of Polygons',
      subject: 'Mathematics',
      grade: 'Grade 5',
      difficulty: 'Challenger',
      activityType: 'Speed Challenge',
      totalQuestions: 4,
      correctAnswers: 2,
      scorePercentage: 50,
      xpEarned: 50,
      timeSpentSeconds: 70,
      timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
      answers: [],
    },
    {
      id: 'res-sample-3',
      topicId: 'g5-cs-logic',
      topicTitle: 'Step-by-Step Computational Thinking',
      subject: 'Computer Science',
      grade: 'Grade 5',
      difficulty: 'Challenger',
      activityType: 'Interactive Quiz',
      totalQuestions: 4,
      correctAnswers: 3,
      scorePercentage: 75,
      xpEarned: 80,
      timeSpentSeconds: 110,
      timestamp: new Date(Date.now() - 3600000 * 48).toISOString(),
      answers: [],
    },
  ];

  safeSetItem(STORAGE_KEYS.RESULTS, JSON.stringify(sampleResults));

  const sampleProfile: StudentProfile = {
    ...DEFAULT_PROFILE,
    totalXp: 540,
    streakDays: 5,
  };
  safeSetItem(STORAGE_KEYS.PROFILE, JSON.stringify(sampleProfile));

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('learnquest-results-updated', { detail: sampleResults }));
    window.dispatchEvent(new CustomEvent('learnquest-profile-updated', { detail: sampleProfile }));
  }
}

// Reset data
export function resetAllData(): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(STORAGE_KEYS.RESULTS);
      window.localStorage.removeItem(STORAGE_KEYS.PROFILE);
    }
  } catch (e) {
    console.error(e);
  }
  delete memoryStore[STORAGE_KEYS.RESULTS];
  delete memoryStore[STORAGE_KEYS.PROFILE];

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('learnquest-results-updated', { detail: [] }));
    window.dispatchEvent(new CustomEvent('learnquest-profile-updated', { detail: DEFAULT_PROFILE }));
  }
}
