import React, { useState } from 'react';
import {
  Trophy,
  TrendingUp,
  Target,
  Award,
  RotateCcw,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Flame,
  Trash2,
  Database,
  BarChart3,
  Clock,
} from 'lucide-react';
import { QuizResult, StudentProfile, SubjectType, Topic } from '../types';
import { computeTopicMastery, generateRecommendations, resetAllData, seedSampleDemoData } from '../storageService';
import { ALL_SUBJECTS, ALL_TOPICS } from '../syllabusData';
import { playSound } from '../soundEffects';

interface ProgressAnalyticsViewProps {
  profile: StudentProfile;
  results: QuizResult[];
  onLaunchTopic: (topic: Topic) => void;
  onNavigateTab: (tab: string) => void;
}

export const ProgressAnalyticsView: React.FC<ProgressAnalyticsViewProps> = ({
  profile,
  results,
  onLaunchTopic,
  onNavigateTab,
}) => {
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('All');
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const totalActivities = results.length;
  const overallAvg =
    totalActivities > 0
      ? Math.round(results.reduce((acc, r) => acc + r.scorePercentage, 0) / totalActivities)
      : 0;
  const totalQuestionsAnswered = results.reduce((acc, r) => acc + r.totalQuestions, 0);
  const totalCorrect = results.reduce((acc, r) => acc + r.correctAnswers, 0);
  const totalSeconds = results.reduce((acc, r) => acc + (r.timeSpentSeconds || 0), 0);

  // Topic mastery list
  const masteryList = computeTopicMastery(results);
  const masteredTopics = masteryList.filter((m) => m.status === 'Mastered');
  const weakTopics = masteryList.filter((m) => m.status === 'Needs Practice');
  const inProgressTopics = masteryList.filter((m) => m.status === 'In Progress');

  // Subject performance calculation
  const subjectScores = ALL_SUBJECTS.map((subject) => {
    const subjectResults = results.filter((r) => r.subject === subject);
    const count = subjectResults.length;
    const avg =
      count > 0
        ? Math.round(subjectResults.reduce((a, b) => a + b.scorePercentage, 0) / count)
        : null;
    return {
      subject,
      count,
      avg,
    };
  });

  // Recommendations
  const recommendations = generateRecommendations(results, profile);

  const handleSeedData = () => {
    seedSampleDemoData();
    playSound('correct');
  };

  const handleConfirmReset = () => {
    resetAllData();
    setIsResetConfirmOpen(false);
    playSound('click');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header with Demo Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold mb-2 border border-purple-200">
            <Trophy className="w-3.5 h-3.5" />
            <span>Feature 5: Learning Analytics & Mastery</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Progress Tracking & Analytics
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Real-time mastery scores, subject breakdowns, strength analysis, and customized quest recommendations.
          </p>
        </div>

        {/* Demo Controls */}
        <div className="flex items-center gap-2">
          <button
            id="btn-seed-sample-data"
            onClick={handleSeedData}
            className="px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-semibold flex items-center gap-1.5 transition"
            title="Populate realistic sample progress for demo"
          >
            <Database className="w-3.5 h-3.5" />
            <span>Seed Demo Data</span>
          </button>

          <button
            id="btn-open-reset-confirm"
            onClick={() => setIsResetConfirmOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 text-xs font-semibold flex items-center gap-1.5 transition"
            title="Reset progress stored in LocalStorage"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset Data</span>
          </button>
        </div>
      </div>

      {/* Confirmation Modal for Reset */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl space-y-4 border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Reset All Progress Data?</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              This will clear all recorded quiz results, streak statistics, and topic mastery history from browser LocalStorage.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 shadow-xs"
              >
                Yes, Reset All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* High-Level Overview Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Average Score</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">{overallAvg}%</p>
          <p className="text-[11px] text-slate-500">
            {totalCorrect} of {totalQuestionsAnswered} questions correct
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Activities Done</span>
            <CheckCircle2 className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">{totalActivities}</p>
          <p className="text-[11px] text-slate-500">Across {profile.grade} topics</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total XP</span>
            <Trophy className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-600">{profile.totalXp}</p>
          <p className="text-[11px] text-slate-500">Streak: {profile.streakDays} days active</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Practice Time</span>
            <Clock className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {Math.round(totalSeconds / 60)} min
          </p>
          <p className="text-[11px] text-slate-500">Recorded study sessions</p>
        </div>
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Subject Accuracy & Topic Mastery Breakdown */}
        <div className="lg:col-span-2 space-y-8">
          {/* Subject Performance Bars */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Subject-Wise Performance</h3>
                <p className="text-xs text-slate-500">Accuracy rate by academic subject</p>
              </div>
              <BarChart3 className="w-5 h-5 text-indigo-600" />
            </div>

            <div className="space-y-4">
              {subjectScores.map((s) => (
                <div key={s.subject} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-800">{s.subject}</span>
                    <span className="text-slate-500">
                      {s.avg !== null ? `${s.avg}% (${s.count} quests)` : 'No attempts yet'}
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        s.avg === null
                          ? 'bg-transparent'
                          : s.avg >= 80
                          ? 'bg-emerald-500'
                          : s.avg >= 60
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${s.avg || 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Topic Mastery Map */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Topic Mastery Status</h3>
                <p className="text-xs text-slate-500">
                  {masteredTopics.length} Mastered (80%+) • {inProgressTopics.length} In Progress •{' '}
                  {weakTopics.length} Needs Practice (&lt;60%)
                </p>
              </div>
            </div>

            {masteryList.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-3">
                <Target className="w-10 h-10 text-slate-400 mx-auto" />
                <p className="text-sm font-semibold text-slate-700">No topic mastery recorded yet</p>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Take a quiz or complete a learning game to evaluate your topic skills!
                </p>
                <button
                  onClick={handleSeedData}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 shadow-xs"
                >
                  Load Sample Progress
                </button>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {masteryList.map((item) => (
                  <div key={item.topicId} className="py-3.5 flex items-center justify-between gap-4">
                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-slate-900 truncate">
                          {item.topicTitle}
                        </span>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {item.subject}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        Attempts: {item.attemptsCount} • Highest: {item.highestScore}% • Average: {item.averageScore}%
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          item.status === 'Mastered'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : item.status === 'In Progress'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {item.status}
                      </span>

                      <button
                        onClick={() => {
                          const topic = ALL_TOPICS.find((t) => t.id === item.topicId) || ALL_TOPICS[0];
                          onLaunchTopic(topic);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100"
                        title="Practice again"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: Smart Recommendations & History */}
        <div className="space-y-6">
          {/* Personalized Recommendations */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h3 className="font-bold text-slate-900 text-sm">Recommended Quests</h3>
            </div>

            <div className="space-y-3">
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-slate-900 text-xs leading-snug">{rec.title}</h4>
                    <span className="text-[10px] font-bold text-amber-700 shrink-0">
                      +{rec.xpBonus} XP
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600">{rec.reason}</p>
                  <button
                    onClick={() => {
                      const topic = ALL_TOPICS.find((t) => t.id === rec.topicId) || ALL_TOPICS[0];
                      onLaunchTopic(topic);
                    }}
                    className="w-full py-1.5 rounded-lg bg-white hover:bg-indigo-600 hover:text-white border border-indigo-200 text-indigo-700 font-bold text-[11px] transition shadow-xs flex items-center justify-center gap-1"
                  >
                    <span>Start Quest</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Log Feed */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Activity History</h3>
            {results.length === 0 ? (
              <p className="text-xs text-slate-400">No activity history yet.</p>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {results.slice(0, 8).map((r) => (
                  <div key={r.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800 truncate max-w-[140px]">
                        {r.topicTitle}
                      </span>
                      <span
                        className={`font-bold ${
                          r.scorePercentage >= 80
                            ? 'text-emerald-600'
                            : r.scorePercentage >= 60
                            ? 'text-amber-600'
                            : 'text-rose-600'
                        }`}
                      >
                        {r.scorePercentage}%
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      {new Date(r.timestamp).toLocaleDateString()} • {r.activityType}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
