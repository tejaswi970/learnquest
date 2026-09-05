import { CurriculumStage, GradeLevel } from '../types';

export interface StageInfo {
  id: string;
  name: CurriculumStage;
  grades: GradeLevel[];
  label: string;
  badge: string;
  description: string;
  focusArea: string;
  boardRelevance: string;
}

export const CURRICULUM_STAGES: StageInfo[] = [
  {
    id: 'stage-foundational',
    name: 'Basics & Foundational Skills',
    grades: ['KG', 'Grade 1', 'Grade 2'],
    label: 'KG → 2: Foundational Stage',
    badge: 'Basics & Foundational Skills',
    description: 'Foundational literacy, phonics, number sense, sensory discovery, and hands-on creative activities.',
    focusArea: 'Alphabets, phonics, numbers, shapes, addition/subtraction basics, family, body, and nature.',
    boardRelevance: 'Aligned with NEP foundational stage, CBSE, ICSE, & State Boards (AP / Telangana).',
  },
  {
    id: 'stage-core',
    name: 'Core Concepts',
    grades: ['Grade 3', 'Grade 4', 'Grade 5'],
    label: '3 → 5: Preparatory / Core Stage',
    badge: 'Core Concepts & Exploration',
    description: 'Developing structured operations, fractions, decimals, living systems, matter, community, and maps.',
    focusArea: 'Four basic operations, geometry, perimeter & area, human body, forces, ecosystems, and local history.',
    boardRelevance: 'Covers core learning objectives across CBSE, ICSE, and State Board frameworks.',
  },
  {
    id: 'stage-problem-solving',
    name: 'Deeper Concepts & Problem Solving',
    grades: ['Grade 6', 'Grade 7', 'Grade 8'],
    label: '6 → 8: Middle / Problem-Solving Stage',
    badge: 'Deeper Concepts & Problem Solving',
    description: 'Transitioning to analytical reasoning, algebra, physics, chemistry, biology, and historical eras.',
    focusArea: 'Integers, ratios, linear equations, cells, forces, elements, acids, ancient/medieval history, civics.',
    boardRelevance: 'Rigorous subject-specialized foundation for middle schools across India.',
  },
  {
    id: 'stage-board-prep',
    name: 'Advanced Concepts & Board-Exam Prep',
    grades: ['Grade 9', 'Grade 10'],
    label: '9 → 10: Secondary / Board Exam Stage',
    badge: 'Advanced Concepts & Board Prep',
    description: 'Comprehensive secondary school curriculum for board examinations with rigorous analytical depth.',
    focusArea: 'Trigonometry, quadratic equations, mechanics, electricity, chemistry reactions, genetics, modern world, economics.',
    boardRelevance: 'Directly geared for CBSE, ICSE, and State Board (AP / Telangana SSC) exam readiness.',
  },
];

export function getCurriculumStageForGrade(grade: GradeLevel): StageInfo {
  return CURRICULUM_STAGES.find((s) => s.grades.includes(grade)) || CURRICULUM_STAGES[0];
}
