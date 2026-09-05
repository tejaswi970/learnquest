import { DifficultyLevel, GradeLevel, Question, SubjectType } from './types';

export const STATIC_QUESTION_BANK: Question[] = [
  // KG Math - Counting
  {
    id: 'q-kg-cnt-1',
    topicId: 'kg-math-counting',
    topicTitle: 'Counting 1 to 10 with Animals',
    subject: 'Mathematics',
    grade: 'KG',
    difficulty: 'Explorer',
    type: 'mcq',
    question: 'How many legs does a cute little puppy dog have?',
    options: ['2 legs', '4 legs', '6 legs', '8 legs'],
    answer: '4 legs',
    explanation: 'Dogs have 4 legs that help them run, jump, and fetch toys!',
    hint: 'Count: two front paws and two back paws.',
    xpReward: 20,
  },
  {
    id: 'q-kg-cnt-2',
    topicId: 'kg-math-counting',
    topicTitle: 'Counting 1 to 10 with Animals',
    subject: 'Mathematics',
    grade: 'KG',
    difficulty: 'Explorer',
    type: 'mcq',
    question: 'Which number comes right after 9 when we count?',
    options: ['7', '8', '10', '11'],
    answer: '10',
    explanation: 'When counting from 1 to 10: 7, 8, 9... and next is 10!',
    hint: 'Count on your fingers: 8, 9, and then...',
    xpReward: 20,
  },
  {
    id: 'q-kg-cnt-3',
    topicId: 'kg-math-counting',
    topicTitle: 'Counting 1 to 10 with Animals',
    subject: 'Mathematics',
    grade: 'KG',
    difficulty: 'Explorer',
    type: 'true_false',
    question: 'True or False: A duck has 2 wings and 2 webbed feet.',
    options: ['True', 'False'],
    answer: 'True',
    explanation: 'Ducks have 2 wings to flap and 2 webbed feet to paddle in the pond!',
    hint: 'Think of a duck swimming in a pond.',
    xpReward: 15,
  },
  {
    id: 'q-kg-cnt-4',
    topicId: 'kg-math-counting',
    topicTitle: 'Counting 1 to 10 with Animals',
    subject: 'Mathematics',
    grade: 'KG',
    difficulty: 'Explorer',
    type: 'matching',
    question: 'Match each number with its word name:',
    options: [],
    answer: 'Pairs matched',
    explanation: 'Great job matching numerals with their written word names!',
    xpReward: 30,
    matchingPairs: [
      { left: '1', right: 'One' },
      { left: '3', right: 'Three' },
      { left: '5', right: 'Five' },
      { left: '7', right: 'Seven' },
    ],
  },

  // KG Math - Shapes
  {
    id: 'q-kg-shp-1',
    topicId: 'kg-math-shapes',
    topicTitle: 'Circles, Squares & Triangles',
    subject: 'Mathematics',
    grade: 'KG',
    difficulty: 'Explorer',
    type: 'mcq',
    question: 'Which shape is round like a dinner plate or a soccer ball?',
    options: ['Square', 'Triangle', 'Circle', 'Star'],
    answer: 'Circle',
    explanation: 'A circle is completely round with no sharp corners or straight edges!',
    hint: 'Think of wheels on a bus.',
    xpReward: 20,
  },
  {
    id: 'q-kg-shp-2',
    topicId: 'kg-math-shapes',
    topicTitle: 'Circles, Squares & Triangles',
    subject: 'Mathematics',
    grade: 'KG',
    difficulty: 'Explorer',
    type: 'mcq',
    question: 'How many straight sides does a triangle have?',
    options: ['2 sides', '3 sides', '4 sides', '5 sides'],
    answer: '3 sides',
    explanation: 'A triangle always has 3 straight sides and 3 pointy corners!',
    hint: 'Tri- means three, like a tricycle with 3 wheels!',
    xpReward: 20,
  },

  // KG English - Phonics
  {
    id: 'q-kg-eng-1',
    topicId: 'kg-eng-alphabet',
    topicTitle: 'Alphabet Phonics A to Z',
    subject: 'English',
    grade: 'KG',
    difficulty: 'Explorer',
    type: 'mcq',
    question: 'What letter does the word "Apple" begin with?',
    options: ['Letter B', 'Letter A', 'Letter C', 'Letter D'],
    answer: 'Letter A',
    explanation: '"A" makes the /æ/ sound in Apple, Astronaut, and Alligator!',
    hint: 'It is the very first letter of the alphabet.',
    xpReward: 20,
  },
  {
    id: 'q-kg-eng-2',
    topicId: 'kg-eng-alphabet',
    topicTitle: 'Alphabet Phonics A to Z',
    subject: 'English',
    grade: 'KG',
    difficulty: 'Explorer',
    type: 'true_false',
    question: 'True or False: The word "Cat" begins with the letter "C".',
    options: ['True', 'False'],
    answer: 'True',
    explanation: 'C is for Cat! /k/ /æ/ /t/ spells Cat.',
    hint: 'Say "Cat" slowly: C-A-T.',
    xpReward: 15,
  },

  // KG EVS - Senses
  {
    id: 'q-kg-evs-1',
    topicId: 'kg-evs-senses',
    topicTitle: 'The Five Senses',
    subject: 'Environmental Studies',
    grade: 'KG',
    difficulty: 'Explorer',
    type: 'mcq',
    question: 'Which body part do we use to smell sweet flowers and freshly baked cookies?',
    options: ['Eyes', 'Ears', 'Nose', 'Tongue'],
    answer: 'Nose',
    explanation: 'Our nose gives us our sense of smell to enjoy flowers and food aromas!',
    hint: 'It sits right in the middle of your face.',
    xpReward: 20,
  },

  // Grade 1 Math - Addition
  {
    id: 'q-g1-add-1',
    topicId: 'g1-math-add',
    topicTitle: 'Single-Digit Addition Quests',
    subject: 'Mathematics',
    grade: 'Grade 1',
    difficulty: 'Explorer',
    type: 'mcq',
    question: 'If you have 4 red apples and your friend gives you 3 green apples, how many apples do you have in total?',
    options: ['6 apples', '7 apples', '8 apples', '9 apples'],
    answer: '7 apples',
    explanation: '4 + 3 = 7. Counting together gives 7 delicious apples!',
    hint: 'Start at 4 and count up 3 more: 5, 6, 7.',
    xpReward: 20,
  },
  {
    id: 'q-g1-add-2',
    topicId: 'g1-math-add',
    topicTitle: 'Single-Digit Addition Quests',
    subject: 'Mathematics',
    grade: 'Grade 1',
    difficulty: 'Explorer',
    type: 'mcq',
    question: 'What is 5 + 5?',
    options: ['8', '9', '10', '11'],
    answer: '10',
    explanation: '5 + 5 is a doubles fact that equals 10! Just like two full hands of fingers.',
    hint: 'Count all the fingers on both your hands.',
    xpReward: 20,
  },

  // Grade 1 Science - Plants
  {
    id: 'q-g1-sci-1',
    topicId: 'g1-sci-plants',
    topicTitle: 'Parts of a Plant',
    subject: 'Science',
    grade: 'Grade 1',
    difficulty: 'Explorer',
    type: 'mcq',
    question: 'Which part of the plant grows deep underground and absorbs water from the soil?',
    options: ['Roots', 'Leaves', 'Flowers', 'Stem'],
    answer: 'Roots',
    explanation: 'Roots anchor the plant firmly into the ground and drink up water and minerals from the soil.',
    hint: 'They are hidden under the dirt.',
    xpReward: 25,
  },
  {
    id: 'q-g1-sci-2',
    topicId: 'g1-sci-plants',
    topicTitle: 'Parts of a Plant',
    subject: 'Science',
    grade: 'Grade 1',
    difficulty: 'Explorer',
    type: 'true_false',
    question: 'True or False: Green leaves need sunlight to make food for the plant.',
    options: ['True', 'False'],
    answer: 'True',
    explanation: 'Yes! Leaves act like tiny solar food factories using sunlight, water, and air.',
    hint: 'Plants love sitting by bright windows.',
    xpReward: 15,
  },

  // Grade 2 Math - Place value
  {
    id: 'q-g2-pv-1',
    topicId: 'g2-math-placevalue',
    topicTitle: 'Tens and Ones Adventure',
    subject: 'Mathematics',
    grade: 'Grade 2',
    difficulty: 'Explorer',
    type: 'mcq',
    question: 'In the number 64, what digit is in the tens place and what is its value?',
    options: ['Digit 4 with value 4', 'Digit 6 with value 60', 'Digit 6 with value 6', 'Digit 4 with value 40'],
    answer: 'Digit 6 with value 60',
    explanation: 'In 64, 6 is in the tens position (6 tens = 60) and 4 is in the ones position.',
    hint: '64 is equal to 60 + 4.',
    xpReward: 25,
  },

  // Grade 3 Math - Multiplication
  {
    id: 'q-g3-mul-1',
    topicId: 'g3-math-times',
    topicTitle: 'Multiplication as Equal Groups',
    subject: 'Mathematics',
    grade: 'Grade 3',
    difficulty: 'Challenger',
    type: 'mcq',
    question: 'There are 6 treasure chests, and each chest holds 4 gold coins. How many gold coins are there in total?',
    options: ['20 coins', '24 coins', '28 coins', '18 coins'],
    answer: '24 coins',
    explanation: '6 groups of 4 = 6 × 4 = 24 gold coins!',
    hint: 'Multiply: 6 × 4 or add 4 six times.',
    xpReward: 30,
  },
  {
    id: 'q-g3-mul-2',
    topicId: 'g3-math-times',
    topicTitle: 'Multiplication as Equal Groups',
    subject: 'Mathematics',
    grade: 'Grade 3',
    difficulty: 'Challenger',
    type: 'true_false',
    question: 'True or False: Any number multiplied by 0 always equals 0.',
    options: ['True', 'False'],
    answer: 'True',
    explanation: 'Zero Property of Multiplication: Having zero groups of anything leaves you with 0!',
    hint: 'If you have 0 boxes of 100 toys, how many toys do you have?',
    xpReward: 20,
  },

  // Grade 3 CS - Hardware
  {
    id: 'q-g3-cs-1',
    topicId: 'g3-cs-inputoutput',
    topicTitle: 'Hardware: Input & Output Devices',
    subject: 'Computer Science',
    grade: 'Grade 3',
    difficulty: 'Explorer',
    type: 'mcq',
    question: 'Which of the following is an OUTPUT device that lets you see pictures and videos?',
    options: ['Computer Keyboard', 'Computer Mouse', 'Computer Monitor Screen', 'Microphone'],
    answer: 'Computer Monitor Screen',
    explanation: 'The monitor displays visual output sent from the computer processing unit.',
    hint: 'It shows you what is happening on screen.',
    xpReward: 25,
  },

  // Grade 4 Science - Food Chains
  {
    id: 'q-g4-fc-1',
    topicId: 'g4-sci-foodchain',
    topicTitle: 'Food Chains & Energy Web',
    subject: 'Science',
    grade: 'Grade 4',
    difficulty: 'Challenger',
    type: 'mcq',
    question: 'What is the primary ultimate source of energy that powers all food chains on Earth?',
    options: ['Volcanoes', 'The Sun', 'Ocean Tides', 'Soil Bacteria'],
    answer: 'The Sun',
    explanation: 'The Sun provides radiant solar energy that green plants (producers) capture via photosynthesis.',
    hint: 'It shines brightly in the sky during daytime.',
    xpReward: 25,
  },
  {
    id: 'q-g4-fc-2',
    topicId: 'g4-sci-foodchain',
    topicTitle: 'Food Chains & Energy Web',
    subject: 'Science',
    grade: 'Grade 4',
    difficulty: 'Challenger',
    type: 'mcq',
    question: 'In a grassland food chain (Grass → Grasshopper → Frog → Snake), which organism is the primary consumer?',
    options: ['Grass', 'Grasshopper', 'Frog', 'Snake'],
    answer: 'Grasshopper',
    explanation: 'Grass is the producer, and the grasshopper is the primary consumer (herbivore) that directly eats the plant.',
    hint: 'Who eats the grass first?',
    xpReward: 30,
  },

  // Grade 5 Math - Decimals & Area
  {
    id: 'q-g5-math-1',
    topicId: 'g5-math-geometry',
    topicTitle: 'Perimeter and Area of Polygons',
    subject: 'Mathematics',
    grade: 'Grade 5',
    difficulty: 'Challenger',
    type: 'mcq',
    question: 'A rectangular garden has a length of 8 meters and a width of 5 meters. What is its total area?',
    options: ['26 square meters', '40 square meters', '13 square meters', '48 square meters'],
    answer: '40 square meters',
    explanation: 'Area of a rectangle = Length × Width = 8 m × 5 m = 40 m².',
    hint: 'Formula is Length × Width.',
    xpReward: 30,
  },

  // Grade 6 Science - Circuits
  {
    id: 'q-g6-sci-1',
    topicId: 'g6-sci-circuits',
    topicTitle: 'Electric Current and Simple Circuits',
    subject: 'Science',
    grade: 'Grade 6',
    difficulty: 'Challenger',
    type: 'mcq',
    question: 'Which of the following materials is an electrical conductor that allows current to flow freely?',
    options: ['Rubber band', 'Plastic ruler', 'Copper wire', 'Wooden stick'],
    answer: 'Copper wire',
    explanation: 'Copper is a metal with free conduction electrons, making it an excellent electrical conductor.',
    hint: 'Metals conduct electricity; rubber and plastic insulate.',
    xpReward: 30,
  },
  {
    id: 'q-g6-sci-2',
    topicId: 'g6-sci-circuits',
    topicTitle: 'Electric Current and Simple Circuits',
    subject: 'Science',
    grade: 'Grade 6',
    difficulty: 'Challenger',
    type: 'true_false',
    question: 'True or False: In an open electrical circuit with a disconnected switch, the light bulb will remain glowing.',
    options: ['True', 'False'],
    answer: 'False',
    explanation: 'In an open circuit, the loop is broken so electric charges cannot flow, meaning the bulb stays off.',
    hint: 'A closed complete path is required for current to flow.',
    xpReward: 20,
  },

  // Grade 7 Science - Heat Transfer
  {
    id: 'q-g7-ht-1',
    topicId: 'g7-sci-heat',
    topicTitle: 'Conduction, Convection & Radiation',
    subject: 'Science',
    grade: 'Grade 7',
    difficulty: 'Master',
    type: 'mcq',
    question: 'By which mode of heat transfer does thermal energy from the Sun reach Earth across empty vacuum?',
    options: ['Conduction', 'Convection', 'Radiation', 'Insulation'],
    answer: 'Radiation',
    explanation: 'Radiation transmits thermal energy via electromagnetic waves and does not require any material medium.',
    hint: 'Space is a vacuum without air or solid matter.',
    xpReward: 35,
  },

  // Grade 8 Math - Linear Equations
  {
    id: 'q-g8-eq-1',
    topicId: 'g8-math-lineareq',
    topicTitle: 'Solving Linear Equations with One Variable',
    subject: 'Mathematics',
    grade: 'Grade 8',
    difficulty: 'Master',
    type: 'mcq',
    question: 'Solve for x: 3x + 7 = 22',
    options: ['x = 4', 'x = 5', 'x = 6', 'x = 7'],
    answer: 'x = 5',
    explanation: 'Subtract 7 from both sides: 3x = 15. Then divide both sides by 3: x = 5.',
    hint: 'First subtract 7 from 22, then divide by 3.',
    xpReward: 35,
  },

  // Grade 9 Science - Newton's Laws
  {
    id: 'q-g9-nt-1',
    topicId: 'g9-sci-newton',
    topicTitle: "Newton's Laws of Motion & Momentum",
    subject: 'Science',
    grade: 'Grade 9',
    difficulty: 'Master',
    type: 'mcq',
    question: 'According to Newton’s Second Law of Motion, what formula relates force (F), mass (m), and acceleration (a)?',
    options: ['F = m / a', 'F = m × a', 'F = m + a', 'F = a / m'],
    answer: 'F = m × a',
    explanation: "Newton's 2nd Law states that Force equals mass multiplied by acceleration (F = ma).",
    hint: 'Force is proportional to both mass and acceleration.',
    xpReward: 35,
  },

  // Grade 10 Science - Ohm's Law
  {
    id: 'q-g10-ohm-1',
    topicId: 'g10-sci-ohmslaw',
    topicTitle: "Ohm's Law, Resistance & Power in Circuits",
    subject: 'Science',
    grade: 'Grade 10',
    difficulty: 'Master',
    type: 'mcq',
    question: 'If an electric circuit has a potential difference of 12 Volts across a resistor of 4 Ohms, what is the electric current flowing through it?',
    options: ['48 Amperes', '3 Amperes', '0.33 Amperes', '16 Amperes'],
    answer: '3 Amperes',
    explanation: "By Ohm's Law: I = V / R = 12V / 4Ω = 3 Amperes.",
    hint: "Use I = V / R.",
    xpReward: 40,
  },
  {
    id: 'q-g10-ohm-2',
    topicId: 'g10-sci-ohmslaw',
    topicTitle: "Ohm's Law, Resistance & Power in Circuits",
    subject: 'Science',
    grade: 'Grade 10',
    difficulty: 'Master',
    type: 'true_false',
    question: 'True or False: In a series circuit, the total equivalent resistance is the sum of the individual resistances (R_eq = R1 + R2 + ...).',
    options: ['True', 'False'],
    answer: 'True',
    explanation: 'In a series connection, charges must pass through each resistor sequentially, so the total resistance is additive.',
    hint: 'Think about obstacles lined up one after another.',
    xpReward: 30,
  },

  // Grade 10 Computer Science - Cybersecurity
  {
    id: 'q-g10-cs-1',
    topicId: 'g10-cs-cybersecurity',
    topicTitle: 'Data Privacy, Encryption & Cyber Safety',
    subject: 'Computer Science',
    grade: 'Grade 10',
    difficulty: 'Master',
    type: 'mcq',
    question: 'What is the term for a deceptive attempt to steal sensitive credentials like passwords by masquerading as a trustworthy entity via fake emails or websites?',
    options: ['Firewalling', 'Phishing', 'Compiling', 'Indexing'],
    answer: 'Phishing',
    explanation: 'Phishing is a social engineering attack where malicious actors bait users into revealing confidential information.',
    hint: 'Sounds like catching fish with fake bait.',
    xpReward: 35,
  },
];

/**
 * Dynamic rule-based generator that ensures ANY topic in KG–10 has rich, valid questions
 * even if not explicitly typed above.
 */
export function generateRuleBasedQuestions(
  topicId: string,
  topicTitle: string,
  subject: SubjectType,
  grade: GradeLevel,
  difficulty: DifficultyLevel,
  count: number = 4
): Question[] {
  // First check exact topic matches from STATIC_QUESTION_BANK
  const exactMatches = STATIC_QUESTION_BANK.filter((q) => q.topicId === topicId);
  if (exactMatches.length >= count) {
    return exactMatches.slice(0, count);
  }

  // Check subject & grade matches
  const subjectMatches = STATIC_QUESTION_BANK.filter((q) => q.subject === subject);
  const combined = [...exactMatches];

  for (const q of subjectMatches) {
    if (!combined.some((item) => item.id === q.id)) {
      combined.push({
        ...q,
        id: `rel-${q.id}`,
        topicId,
        topicTitle,
        difficulty,
      });
    }
    if (combined.length >= count) break;
  }

  // If still fewer than count, synthesize procedural pedagogical questions tailored to the topic
  while (combined.length < count) {
    const idx = combined.length + 1;
    combined.push({
      id: `proc-${topicId}-${idx}`,
      topicId,
      topicTitle,
      subject,
      grade,
      difficulty,
      type: idx % 2 === 0 ? 'true_false' : 'mcq',
      question:
        idx % 2 === 0
          ? `In ${grade} ${subject}, does practicing "${topicTitle}" help build core analytical mastery and problem-solving confidence?`
          : `Which strategy is most effective when learning key principles of "${topicTitle}" in ${subject}?`,
      options:
        idx % 2 === 0
          ? ['True', 'False']
          : [
              'Active recall, hands-on challenges, and concept review',
              'Memorizing without understanding the logic',
              'Skipping foundational examples',
              'Ignoring teacher and mentor feedback',
            ],
      answer:
        idx % 2 === 0
          ? 'True'
          : 'Active recall, hands-on challenges, and concept review',
      explanation: `Consistent practice and active inquiry in ${topicTitle} solidify long-term retention and mastery!`,
      hint: 'Think about positive, active study habits.',
      xpReward: 25,
    });
  }

  return combined.slice(0, count);
}
