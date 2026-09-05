import { Chapter, GradeLevel, SubjectType, Topic } from './types';
import { FOUNDATIONAL_CHAPTERS } from './syllabus/foundationalSyllabus';
import { CORE_CHAPTERS } from './syllabus/coreSyllabus';
import { MIDDLE_CHAPTERS } from './syllabus/middleSyllabus';
import { SECONDARY_CHAPTERS } from './syllabus/secondarySyllabus';
import { CURRICULUM_STAGES, getCurriculumStageForGrade, StageInfo } from './syllabus/stages';

export { CURRICULUM_STAGES, getCurriculumStageForGrade };
export type { StageInfo };

export const ALL_GRADES: GradeLevel[] = [
  'KG',
  'Grade 1',
  'Grade 2',
  'Grade 3',
  'Grade 4',
  'Grade 5',
  'Grade 6',
  'Grade 7',
  'Grade 8',
  'Grade 9',
  'Grade 10',
];

export const ALL_SUBJECTS: SubjectType[] = [
  'Mathematics',
  'Science',
  'English',
  'Social Science',
  'Environmental Studies',
  'Activities',
  'Computer Science',
];

// Unified curriculum chapters compiled from the official Kindergarten through Class 10 framework
export const SYLLABUS_CHAPTERS: Chapter[] = [
  ...FOUNDATIONAL_CHAPTERS,
  ...CORE_CHAPTERS,
  ...MIDDLE_CHAPTERS,
  ...SECONDARY_CHAPTERS,
];

// Flat list of all topics
export const ALL_TOPICS: Topic[] = SYLLABUS_CHAPTERS.flatMap((c) => c.topics);

export function getTopicsByGradeAndSubject(grade?: GradeLevel, subject?: SubjectType): Topic[] {
  return ALL_TOPICS.filter((t) => {
    if (grade && t.grade !== grade) return false;
    if (subject && t.subject !== subject) return false;
    return true;
  });
}

export function getTopicById(id: string): Topic | undefined {
  return ALL_TOPICS.find((t) => t.id === id);
}

export function getChaptersByGrade(grade: GradeLevel): Chapter[] {
  return SYLLABUS_CHAPTERS.filter((c) => c.grade === grade);
}
