import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  BookOpen,
  Clock,
  Zap,
  Play,
  Gamepad2,
  X,
  Layers,
  ChevronRight,
  GraduationCap,
} from 'lucide-react';
import { ALL_GRADES, ALL_SUBJECTS, SYLLABUS_CHAPTERS } from '../syllabusData';
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
            return inTitle || inDesc || inSubject || inConcepts;
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
            <span>KG–10 Structured Curriculum</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Syllabus & Subject Explorer
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Browse official learning units, chapters, and topics. Select any topic to generate instant games or quizzes.
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

      {/* Grade Selector Tabs (KG to Grade 10) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Select Class / Grade Level:
          </span>
          <span className="text-xs text-indigo-600 font-semibold">Active: {selectedGrade}</span>
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

      {/* Subject Filter Pills */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Filter by Subject:
          </span>
          <span className="text-xs text-slate-400">
            {totalTopicsCount} topic{totalTopicsCount === 1 ? '' : 's'} found
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
          {ALL_SUBJECTS.map((sub) => (
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
            We couldn&apos;t find any topics for <strong>{selectedGrade}</strong> in{' '}
            <strong>{selectedSubject}</strong> with search &quot;{searchQuery}&quot;. Try resetting your filters to explore all available topics.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredChapters.map((chapter) => (
            <div key={chapter.id} className="space-y-4">
              {/* Chapter Header */}
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                <BookOpen className="w-4 h-4 text-indigo-600 shrink-0" />
                <h2 className="font-bold text-slate-900 text-base sm:text-lg">
                  {chapter.title}
                </h2>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 ml-auto">
                  {chapter.subject}
                </span>
              </div>

              {/* Topics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    </div>

                    {/* Bottom Actions Strip */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>~{topic.estimatedMinutes} mins</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            playSound('start');
                            onLaunchTopic(topic, 'speed');
                          }}
                          className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold flex items-center gap-1.5 transition border border-amber-200/70"
                          title="Play Speed Challenge"
                        >
                          <Gamepad2 className="w-3.5 h-3.5 text-amber-600" />
                          <span>Game</span>
                        </button>

                        <button
                          onClick={() => {
                            playSound('start');
                            onLaunchTopic(topic, 'quiz');
                          }}
                          className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-xs"
                          title="Take Interactive Quiz"
                        >
                          <Play className="w-3.5 h-3.5 fill-white" />
                          <span>Start Quiz</span>
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
