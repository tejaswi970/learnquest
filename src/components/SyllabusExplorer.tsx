import React, { useState, useMemo } from 'react';
import {
  Search,
  BookOpen,
  Clock,
  Play,
  Gamepad2,
  X,
  Layers,
  GraduationCap,
  Sparkles,
  Award,
  CheckCircle,
  Compass,
} from 'lucide-react';
import {
  ALL_GRADES,
  ALL_SUBJECTS,
  SYLLABUS_CHAPTERS,
  CURRICULUM_STAGES,
  getCurriculumStageForGrade,
} from '../syllabusData';
import { GradeLevel, SubjectType, Topic } from '../types';
import { playSound } from '../soundEffects';

interface SyllabusExplorerProps {
  selectedGrade: GradeLevel;
  onSelectGrade: (grade: GradeLevel) => void;
  onLaunchTopic: (topic: Topic, mode: 'quiz' | 'speed' | 'matching') => void;
}

export const SyllabusExplorer: React.FC<SyllabusExplorerProps> = ({
  selectedGrade,
  onSelectGrade,
  onLaunchTopic,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectType | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Active progression stage
  const currentStage = useMemo(() => {
    return getCurriculumStageForGrade(selectedGrade);
  }, [selectedGrade]);

  // Subjects actually present in current grade
  const subjectsInCurrentGrade = useMemo(() => {
    const chaptersForGrade = SYLLABUS_CHAPTERS.filter((c) => c.grade === selectedGrade);
    const set = new Set<SubjectType>();
    chaptersForGrade.forEach((c) => set.add(c.subject));
    return ALL_SUBJECTS.filter((s) => set.has(s));
  }, [selectedGrade]);

  // Filter chapters and topics
  const filteredChapters = useMemo(() => {
    return SYLLABUS_CHAPTERS.filter((chap) => chap.grade === selectedGrade)
      .map((chap) => {
        const matchingTopics = chap.topics.filter((top) => {
          // Subject filter
          if (selectedSubject !== 'All' && top.subject !== selectedSubject) {
            return false;
          }
          // Search query filter
          if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            const inTitle = top.title.toLowerCase().includes(query);
            const inDesc = top.description.toLowerCase().includes(query);
            const inSubject = top.subject.toLowerCase().includes(query);
            const inConcepts = top.keyConcepts.some((c) => c.toLowerCase().includes(query));
            const inSubtopics = top.subtopics?.some((st) => st.toLowerCase().includes(query));
            return inTitle || inDesc || inSubject || inConcepts || Boolean(inSubtopics);
          }
          return true;
        });

        return {
          ...chap,
          topics: matchingTopics,
        };
      })
      .filter((chap) => chap.topics.length > 0);
  }, [selectedGrade, selectedSubject, searchQuery]);

  const totalTopicsCount = useMemo(() => {
    return filteredChapters.reduce((acc, chap) => acc + chap.topics.length, 0);
  }, [filteredChapters]);

  const handleResetFilters = () => {
    playSound('click');
    setSelectedSubject('All');
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>KG–10 Indian School Curriculum (CBSE, ICSE & State Boards)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Syllabus & Subject Explorer
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            Browse structured chapters, key concepts, and official topics from Kindergarten through 10th Class. Select any unit to launch interactive quizzes, speed sprints, or memory challenges.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            id="input-syllabus-search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topics, concepts, chapters..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Curriculum Stage Progression Selector */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-indigo-600" />
            <span>Curriculum Progression Stages:</span>
          </span>
          <span className="text-xs text-slate-500 hidden sm:inline">
            NEP 5+3+3+4 / CBSE, ICSE, AP & Telangana State Boards
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {CURRICULUM_STAGES.map((stage) => {
            const isCurrent = stage.id === currentStage.id;
            return (
              <button
                key={stage.id}
                onClick={() => {
                  playSound('click');
                  if (!stage.grades.includes(selectedGrade)) {
                    onSelectGrade(stage.grades[0]);
                  }
                }}
                className={`p-3.5 rounded-2xl text-left transition border ${
                  isCurrent
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-500/20'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                      isCurrent ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {stage.grades.join(', ')}
                  </span>
                  {isCurrent && <CheckCircle className="w-3.5 h-3.5 text-indigo-200 shrink-0" />}
                </div>
                <div className="mt-2 font-bold text-sm leading-tight">{stage.badge}</div>
                <div
                  className={`text-[11px] mt-1 line-clamp-2 ${
                    isCurrent ? 'text-indigo-100' : 'text-slate-500'
                  }`}
                >
                  {stage.focusArea}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grade Selector Tabs (KG to Grade 10) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Select Class / Grade Level:
          </span>
          <span className="text-xs text-indigo-600 font-semibold">
            Active: {selectedGrade} ({currentStage.badge})
          </span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {ALL_GRADES.map((grade) => (
            <button
              key={grade}
              id={`tab-grade-${grade.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => {
                playSound('click');
                onSelectGrade(grade);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                selectedGrade === grade
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              {grade}
            </button>
          ))}
        </div>
      </div>

      {/* Active Stage Detail Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50 via-slate-50 to-indigo-50/40 border border-indigo-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-indigo-900">{currentStage.label}</span>
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 font-medium">
              {currentStage.badge}
            </span>
          </div>
          <p className="text-xs text-slate-600">{currentStage.description}</p>
          <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-0.5">
            <span className="font-semibold text-slate-700">Curriculum focus:</span> {currentStage.focusArea}
          </div>
        </div>
        <div className="shrink-0 text-right md:border-l md:border-indigo-100 md:pl-4">
          <div className="text-[10px] uppercase font-bold text-slate-400">Board Alignment</div>
          <div className="text-xs font-semibold text-indigo-700 mt-0.5">CBSE • ICSE • State Boards</div>
          <div className="text-[11px] text-slate-500">AP / Telangana & State Syllabi</div>
        </div>
      </div>

      {/* Subject Filter Pills */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Filter by Subject:
          </span>
          <span className="text-xs text-slate-400">
            {totalTopicsCount} topic{totalTopicsCount === 1 ? '' : 's'} available
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              playSound('click');
              setSelectedSubject('All');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              selectedSubject === 'All'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            All Subjects
          </button>
          {subjectsInCurrentGrade.map((sub) => (
            <button
              key={sub}
              onClick={() => {
                playSound('click');
                setSelectedSubject(sub);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                selectedSubject === sub
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area: Chapters & Topic Cards */}
      {filteredChapters.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-3xl border border-dashed border-slate-300 p-8 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Layers className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No syllabus topics match your filter</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Try adjusting your search query or switch subjects to explore all units for {selectedGrade}.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredChapters.map((chapter) => (
            <div key={chapter.id} className="space-y-4">
              {/* Chapter Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-200 gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">{chapter.title}</h2>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>{chapter.subject}</span>
                      <span>•</span>
                      <span>{chapter.grade}</span>
                      {chapter.category && (
                        <>
                          <span>•</span>
                          <span className="font-semibold text-indigo-600">{chapter.category}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-slate-400">
                  {chapter.topics.length} topic{chapter.topics.length === 1 ? '' : 's'}
                </div>
              </div>

              {/* Topics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {chapter.topics.map((topic) => (
                  <div
                    key={topic.id}
                    className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md transition flex flex-col justify-between space-y-4 group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition">
                          {topic.title}
                        </h3>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 uppercase tracking-wide ${
                            topic.difficulty === 'Explorer'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : topic.difficulty === 'Challenger'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-purple-50 text-purple-700 border border-purple-200'
                          }`}
                        >
                          {topic.difficulty}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {topic.description}
                      </p>

                      {/* Subtopics / syllabus syllabus breakdown */}
                      {topic.subtopics && topic.subtopics.length > 0 && (
                        <div className="pt-1">
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                            Key Subtopics:
                          </div>
                          <ul className="space-y-0.5">
                            {topic.subtopics.slice(0, 3).map((st, i) => (
                              <li key={i} className="text-[11px] text-slate-600 flex items-start gap-1.5">
                                <span className="text-indigo-500 font-bold">•</span>
                                <span className="line-clamp-1">{st}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Key Concepts Tags */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {topic.keyConcepts.map((concept, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium"
                          >
                            {concept}
                          </span>
                        ))}
                      </div>

                      {topic.boardSuitability && (
                        <div className="text-[10px] text-slate-400 font-medium pt-1">
                          📋 {topic.boardSuitability}
                        </div>
                      )}
                    </div>

                    {/* Bottom Actions Strip */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>~{topic.estimatedMinutes}m</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            playSound('start');
                            onLaunchTopic(topic, 'matching');
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center gap-1 transition"
                          title="Memory Match Cards"
                        >
                          <Layers className="w-3.5 h-3.5 text-indigo-600" />
                          <span className="hidden sm:inline">Cards</span>
                        </button>

                        <button
                          onClick={() => {
                            playSound('start');
                            onLaunchTopic(topic, 'speed');
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold flex items-center gap-1 transition border border-amber-200/70"
                          title="Play Speed Sprint Challenge"
                        >
                          <Gamepad2 className="w-3.5 h-3.5 text-amber-600" />
                          <span>Game</span>
                        </button>

                        <button
                          onClick={() => {
                            playSound('start');
                            onLaunchTopic(topic, 'quiz');
                          }}
                          className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1 transition shadow-xs"
                          title="Take Interactive Quiz"
                        >
                          <Play className="w-3.5 h-3.5 fill-white" />
                          <span>Quiz</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
