import React, { useState, useEffect } from 'react';
import {
  Gamepad2,
  Sparkles,
  Zap,
  Clock,
  Layers,
  HelpCircle,
  Play,
  AlertCircle,
  Loader2,
  CheckCircle2,
  BrainCircuit,
  GraduationCap,
} from 'lucide-react';
import { ALL_GRADES, ALL_SUBJECTS, ALL_TOPICS, getTopicsByGradeAndSubject } from '../syllabusData';
import { DifficultyLevel, GradeLevel, Question, SubjectType, Topic } from '../types';
import { generateRuleBasedQuestions } from '../questionBank';
import { playSound } from '../soundEffects';

interface GameGeneratorProps {
  initialTopic?: Topic | null;
  onStartSession: (sessionData: {
    topic: Topic;
    difficulty: DifficultyLevel;
    activityType: 'quiz' | 'speed' | 'matching';
    questions: Question[];
    source: 'ai' | 'rule_based';
  }) => void;
  aiEnabled: boolean;
}

export const GameGenerator: React.FC<GameGeneratorProps> = ({
  initialTopic,
  onStartSession,
  aiEnabled,
}) => {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(initialTopic?.grade || 'Grade 5');
  const [selectedSubject, setSelectedSubject] = useState<SubjectType>(
    initialTopic?.subject || 'Mathematics'
  );
  const [selectedTopicId, setSelectedTopicId] = useState<string>(initialTopic?.id || '');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(
    initialTopic?.difficulty || 'Challenger'
  );
  const [activityType, setActivityType] = useState<'quiz' | 'speed' | 'matching'>('quiz');
  const [questionCount, setQuestionCount] = useState<number>(4);
  const [useAi, setUseAi] = useState<boolean>(aiEnabled);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [generationInfo, setGenerationInfo] = useState<string | null>(null);

  // Available topics for selected grade & subject
  const availableTopics = getTopicsByGradeAndSubject(selectedGrade, selectedSubject);

  // Update selected topic if current selection doesn't match available topics
  useEffect(() => {
    if (initialTopic && initialTopic.grade === selectedGrade && initialTopic.subject === selectedSubject) {
      setSelectedTopicId(initialTopic.id);
    } else if (availableTopics.length > 0) {
      if (!availableTopics.some((t) => t.id === selectedTopicId)) {
        setSelectedTopicId(availableTopics[0].id);
      }
    } else {
      setSelectedTopicId('');
    }
  }, [selectedGrade, selectedSubject, initialTopic]);

  const handleGenerate = async () => {
    playSound('click');
    setValidationError(null);

    const activeTopic = ALL_TOPICS.find((t) => t.id === selectedTopicId);
    if (!activeTopic) {
      setValidationError('Please select a valid syllabus topic to generate the activity.');
      return;
    }

    setIsLoading(true);
    setGenerationInfo(
      useAi
        ? 'Consulting Gemini AI curriculum engine for custom questions...'
        : 'Compiling syllabus questions and interactive cards from rule-based bank...'
    );

    try {
      let finalQuestions: Question[] = [];
      let source: 'ai' | 'rule_based' = 'rule_based';

      if (useAi) {
        try {
          const response = await fetch('/api/generate-ai-challenge', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              grade: selectedGrade,
              subject: selectedSubject,
              topic: activeTopic.title,
              difficulty,
              count: questionCount,
              activityType,
            }),
          });

          if (response.ok) {
            const result = await response.json();
            if (result.success && result.data && Array.isArray(result.data.questions) && result.data.questions.length > 0) {
              finalQuestions = result.data.questions.map((q: any, i: number) => ({
                id: `ai-${Date.now()}-${i}`,
                topicId: activeTopic.id,
                topicTitle: activeTopic.title,
                subject: selectedSubject,
                grade: selectedGrade,
                difficulty,
                type: q.type === 'true_false' ? 'true_false' : q.type === 'matching' ? 'matching' : 'mcq',
                question: q.question || 'Challenge Question',
                options: Array.isArray(q.options) && q.options.length > 0 ? q.options : ['True', 'False'],
                answer: q.answer || (q.options ? q.options[0] : 'True'),
                explanation: q.explanation || 'Great effort! Keep up the good work.',
                hint: q.hint || 'Think carefully about the foundational rules.',
                xpReward: Number(q.xpReward) || 25,
              }));
              source = 'ai';
            }
          }
        } catch (aiErr) {
          console.warn('AI call threw error, gracefully falling back to rule-based bank:', aiErr);
        }
      }

      // Fallback or default rule-based questions
      if (finalQuestions.length === 0) {
        finalQuestions = generateRuleBasedQuestions(
          activeTopic.id,
          activeTopic.title,
          activeTopic.subject,
          activeTopic.grade,
          difficulty,
          questionCount
        );
        source = 'rule_based';
      }

      // Validate question integrity
      const validated = finalQuestions.filter((q) => q.question && q.options && q.answer);
      if (validated.length === 0) {
        throw new Error('Could not formulate valid questions. Please try another topic.');
      }

      playSound('start');
      onStartSession({
        topic: activeTopic,
        difficulty,
        activityType,
        questions: validated,
        source,
      });
    } catch (err: any) {
      setValidationError(err?.message || 'An error occurred while generating the game. Please retry.');
    } finally {
      setIsLoading(false);
      setGenerationInfo(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold mb-2 border border-amber-200">
          <Gamepad2 className="w-3.5 h-3.5 text-amber-600" />
          <span>Feature 3: Personalized Game & Challenge Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Game & Challenge Generator
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Customize grade level, subject, learning topic, and game mode. Supports AI-assisted generation with a 100% reliable offline fallback bank.
        </p>
      </div>

      {/* Main Generator Form Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
        {/* Error Alert */}
        {validationError && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Generation Notice</p>
              <p className="text-xs text-rose-700 mt-0.5">{validationError}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Grade Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              <span>1. Target Class / Grade</span>
            </label>
            <select
              id="select-gen-grade"
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value as GradeLevel)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none"
            >
              {ALL_GRADES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* Subject Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>2. Subject Area</span>
            </label>
            <select
              id="select-gen-subject"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value as SubjectType)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none"
            >
              {ALL_SUBJECTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Syllabus Topic Selector */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-600" />
              <span>3. Syllabus Topic</span>
            </label>
            {availableTopics.length === 0 ? (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500">
                No syllabus topics listed under {selectedGrade} in {selectedSubject}. Please select another subject (e.g. Mathematics or Science).
              </div>
            ) : (
              <select
                id="select-gen-topic"
                value={selectedTopicId}
                onChange={(e) => setSelectedTopicId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none"
              >
                {availableTopics.map((top) => (
                  <option key={top.id} value={top.id}>
                    {top.title} ({top.chapterTitle})
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Game / Activity Mode */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Gamepad2 className="w-4 h-4 text-indigo-600" />
              <span>4. Activity Mode</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setActivityType('quiz')}
                className={`p-3 rounded-xl text-xs font-semibold text-center border transition ${
                  activityType === 'quiz'
                    ? 'bg-indigo-50 text-indigo-700 border-indigo-300 ring-2 ring-indigo-500/20 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold">Standard Quiz</div>
                <div className="text-[10px] text-slate-500 mt-0.5">MCQ & Hints</div>
              </button>

              <button
                type="button"
                onClick={() => setActivityType('speed')}
                className={`p-3 rounded-xl text-xs font-semibold text-center border transition ${
                  activityType === 'speed'
                    ? 'bg-amber-50 text-amber-800 border-amber-300 ring-2 ring-amber-500/20 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold">Speed Sprint</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Timer & Bonus</div>
              </button>

              <button
                type="button"
                onClick={() => setActivityType('matching')}
                className={`p-3 rounded-xl text-xs font-semibold text-center border transition ${
                  activityType === 'matching'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 ring-2 ring-emerald-500/20 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold">Card Matcher</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Memory Pairs</div>
              </button>
            </div>
          </div>

          {/* Difficulty Level */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>5. Challenge Level</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Explorer', 'Challenger', 'Master'] as DifficultyLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setDifficulty(lvl)}
                  className={`p-3 rounded-xl text-xs font-semibold text-center border transition ${
                    difficulty === lvl
                      ? 'bg-purple-50 text-purple-700 border-purple-300 ring-2 ring-purple-500/20 shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="font-bold">{lvl}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {lvl === 'Explorer' ? 'Foundations' : lvl === 'Challenger' ? 'Adaptive' : 'Advanced'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Question Count */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-500" />
              <span>6. Questions / Cards Count</span>
            </label>
            <div className="flex items-center gap-2">
              {[3, 4, 6, 8].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setQuestionCount(count)}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition ${
                    questionCount === count
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {count} Items
                </button>
              ))}
            </div>
          </div>

          {/* AI vs Rule-based switch */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <BrainCircuit className="w-4 h-4 text-indigo-600" />
              <span>7. Intelligence Engine</span>
            </label>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-800">
                  {useAi ? 'Gemini AI Generation' : 'Predefined Verified Question Bank'}
                </p>
                <p className="text-[11px] text-slate-500">
                  {useAi
                    ? 'AI crafts fresh, tailored questions on the fly'
                    : '100% reliable offline fallback bank'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setUseAi(!useAi)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
                  useAi
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-slate-700 border-slate-300'
                }`}
              >
                {useAi ? 'AI Active' : 'Offline Bank'}
              </button>
            </div>
          </div>
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center gap-3 animate-pulse">
            <Loader2 className="w-5 h-5 text-indigo-600 animate-spin shrink-0" />
            <span className="text-xs font-medium text-indigo-800">{generationInfo}</span>
          </div>
        )}

        {/* Start Button */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Selected: <strong>{selectedGrade}</strong> •{' '}
            <strong>{activityType === 'speed' ? 'Speed Attack' : activityType === 'matching' ? 'Card Matcher' : 'Quiz'}</strong> •{' '}
            <strong>{difficulty}</strong>
          </div>

          <button
            id="btn-launch-generated-challenge"
            type="button"
            disabled={isLoading || !selectedTopicId}
            onClick={handleGenerate}
            className={`px-6 py-3 rounded-xl font-bold text-sm shadow-md flex items-center gap-2 transition ${
              isLoading || !selectedTopicId
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20 hover:-translate-y-0.5'
            }`}
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Launch Challenge</span>
          </button>
        </div>
      </div>
    </div>
  );
};
