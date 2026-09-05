import React from 'react';
import {
  Trophy,
  Flame,
  CheckCircle2,
  Clock,
  ArrowRight,
  BookOpen,
  Gamepad2,
  Sparkles,
  TrendingUp,
  AlertCircle,
  Play,
  RotateCcw,
  Target,
} from 'lucide-react';
import { QuizResult, StudentProfile, Topic } from '../types';
import { computeTopicMastery, generateRecommendations, seedSampleDemoData } from '../storageService';
import { ALL_TOPICS } from '../syllabusData';
import { playSound } from '../soundEffects';

interface DashboardViewProps {
  profile: StudentProfile;
  results: QuizResult[];
  onNavigateTab: (tab: string) => void;
  onLaunchTopic: (topic: Topic, mode?: 'quiz' | 'speed') => void;
  onEditProfile: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  profile,
  results,
  onNavigateTab,
  onLaunchTopic,
  onEditProfile,
}) => {
  // Statistics calculations
  const totalActivities = results.length;
  const avgScore =
    totalActivities > 0
      ? Math.round(results.reduce((acc, r) => acc + r.scorePercentage, 0) / totalActivities)
      : 0;

  const topicMastery = computeTopicMastery(results);
  const masteredCount = topicMastery.filter((m) => m.status === 'Mastered').length;
  const weakTopics = topicMastery.filter((m) => m.status === 'Needs Practice');

  const recommendations = generateRecommendations(results, profile);
  const topRecommendation = recommendations[0];

  const handleLaunchRecommended = () => {
    if (!topRecommendation) return;
    const topic = ALL_TOPICS.find((t) => t.id === topRecommendation.topicId) || ALL_TOPICS[0];
    playSound('start');
    onLaunchTopic(topic, topRecommendation.activityType === 'speed' ? 'speed' : 'quiz');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Student Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-6 sm:p-8 shadow-lg">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl sm:text-4xl shadow-inner">
              {profile.avatar || '🚀'}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Welcome back, {profile.name}!
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-indigo-200 text-xs font-semibold">
                  {profile.grade}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold">
                  {profile.difficulty}
                </span>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
                Learning focus: {profile.preferredSubjects.join(', ')} • Learning style: {profile.learningStyle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              id="btn-dash-edit-profile"
              onClick={() => {
                playSound('click');
                onEditProfile();
              }}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-white transition"
            >
              Edit Profile
            </button>
            <button
              id="btn-dash-explore-syllabus"
              onClick={() => {
                playSound('click');
                onNavigateTab('learn');
              }}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-md transition flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Explore Syllabus</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Statistics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Activities */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Quests Completed</p>
            <p className="text-2xl font-bold text-slate-900">{totalActivities}</p>
          </div>
        </div>

        {/* Average Accuracy */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Average Score</p>
            <p className="text-2xl font-bold text-slate-900">{avgScore}%</p>
          </div>
        </div>

        {/* Daily Streak */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6 fill-orange-500 text-orange-500" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Daily Streak</p>
            <p className="text-2xl font-bold text-slate-900">{profile.streakDays} Days</p>
          </div>
        </div>

        {/* Mastered Topics */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Trophy className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Topics Mastered</p>
            <p className="text-2xl font-bold text-slate-900">{masteredCount}</p>
          </div>
        </div>
      </div>

      {/* Recommended Quest of the Day Card */}
      {topRecommendation && (
        <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-amber-500/10 via-indigo-50/50 to-white border border-amber-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Recommended Quest for You</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">{topRecommendation.title}</h3>
            <p className="text-sm text-slate-600 max-w-2xl">{topRecommendation.reason}</p>
            <div className="flex items-center gap-3 text-xs font-medium text-slate-500 pt-1">
              <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                {topRecommendation.subject}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                Difficulty: {topRecommendation.recommendedDifficulty}
              </span>
              <span className="text-amber-700 font-bold">+{topRecommendation.xpBonus} XP</span>
            </div>
          </div>

          <button
            id="btn-launch-recommended-quest"
            onClick={handleLaunchRecommended}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition shrink-0 hover:-translate-y-0.5"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Start This Quest</span>
          </button>
        </div>
      )}

      {/* Main Dashboard Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Recent Activity & Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Quick Actions</h2>
            <button
              onClick={() => onNavigateTab('games')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              <span>Custom Generator</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => {
                playSound('click');
                onNavigateTab('learn');
              }}
              className="p-4 rounded-xl bg-white hover:bg-indigo-50/50 border border-slate-200/90 text-left transition group shadow-xs"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 group-hover:scale-105 transition">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-slate-900 text-sm">Browse Chapters</h4>
              <p className="text-xs text-slate-500 mt-1">Explore syllabus by class and subject</p>
            </button>

            <button
              onClick={() => {
                playSound('click');
                onNavigateTab('games');
              }}
              className="p-4 rounded-xl bg-white hover:bg-amber-50/50 border border-slate-200/90 text-left transition group shadow-xs"
            >
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-105 transition">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-slate-900 text-sm">Create Challenge</h4>
              <p className="text-xs text-slate-500 mt-1">Generate speed test or pair matching</p>
            </button>

            <button
              onClick={() => {
                playSound('click');
                onNavigateTab('progress');
              }}
              className="p-4 rounded-xl bg-white hover:bg-emerald-50/50 border border-slate-200/90 text-left transition group shadow-xs"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-105 transition">
                <Trophy className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-slate-900 text-sm">Full Analytics</h4>
              <p className="text-xs text-slate-500 mt-1">View topic mastery and weak areas</p>
            </button>
          </div>

          {/* Recent Activity List */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">Recent Learning Activity</h3>
              {results.length > 0 && (
                <button
                  onClick={() => onNavigateTab('progress')}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
                >
                  View All ({results.length})
                </button>
              )}
            </div>

            {results.length === 0 ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Clock className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-slate-700">No learning activity recorded yet</p>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Complete your first syllabus quiz or launch an instant game to start tracking your progress!
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => onNavigateTab('learn')}
                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold shadow-xs hover:bg-indigo-700"
                  >
                    Start First Topic
                  </button>
                  <button
                    onClick={() => {
                      seedSampleDemoData();
                      playSound('correct');
                    }}
                    className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                  >
                    Seed Demo Data
                  </button>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {results.slice(0, 5).map((item) => (
                  <div key={item.id} className="py-3.5 flex items-center justify-between gap-4">
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-slate-900 truncate">
                          {item.topicTitle}
                        </span>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {item.subject}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        {item.activityType} • {new Date(item.timestamp).toLocaleDateString()} at{' '}
                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <span
                          className={`text-sm font-bold ${
                            item.scorePercentage >= 80
                              ? 'text-emerald-600'
                              : item.scorePercentage >= 60
                              ? 'text-amber-600'
                              : 'text-rose-600'
                          }`}
                        >
                          {item.scorePercentage}%
                        </span>
                        <p className="text-[10px] text-slate-400">+{item.xpEarned} XP</p>
                      </div>

                      <button
                        onClick={() => {
                          const topic = ALL_TOPICS.find((t) => t.id === item.topicId) || ALL_TOPICS[0];
                          onLaunchTopic(topic, 'quiz');
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100"
                        title="Replay Quest"
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

        {/* Right 1 Col: Strengths, Focus Areas & Curriculum Info */}
        <div className="space-y-6">
          {/* Areas for Improvement / Focus Areas */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-indigo-600" />
              <h3 className="font-bold text-slate-900 text-sm">Focus & Growth Areas</h3>
            </div>

            {weakTopics.length === 0 ? (
              <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs leading-relaxed">
                🎉 Fantastic work! You currently have no topics marked as &quot;Needs Practice&quot;. Keep taking quizzes to maintain your skills!
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-slate-500">
                  Topics where accuracy was under 60%. Practicing these will level up your overall score:
                </p>
                {weakTopics.slice(0, 3).map((w) => (
                  <div
                    key={w.topicId}
                    className="p-3 rounded-xl bg-rose-50/70 border border-rose-100 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-900 truncate">{w.topicTitle}</p>
                      <p className="text-[10px] text-rose-600">Avg score: {w.averageScore}%</p>
                    </div>
                    <button
                      onClick={() => {
                        const topic = ALL_TOPICS.find((t) => t.id === w.topicId) || ALL_TOPICS[0];
                        onLaunchTopic(topic, 'quiz');
                      }}
                      className="px-2.5 py-1 rounded-md bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-bold shrink-0"
                    >
                      Practice
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Curriculum Grade Snapshot */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Curriculum Level: {profile.grade}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Topics are aligned with the standard KG–10 educational requirements. You can change your active grade anytime in your Profile.
            </p>
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>Difficulty: <strong>{profile.difficulty}</strong></span>
              <button
                onClick={onEditProfile}
                className="text-indigo-600 hover:underline font-semibold text-xs"
              >
                Change
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
