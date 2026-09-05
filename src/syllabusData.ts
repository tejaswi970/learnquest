import { Chapter, GradeLevel, SubjectType, Topic } from './types';

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
  'Computer Science',
  'Environmental Studies',
];

export const SYLLABUS_CHAPTERS: Chapter[] = [
  // KG
  {
    id: 'kg-math-1',
    title: 'Fun with Numbers & Shapes',
    subject: 'Mathematics',
    grade: 'KG',
    topics: [
      {
        id: 'kg-math-counting',
        title: 'Counting 1 to 10 with Animals',
        description: 'Practice counting cute animal friends from 1 to 10.',
        chapterTitle: 'Fun with Numbers & Shapes',
        subject: 'Mathematics',
        grade: 'KG',
        difficulty: 'Explorer',
        estimatedMinutes: 5,
        keyConcepts: ['Number recognition', 'Counting objects', 'Number ordering'],
      },
      {
        id: 'kg-math-shapes',
        title: 'Circles, Squares & Triangles',
        description: 'Explore primary 2D shapes found in everyday toys and rooms.',
        chapterTitle: 'Fun with Numbers & Shapes',
        subject: 'Mathematics',
        grade: 'KG',
        difficulty: 'Explorer',
        estimatedMinutes: 5,
        keyConcepts: ['Shape recognition', 'Sides & corners', 'Everyday patterns'],
      },
    ],
  },
  {
    id: 'kg-eng-1',
    title: 'Letters, Sounds & Phonics',
    subject: 'English',
    grade: 'KG',
    topics: [
      {
        id: 'kg-eng-alphabet',
        title: 'Alphabet Phonics A to Z',
        description: 'Associate beginning letter sounds with familiar everyday words.',
        chapterTitle: 'Letters, Sounds & Phonics',
        subject: 'English',
        grade: 'KG',
        difficulty: 'Explorer',
        estimatedMinutes: 6,
        keyConcepts: ['Phonemic awareness', 'Beginning letters', 'Sight words'],
      },
    ],
  },
  {
    id: 'kg-evs-1',
    title: 'My Wonderful World',
    subject: 'Environmental Studies',
    grade: 'KG',
    topics: [
      {
        id: 'kg-evs-senses',
        title: 'The Five Senses',
        description: 'Discover how we see, hear, smell, taste, and touch our surroundings.',
        chapterTitle: 'My Wonderful World',
        subject: 'Environmental Studies',
        grade: 'KG',
        difficulty: 'Explorer',
        estimatedMinutes: 5,
        keyConcepts: ['Sight, hearing, touch, taste, smell', 'Body parts', 'Observation'],
      },
    ],
  },

  // Grade 1
  {
    id: 'g1-math-1',
    title: 'Basic Addition & Subtraction',
    subject: 'Mathematics',
    grade: 'Grade 1',
    topics: [
      {
        id: 'g1-math-add',
        title: 'Single-Digit Addition Quests',
        description: 'Combine items together to solve fun fruit and toy puzzles.',
        chapterTitle: 'Basic Addition & Subtraction',
        subject: 'Mathematics',
        grade: 'Grade 1',
        difficulty: 'Explorer',
        estimatedMinutes: 8,
        keyConcepts: ['Number bonds', 'Adding zero', 'Sums up to 20'],
      },
      {
        id: 'g1-math-sub',
        title: 'Taking Away Subtraction Fun',
        description: 'Learn subtraction by finding how many objects remain.',
        chapterTitle: 'Basic Addition & Subtraction',
        subject: 'Mathematics',
        grade: 'Grade 1',
        difficulty: 'Explorer',
        estimatedMinutes: 8,
        keyConcepts: ['Subtraction basics', 'Difference', 'Word problems'],
      },
    ],
  },
  {
    id: 'g1-sci-1',
    title: 'Living Things Around Us',
    subject: 'Science',
    grade: 'Grade 1',
    topics: [
      {
        id: 'g1-sci-plants',
        title: 'Parts of a Plant',
        description: 'Explore roots, stems, leaves, flowers, and how seeds sprout.',
        chapterTitle: 'Living Things Around Us',
        subject: 'Science',
        grade: 'Grade 1',
        difficulty: 'Explorer',
        estimatedMinutes: 7,
        keyConcepts: ['Roots & stems', 'Leaves and sunlight', 'Plant growth'],
      },
    ],
  },

  // Grade 2
  {
    id: 'g2-math-1',
    title: 'Place Value & Measurement',
    subject: 'Mathematics',
    grade: 'Grade 2',
    topics: [
      {
        id: 'g2-math-placevalue',
        title: 'Tens and Ones Adventure',
        description: 'Master 2-digit numbers using tens rods and single units.',
        chapterTitle: 'Place Value & Measurement',
        subject: 'Mathematics',
        grade: 'Grade 2',
        difficulty: 'Explorer',
        estimatedMinutes: 8,
        keyConcepts: ['Place value', 'Expanded form', 'Comparing numbers'],
      },
      {
        id: 'g2-math-money',
        title: 'Coins and Smart Shopping',
        description: 'Count coins and cash to purchase quest items in the village store.',
        chapterTitle: 'Place Value & Measurement',
        subject: 'Mathematics',
        grade: 'Grade 2',
        difficulty: 'Challenger',
        estimatedMinutes: 8,
        keyConcepts: ['Coin denominations', 'Total value', 'Making change'],
      },
    ],
  },
  {
    id: 'g2-eng-1',
    title: 'Sentences & Story Sparks',
    subject: 'English',
    grade: 'Grade 2',
    topics: [
      {
        id: 'g2-eng-nounsverbs',
        title: 'Nouns & Action Verbs',
        description: 'Identify people, places, things, and colorful action words.',
        chapterTitle: 'Sentences & Story Sparks',
        subject: 'English',
        grade: 'Grade 2',
        difficulty: 'Explorer',
        estimatedMinutes: 7,
        keyConcepts: ['Common nouns', 'Action verbs', 'Sentence structure'],
      },
    ],
  },

  // Grade 3
  {
    id: 'g3-math-1',
    title: 'Multiplication & Division Foundations',
    subject: 'Mathematics',
    grade: 'Grade 3',
    topics: [
      {
        id: 'g3-math-times',
        title: 'Multiplication as Equal Groups',
        description: 'Understand arrays, repeated addition, and multiplication tables up to 10.',
        chapterTitle: 'Multiplication & Division Foundations',
        subject: 'Mathematics',
        grade: 'Grade 3',
        difficulty: 'Challenger',
        estimatedMinutes: 10,
        keyConcepts: ['Arrays', 'Repeated addition', 'Multiplication facts'],
      },
      {
        id: 'g3-math-fractions',
        title: 'Intro to Fractions (Halves & Quarters)',
        description: 'Slice pizzas, chocolate bars, and shapes into equal fraction parts.',
        chapterTitle: 'Multiplication & Division Foundations',
        subject: 'Mathematics',
        grade: 'Grade 3',
        difficulty: 'Challenger',
        estimatedMinutes: 9,
        keyConcepts: ['Numerator & denominator', 'Unit fractions', 'Equal shares'],
      },
    ],
  },
  {
    id: 'g3-cs-1',
    title: 'Introduction to Computers',
    subject: 'Computer Science',
    grade: 'Grade 3',
    topics: [
      {
        id: 'g3-cs-inputoutput',
        title: 'Hardware: Input & Output Devices',
        description: 'Sort keyboards, mice, monitors, speakers, and printer devices.',
        chapterTitle: 'Introduction to Computers',
        subject: 'Computer Science',
        grade: 'Grade 3',
        difficulty: 'Explorer',
        estimatedMinutes: 7,
        keyConcepts: ['Input devices', 'Output devices', 'CPU brain'],
      },
    ],
  },

  // Grade 4
  {
    id: 'g4-sci-1',
    title: 'Ecosystems & Animal Adaptations',
    subject: 'Science',
    grade: 'Grade 4',
    topics: [
      {
        id: 'g4-sci-foodchain',
        title: 'Food Chains & Energy Web',
        description: 'Trace energy from solar rays through producers, herbivores, and apex carnivores.',
        chapterTitle: 'Ecosystems & Animal Adaptations',
        subject: 'Science',
        grade: 'Grade 4',
        difficulty: 'Challenger',
        estimatedMinutes: 10,
        keyConcepts: ['Producers', 'Consumers', 'Decomposers', 'Energy transfer'],
      },
      {
        id: 'g4-sci-matter',
        title: 'States of Matter: Solids, Liquids & Gases',
        description: 'Discover melting, freezing, evaporation, and condensation cycles.',
        chapterTitle: 'Ecosystems & Animal Adaptations',
        subject: 'Science',
        grade: 'Grade 4',
        difficulty: 'Challenger',
        estimatedMinutes: 8,
        keyConcepts: ['Particle arrangement', 'Phase changes', 'Water cycle'],
      },
    ],
  },
  {
    id: 'g4-soc-1',
    title: 'Maps & Physical Geography',
    subject: 'Social Science',
    grade: 'Grade 4',
    topics: [
      {
        id: 'g4-soc-maps',
        title: 'Reading Compass, Legends & Scales',
        description: 'Navigate maps using cardinal directions and map keys.',
        chapterTitle: 'Maps & Physical Geography',
        subject: 'Social Science',
        grade: 'Grade 4',
        difficulty: 'Explorer',
        estimatedMinutes: 8,
        keyConcepts: ['Cardinal directions', 'Map symbols', 'Continents & oceans'],
      },
    ],
  },

  // Grade 5
  {
    id: 'g5-math-1',
    title: 'Decimals, Percentages & Area',
    subject: 'Mathematics',
    grade: 'Grade 5',
    topics: [
      {
        id: 'g5-math-decimals',
        title: 'Decimals Operations in Real Life',
        description: 'Add, subtract, and compare decimal numbers in sports and market scenarios.',
        chapterTitle: 'Decimals, Percentages & Area',
        subject: 'Mathematics',
        grade: 'Grade 5',
        difficulty: 'Challenger',
        estimatedMinutes: 10,
        keyConcepts: ['Tenths and hundredths', 'Decimal addition', 'Comparison'],
      },
      {
        id: 'g5-math-geometry',
        title: 'Perimeter and Area of Polygons',
        description: 'Calculate boundary perimeter and enclosed grid area of rectangles.',
        chapterTitle: 'Decimals, Percentages & Area',
        subject: 'Mathematics',
        grade: 'Grade 5',
        difficulty: 'Challenger',
        estimatedMinutes: 10,
        keyConcepts: ['Perimeter formula', 'Area formula', 'Square units'],
      },
    ],
  },
  {
    id: 'g5-cs-1',
    title: 'Algorithms & Sequencing',
    subject: 'Computer Science',
    grade: 'Grade 5',
    topics: [
      {
        id: 'g5-cs-logic',
        title: 'Step-by-Step Computational Thinking',
        description: 'Break problems down into loops, conditional statements, and precise commands.',
        chapterTitle: 'Algorithms & Sequencing',
        subject: 'Computer Science',
        grade: 'Grade 5',
        difficulty: 'Challenger',
        estimatedMinutes: 9,
        keyConcepts: ['Sequential steps', 'Looping concepts', 'Debugging mistakes'],
      },
    ],
  },

  // Grade 6
  {
    id: 'g6-sci-1',
    title: 'Light, Shadows & Reflections',
    subject: 'Science',
    grade: 'Grade 6',
    topics: [
      {
        id: 'g6-sci-light',
        title: 'Reflection, Opaque vs Transparent Objects',
        description: 'Investigate how light travels in straight lines and forms sharp shadows.',
        chapterTitle: 'Light, Shadows & Reflections',
        subject: 'Science',
        grade: 'Grade 6',
        difficulty: 'Challenger',
        estimatedMinutes: 10,
        keyConcepts: ['Transparent, translucent, opaque', 'Ray diagrams', 'Mirrors'],
      },
      {
        id: 'g6-sci-circuits',
        title: 'Electric Current and Simple Circuits',
        description: 'Connect switches, cells, bulbs, and conductors to power circuits.',
        chapterTitle: 'Light, Shadows & Reflections',
        subject: 'Science',
        grade: 'Grade 6',
        difficulty: 'Challenger',
        estimatedMinutes: 11,
        keyConcepts: ['Open vs closed circuit', 'Conductors & insulators', 'Switch mechanism'],
      },
    ],
  },
  {
    id: 'g6-math-1',
    title: 'Integers & Introduction to Algebra',
    subject: 'Mathematics',
    grade: 'Grade 6',
    topics: [
      {
        id: 'g6-math-integers',
        title: 'Positive & Negative Numbers on Number Line',
        description: 'Navigate altitudes, temperatures, and debts using directed numbers.',
        chapterTitle: 'Integers & Introduction to Algebra',
        subject: 'Mathematics',
        grade: 'Grade 6',
        difficulty: 'Challenger',
        estimatedMinutes: 11,
        keyConcepts: ['Negative integers', 'Absolute value', 'Integer addition'],
      },
    ],
  },

  // Grade 7
  {
    id: 'g7-sci-1',
    title: 'Heat Transfer, Acids & Bases',
    subject: 'Science',
    grade: 'Grade 7',
    topics: [
      {
        id: 'g7-sci-heat',
        title: 'Conduction, Convection & Radiation',
        description: 'Discover how thermal energy moves through solids, fluids, and space vacuum.',
        chapterTitle: 'Heat Transfer, Acids & Bases',
        subject: 'Science',
        grade: 'Grade 7',
        difficulty: 'Master',
        estimatedMinutes: 12,
        keyConcepts: ['Conduction', 'Convection currents', 'Infrared radiation', 'Thermometers'],
      },
      {
        id: 'g7-sci-chemistry',
        title: 'Acids, Bases and Natural Indicators',
        description: 'Test litmus, turmeric, and pH changes in chemical reactions.',
        chapterTitle: 'Heat Transfer, Acids & Bases',
        subject: 'Science',
        grade: 'Grade 7',
        difficulty: 'Challenger',
        estimatedMinutes: 10,
        keyConcepts: ['Litmus test', 'Neutralization', 'Everyday acids/bases'],
      },
    ],
  },
  {
    id: 'g7-soc-1',
    title: 'Medieval Kingdoms & World Civilizations',
    subject: 'Social Science',
    grade: 'Grade 7',
    topics: [
      {
        id: 'g7-soc-silkroad',
        title: 'Trade Routes, Silk Road & Cultural Exchange',
        description: 'Trace merchant caravans transporting spices, paper, silk, and ideas across continents.',
        chapterTitle: 'Medieval Kingdoms & World Civilizations',
        subject: 'Social Science',
        grade: 'Grade 7',
        difficulty: 'Challenger',
        estimatedMinutes: 10,
        keyConcepts: ['Silk Road', 'Cultural diffusion', 'Ancient currencies'],
      },
    ],
  },

  // Grade 8
  {
    id: 'g8-math-1',
    title: 'Linear Equations & Exponents',
    subject: 'Mathematics',
    grade: 'Grade 8',
    topics: [
      {
        id: 'g8-math-lineareq',
        title: 'Solving Linear Equations with One Variable',
        description: 'Balance equations using algebraic inverse operations to solve for unknown variables.',
        chapterTitle: 'Linear Equations & Exponents',
        subject: 'Mathematics',
        grade: 'Grade 8',
        difficulty: 'Master',
        estimatedMinutes: 12,
        keyConcepts: ['Variable isolation', 'Distributive property', 'Word problems'],
      },
      {
        id: 'g8-math-exponents',
        title: 'Powers and Laws of Exponents',
        description: 'Multiply and simplify exponential powers in scientific notation.',
        chapterTitle: 'Linear Equations & Exponents',
        subject: 'Mathematics',
        grade: 'Grade 8',
        difficulty: 'Challenger',
        estimatedMinutes: 11,
        keyConcepts: ['Product law', 'Quotient law', 'Negative exponents'],
      },
    ],
  },
  {
    id: 'g8-sci-1',
    title: 'Cell Structure and Microorganisms',
    subject: 'Science',
    grade: 'Grade 8',
    topics: [
      {
        id: 'g8-sci-cells',
        title: 'Plant vs Animal Cells & Organelles',
        description: 'Examine nucleus, mitochondria, cell wall, and chloroplasts under microscopy.',
        chapterTitle: 'Cell Structure and Microorganisms',
        subject: 'Science',
        grade: 'Grade 8',
        difficulty: 'Master',
        estimatedMinutes: 12,
        keyConcepts: ['Organelles', 'Mitochondria powerhouse', 'Cell wall difference'],
      },
    ],
  },

  // Grade 9
  {
    id: 'g9-sci-1',
    title: 'Motion, Forces & Gravitation',
    subject: 'Science',
    grade: 'Grade 9',
    topics: [
      {
        id: 'g9-sci-newton',
        title: "Newton's Laws of Motion & Momentum",
        description: 'Calculate velocity, acceleration, inertia, and action-reaction pairs.',
        chapterTitle: 'Motion, Forces & Gravitation',
        subject: 'Science',
        grade: 'Grade 9',
        difficulty: 'Master',
        estimatedMinutes: 14,
        keyConcepts: ['Inertia (1st law)', 'F=ma (2nd law)', 'Action-reaction (3rd law)'],
      },
      {
        id: 'g9-sci-atoms',
        title: 'Atoms, Molecules & Chemical Formulas',
        description: 'Explore atomic mass, valence electrons, ions, and molecular bonding.',
        chapterTitle: 'Motion, Forces & Gravitation',
        subject: 'Science',
        grade: 'Grade 9',
        difficulty: 'Master',
        estimatedMinutes: 13,
        keyConcepts: ['Atomic structure', 'Valency', 'Chemical compounds'],
      },
    ],
  },
  {
    id: 'g9-cs-1',
    title: 'Python Programming Basics',
    subject: 'Computer Science',
    grade: 'Grade 9',
    topics: [
      {
        id: 'g9-cs-python',
        title: 'Variables, Conditionals & Loops in Python',
        description: 'Write functional Python code blocks with while/for loops and if-else logic.',
        chapterTitle: 'Python Programming Basics',
        subject: 'Computer Science',
        grade: 'Grade 9',
        difficulty: 'Master',
        estimatedMinutes: 14,
        keyConcepts: ['Data types', 'If-else statements', 'For & while loops', 'Lists'],
      },
    ],
  },

  // Grade 10
  {
    id: 'g10-sci-1',
    title: 'Electricity, Magnetism & Life Processes',
    subject: 'Science',
    grade: 'Grade 10',
    topics: [
      {
        id: 'g10-sci-ohmslaw',
        title: "Ohm's Law, Resistance & Power in Circuits",
        description: 'Solve voltage, current, and series/parallel resistor network problems.',
        chapterTitle: 'Electricity, Magnetism & Life Processes',
        subject: 'Science',
        grade: 'Grade 10',
        difficulty: 'Master',
        estimatedMinutes: 15,
        keyConcepts: ["V = IR", "Resistors in series and parallel", "Joule's heating law"],
      },
      {
        id: 'g10-sci-genetics',
        title: 'Heredity, DNA & Mendel’s Experiments',
        description: 'Trace dominant vs recessive traits through Punnett squares and genotypes.',
        chapterTitle: 'Electricity, Magnetism & Life Processes',
        subject: 'Science',
        grade: 'Grade 10',
        difficulty: 'Master',
        estimatedMinutes: 14,
        keyConcepts: ['DNA & genes', 'Monohybrid cross', 'Dominant vs recessive alleles'],
      },
    ],
  },
  {
    id: 'g10-math-1',
    title: 'Quadratic Equations & Trigonometry',
    subject: 'Mathematics',
    grade: 'Grade 10',
    topics: [
      {
        id: 'g10-math-trig',
        title: 'Trigonometric Ratios & Practical Heights',
        description: 'Use sine, cosine, and tangent ratios to calculate tower heights and angles.',
        chapterTitle: 'Quadratic Equations & Trigonometry',
        subject: 'Mathematics',
        grade: 'Grade 10',
        difficulty: 'Master',
        estimatedMinutes: 15,
        keyConcepts: ['sin, cos, tan ratios', 'Angles of elevation & depression', 'Pythagorean identity'],
      },
    ],
  },
  {
    id: 'g10-cs-1',
    title: 'Web Technologies & Cybersecurity',
    subject: 'Computer Science',
    grade: 'Grade 10',
    topics: [
      {
        id: 'g10-cs-cybersecurity',
        title: 'Data Privacy, Encryption & Cyber Safety',
        description: 'Understand symmetric vs asymmetric encryption, phishing defense, and digital footprints.',
        chapterTitle: 'Web Technologies & Cybersecurity',
        subject: 'Computer Science',
        grade: 'Grade 10',
        difficulty: 'Master',
        estimatedMinutes: 12,
        keyConcepts: ['Encryption fundamentals', 'Phishing & malware prevention', 'Digital ethics'],
      },
    ],
  },
];

// Helper to get all topics flat
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
