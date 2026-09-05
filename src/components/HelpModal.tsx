import React from 'react';
import {
  HelpCircle,
  X,
  BookOpen,
  Sparkles,
  Gamepad2,
  Trophy,
  ShieldCheck,
  CheckCircle2,
  Code2,
} from 'lucide-react';

interface HelpModalProps {
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-indigo-200" />
            </div>
            <div>
              <h2 className="text-lg font-bold">LearnQuest — Help & System Guide</h2>
              <p className="text-xs text-indigo-200">System Documentation Version 1.0</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto text-slate-700 text-sm leading-relaxed">
          {/* About Project */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Project Overview</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              LearnQuest converts Kindergarten through Grade 10 syllabus topics into engaging challenges, speed quizzes, and memory matching puzzles. It is engineered to keep students motivated through instant scoring, step-by-step explanations, and real-time streak tracking.
            </p>
          </div>

          {/* Core Modules Breakdown */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900">How to Navigate the Platform</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-indigo-700 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  <span>Syllabus Explorer</span>
                </div>
                <p className="text-slate-600">
                  Filter chapters and topics from KG to Grade 10. Search by topic name or key concepts. Click any topic to jump straight into a quiz or challenge.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-amber-700 flex items-center gap-1.5">
                  <Gamepad2 className="w-4 h-4" />
                  <span>Game Generator</span>
                </div>
                <p className="text-slate-600">
                  Select game mode (Standard Quiz, Speed Attack, Card Matcher), adjust difficulty, and choose question counts. Works with or without an active AI key!
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-purple-700 flex items-center gap-1.5">
                  <Trophy className="w-4 h-4" />
                  <span>Progress & Analytics</span>
                </div>
                <p className="text-slate-600">
                  View your average score, subject mastery bars, mastered vs weak topics, and personalized recommendations for what to study next.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-emerald-700 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Student Profile</span>
                </div>
                <p className="text-slate-600">
                  Change active grade, update your name, choose fun avatars, set your favorite subjects, and customize learning styles.
                </p>
              </div>
            </div>
          </div>

          {/* Indian Curriculum & Progression Stages */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-amber-900">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Curriculum Progression: KG to 10th Class (CBSE, ICSE & State Boards)</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Standardized across Central and State syllabi (CBSE, ICSE, AP & Telangana State Boards) across 4 foundational progressions:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
              <div className="bg-white/80 p-2 rounded-lg border border-amber-200">
                <span className="font-bold text-slate-800">KG → 2:</span> Foundational skills, phonics, numbers, shapes, EVS, and activities.
              </div>
              <div className="bg-white/80 p-2 rounded-lg border border-amber-200">
                <span className="font-bold text-slate-800">3 → 5:</span> Core concepts, 4 operations, fractions, human body, ecosystems, and maps.
              </div>
              <div className="bg-white/80 p-2 rounded-lg border border-amber-200">
                <span className="font-bold text-slate-800">6 → 8:</span> Deeper concepts, algebra, physics, chemistry, biology, history, and civics.
              </div>
              <div className="bg-white/80 p-2 rounded-lg border border-amber-200">
                <span className="font-bold text-slate-800">9 → 10:</span> Advanced concepts & Board-Exam prep (trigonometry, mechanics, genetics, economics).
              </div>
            </div>
          </div>

          {/* Architecture & AI Fallback Notice (SRS Section 4) */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-indigo-900">
              <Code2 className="w-4 h-4 text-indigo-600" />
              <span>AI Layer & 100% Reliable Fallback Architecture</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              In accordance with system specifications, LearnQuest is completely decoupled from mandatory external paid APIs. When a Gemini API key is configured server-side, it crafts dynamic tailored questions. If offline or if no key is present, the verified rule-based question bank seamlessly generates questions so learning never halts.
            </p>
          </div>

          {/* Document Control Summary */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5 text-slate-500">
            <p><strong>Platform:</strong> LearnQuest</p>
            <p><strong>Curriculum:</strong> KG–10 (CBSE, ICSE & State Boards)</p>
            <p><strong>Target Environment:</strong> Modern Web Browsers, GitHub, Vercel, Cloud Run</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition"
          >
            Got it, Let&apos;s Learn!
          </button>
        </div>
      </div>
    </div>
  );
};
