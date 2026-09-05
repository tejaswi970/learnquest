import React from 'react';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Sparkles,
  Flame,
  Clock,
  Award,
  ChevronDown,
} from 'lucide-react';
import { QuizResult, Topic } from '../types';
import { ALL_TOPICS } from '../syllabusData';
import { playSound } from '../soundEffects';

interface QuizResultsModalProps {
  result: QuizResult;
  onPlayAgain: () => void;
  onLaunchNext: (topic: Topic) => void;
  onViewProgress: () => void;
  onClose: () => void;
}

export const QuizResultsModal: React.FC<QuizResultsModalProps> = ({
  result,
  onPlayAgain,
  onLaunchNext,
  onViewProgress,
  onClose,
}) => {
  const isMastered = result.scorePercentage >= 80;
  const isPassing = result.scorePercentage >= 60;

  // Find a smart next topic recommendation
  const currentTopicIndex = ALL_TOPICS.findIndex((t) => t.id === result.topicId);
  const nextTopic =
    currentTopicIndex !== -1 && currentTopicIndex + 1 < ALL_TOPICS.length
      ? ALL_TOPICS[currentTopicIndex + 1]
      : ALL_TOPICS[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden space-y-6 my-8">
        {/* Header Ribbon */}
        <div
          className={`p-6 sm:p-8 text-center text-white relative overflow-hidden ${
            isMastered
              ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700'
              : isPassing
              ? 'bg-gradient-to-r from-indigo-600 via-indigo-700 to-slate-800'
              : 'bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700'
          }`}
        >
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-3 text-white shadow-inner">
            <Trophy className="w-8 h-8" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {isMastered
              ? 'Outstanding Mastery!'
              : isPassing
              ? 'Great Quest Completion!'
              : 'Keep Practicing!'}
          </h2>

          <p className="text-sm opacity-90 mt-1 max-w-md mx-auto">
            You completed the &quot;{result.topicTitle}&quot; challenge in {result.activityType}.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <div className="px-4 py-1.5 rounded-xl bg-white/20 backdrop-blur-xs text-xs font-bold flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-300" />
              <span>Score: {result.scorePercentage}%</span>
            </div>
            <div className="px-4 py-1.5 rounded-xl bg-white/20 backdrop-blur-xs text-xs font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>+{result.xpEarned} XP Earned</span>
            </div>
            <div className="px-4 py-1.5 rounded-xl bg-white/20 backdrop-blur-xs text-xs font-bold flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{Math.round(result.timeSpentSeconds)}s</span>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown Section */}
        <div className="px-6 sm:px-8 space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Correct</p>
              <p className="text-xl font-bold text-emerald-600">
                {result.correctAnswers} / {result.totalQuestions}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Subject</p>
              <p className="text-sm font-bold text-slate-800 truncate">{result.subject}</p>
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</p>
              <p
                className={`text-sm font-bold ${
                  isMastered ? 'text-emerald-600' : isPassing ? 'text-indigo-600' : 'text-amber-600'
                }`}
              >
                {isMastered ? 'Mastered' : isPassing ? 'Passed' : 'Review Needed'}
              </p>
            </div>
          </div>

          {/* Answers Review List */}
          {result.answers && result.answers.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span>Detailed Question Review</span>
                <span className="text-xs font-normal text-slate-500">({result.answers.length} items)</span>
              </h4>

              <div className="max-h-56 overflow-y-auto space-y-2.5 pr-1">
                {result.answers.map((ans, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                      ans.isCorrect ? 'bg-emerald-50/60 border-emerald-200' : 'bg-rose-50/60 border-rose-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-slate-800">
                        Q{idx + 1}: {ans.questionText}
                      </p>
                      {ans.isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-600">
                      <span>
                        Your answer: <strong>{ans.selectedAnswer}</strong>
                      </span>
                      {!ans.isCorrect && (
                        <span className="text-emerald-700">
                          Correct: <strong>{ans.correctAnswer}</strong>
                        </span>
                      )}
                    </div>
                    {ans.explanation && (
                      <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                        💡 {ans.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next Recommended Activity Suggestion */}
          {nextTopic && (
            <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-center justify-between gap-4">
              <div className="min-w-0 space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                  Next Recommended Quest
                </span>
                <p className="font-bold text-sm text-slate-900 truncate">{nextTopic.title}</p>
                <p className="text-xs text-slate-500 truncate">
                  {nextTopic.subject} • {nextTopic.grade}
                </p>
              </div>
              <button
                onClick={() => {
                  playSound('start');
                  onLaunchNext(nextTopic);
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs shrink-0 flex items-center gap-1.5"
              >
                <span>Launch Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Action Buttons Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => {
              playSound('click');
              onPlayAgain();
            }}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-300 shadow-xs flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playSound('click');
                onViewProgress();
              }}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-300 shadow-xs"
            >
              View Analytics
            </button>
            <button
              onClick={() => {
                playSound('click');
                onClose();
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-xs"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
