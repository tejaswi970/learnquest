export type GradeLevel =
  | 'KG'
  | 'Grade 1'
  | 'Grade 2'
  | 'Grade 3'
  | 'Grade 4'
  | 'Grade 5'
  | 'Grade 6'
  | 'Grade 7'
  | 'Grade 8'
  | 'Grade 9'
  | 'Grade 10';

export type SubjectType =
  | 'Mathematics'
  | 'Science'
  | 'English'
  | 'Social Science'
  | 'Computer Science'
  | 'Environmental Studies';

export type DifficultyLevel = 'Explorer' | 'Challenger' | 'Master';

export type LearningStyle = 'Visual & Interactive' | 'Game-based & Fast' | 'Step-by-Step Analytical';

export interface StudentProfile {
  id: string;
  name: string;
  grade: GradeLevel;
  preferredSubjects: SubjectType[];
  difficulty: DifficultyLevel;
  interests: string[];
  learningStyle: LearningStyle;
  avatar: string;
  totalXp: number;
  streakDays: number;
  lastActiveDate: string;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  chapterTitle: string;
  subject: SubjectType;
  grade: GradeLevel;
  difficulty: DifficultyLevel;
  estimatedMinutes: number;
  keyConcepts: string[];
}

export interface Chapter {
  id: string;
  title: string;
  subject: SubjectType;
  grade: GradeLevel;
  topics: Topic[];
}

export type QuestionType = 'mcq' | 'true_false' | 'matching';

export interface MatchingPair {
  left: string;
  right: string;
}

export interface Question {
  id: string;
  topicId: string;
  topicTitle: string;
  subject: SubjectType;
  grade: GradeLevel;
  difficulty: DifficultyLevel;
  type: QuestionType;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  hint?: string;
  xpReward: number;
  matchingPairs?: MatchingPair[];
}

export interface AnswerRecord {
  questionId: string;
  questionText: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation: string;
}

export interface QuizResult {
  id: string;
  topicId: string;
  topicTitle: string;
  subject: SubjectType;
  grade: GradeLevel;
  difficulty: DifficultyLevel;
  activityType: string;
  totalQuestions: number;
  correctAnswers: number;
  scorePercentage: number;
  xpEarned: number;
  timeSpentSeconds: number;
  timestamp: string;
  answers: AnswerRecord[];
}

export interface TopicMastery {
  topicId: string;
  topicTitle: string;
  subject: SubjectType;
  grade: GradeLevel;
  attemptsCount: number;
  highestScore: number;
  averageScore: number;
  lastAttemptDate: string;
  status: 'Mastered' | 'In Progress' | 'Needs Practice';
}

export interface Recommendation {
  id: string;
  title: string;
  topicId: string;
  topicTitle: string;
  subject: SubjectType;
  grade: GradeLevel;
  reason: string;
  recommendedDifficulty: DifficultyLevel;
  xpBonus: number;
  activityType: 'quiz' | 'speed' | 'matching';
}
