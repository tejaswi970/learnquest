import React from 'react';
import {
  Sparkles,
  Gamepad2,
  Trophy,
  BookOpen,
  ArrowRight,
  CheckCircle,
  Zap,
  Target,
  ShieldCheck,
  BrainCircuit,
  GraduationCap,
  Star,
  Compass,
} from 'lucide-react';
import { ALL_GRADES, CURRICULUM_STAGES } from '../syllabusData';
import { GradeLevel, StudentProfile } from '../types';
import { playSound } from '../soundEffects';
import { InteractiveLogo } from './InteractiveLogo';

interface HomeLandingProps {
  onStartLearning: () => void;
  onExploreSyllabus: (grade?: GradeLevel) => void;
  onLaunchGame: () => void;
  profile: StudentProfile;
}

export const HomeLanding: React.FC<HomeLandingProps> = ({
  onStartLearning,
  onExploreSyllabus,
  onLaunchGame,
  profile,
}) => {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12 bg-gradient-to-b from-indigo-50/70 via-white to-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="flex flex-col items-center justify-center gap-3">
              <InteractiveLogo size="lg" onNavigateHome={onStartLearning} />
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100/80 border border-indigo-200 text-indigo-800 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Interactive Curriculum • CBSE, ICSE & State Boards</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Interactive Learning for{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-amber-500 bg-clip-text text-transparent">
                KG through Grade 10
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed">
              Transform syllabus topics into interactive quests, speed challenges, and personalized quizzes.
              Learn with immediate feedback, discover your strengths, and level up your knowledge.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
              <button
                id="btn-hero-start"
                onClick={() => {
                  playSound('start');
                  onStartLearning();
                }}
                className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base shadow-lg shadow-indigo-600/25 flex items-center gap-2 transition hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Enter Learning Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="btn-hero-syllabus"
                onClick={() => {
                  playSound('click');
                  onExploreSyllabus();
                }}
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base border border-slate-300/80 shadow-xs flex items-center gap-2 transition hover:border-slate-400"
              >
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>Browse Syllabus</span>
              </button>

              <button
                id="btn-hero-game"
                onClick={() => {
                  playSound('click');
                  onLaunchGame();
                }}
                className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold text-base shadow-md shadow-amber-500/20 flex items-center gap-2 transition hover:-translate-y-0.5"
              >
                <Gamepad2 className="w-4 h-4" />
                <span>Play Instant Game</span>
              </button>
            </div>

            {/* Quick Grade Selector Bar */}
            <div className="pt-6">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
                Jump directly to your grade curriculum:
              </p>
              <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-4xl mx-auto">
                {ALL_GRADES.map((g) => (
                  <button
                    key={g}
                    id={`btn-grade-pill-${g.replace(/\s+/g, '-').toLowerCase()}`}
                    onClick={() => {
                      playSound('click');
                      onExploreSyllabus(g);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
                      profile.grade === g
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Indian School Curriculum Stages Framework (KG to Class 10) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
            <Compass className="w-3.5 h-3.5" />
            <span>Structured Progression</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Indian School Curriculum (KG to 10th Class)
          </h2>
          <p className="text-sm text-slate-600">
            Calibrated for CBSE, ICSE, and State Boards (AP / Telangana) across four progressive learning stages.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CURRICULUM_STAGES.map((stage) => (
            <div
              key={stage.id}
              onClick={() => {
                playSound('click');
                onExploreSyllabus(stage.grades[0]);
              }}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-indigo-300 hover:shadow-md transition cursor-pointer flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100 uppercase tracking-wider">
                    {stage.grades.join(', ')}
                  </span>
                  <span className="text-xs text-indigo-600 font-semibold group-hover:translate-x-0.5 transition flex items-center gap-0.5">
                    Explore &rarr;
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition">
                  {stage.badge}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {stage.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                <span className="font-semibold text-slate-700">Key focus:</span> {stage.focusArea}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Problem & Solution Callout (SRS Section 1.2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          <div className="p-6 sm:p-8 rounded-2xl bg-rose-50/60 border border-rose-100 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-100 text-rose-800 text-xs font-bold">
                The Problem
              </div>
              <h3 className="text-xl font-bold text-slate-900">Rote Learning Causes Disengagement</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Standard textbooks deliver the same one-size-fits-all pages to every student regardless of individual pace,
                interests, or current weaknesses. Repetitive drill sheets stifle natural curiosity, and students rarely get
                immediate encouraging feedback on where to improve.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-rose-200/60 flex items-center gap-2 text-xs text-rose-700 font-medium">
              <span>Impact: Decreased retention and lack of motivation</span>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
                The LearnQuest Solution
              </div>
              <h3 className="text-xl font-bold text-slate-900">Curriculum Turned Into Adaptive Quests</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                LearnQuest turns official KG–10 topics into bite-sized interactive challenges. Students earn XP, maintain streaks,
                receive step-by-step teaching explanations, and get smart recommendations tailored to their strengths and growth areas.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-emerald-200/60 flex items-center gap-2 text-xs text-emerald-700 font-medium">
              <CheckCircle className="w-4 h-4" />
              <span>Result: Active recall, self-confidence, and continuous mastery</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Platform Core Capabilities</h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Structured Learning Architecture for KG–10 Students
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-4">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">1. Personalized Student Profile</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Tailors difficulty from Explorer to Master, remembers favorite subjects (Math, Science, English, CS),
              learning styles, and tracks individual streaks.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">2. Syllabus & Subject Explorer</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Full hierarchy from KG to Grade 10 across 6 subjects. Search keywords, filter chapters, view key concepts,
              and jump straight into learning activities.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">3. Game & Challenge Generator</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Generates MCQ, True/False sprints, speed challenges, and card pairing games. Uses Gemini AI when available,
              with 100% verified rule-based offline fallback.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">4. Interactive Quizzes & Feedback</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Immediate answer validation, encouraging sound effects, gentle guidance hints, and detailed explanations
              for every correct and incorrect answer.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">5. Progress & Mastery Analytics</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Comprehensive report card tracking average accuracy, subject mastery levels, identified weak topics,
              recent activity history, and next recommended quests.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">6. 100% Free & Open-Source MVP</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              No mandatory paid subscription or external database required. Persists progress in browser LocalStorage
              and deploys anywhere (GitHub + Vercel compatible).
            </p>
          </div>
        </div>
      </section>

      {/* Live Sample Preview Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 text-xs font-medium border border-indigo-400/30">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Ready to Quest?</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold">Experience interactive learning in seconds</h3>
              <p className="text-slate-300 text-sm max-w-xl">
                Choose a topic from Kindergarten addition to Grade 10 Ohm’s Law and launch an interactive quiz or challenge.
              </p>
            </div>
            <button
              onClick={() => {
                playSound('start');
                onStartLearning();
              }}
              className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-md transition whitespace-nowrap"
            >
              Start Free Today
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
