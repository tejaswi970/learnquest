import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeLanding } from './components/HomeLanding';
import { DashboardView } from './components/DashboardView';
import { SyllabusExplorer } from './components/SyllabusExplorer';
import { GameGenerator } from './components/GameGenerator';
import { ActiveGameSession } from './components/ActiveGameSession';
import { QuizResultsModal } from './components/QuizResultsModal';
import { ProgressAnalyticsView } from './components/ProgressAnalyticsView';
import { ProfileModal } from './components/ProfileModal';
import { HelpModal } from './components/HelpModal';
import {
  DifficultyLevel,
  GradeLevel,
  Question,
  QuizResult,
  StudentProfile,
  Topic,
} from './types';
import {
  getStoredProfile,
  getStoredResults,
  saveQuizResult,
  saveStoredProfile,
} from './storageService';
import { generateRuleBasedQuestions } from './questionBank';
import { ALL_TOPICS } from './syllabusData';
import { getIsSoundEnabled, playSound, toggleSound } from './soundEffects';

export default function App() {
  const [profile, setProfile] = useState<StudentProfile>(getStoredProfile());
  const [results, setResults] = useState<QuizResult[]>(getStoredResults());
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(profile.grade || 'Grade 5');

  // Generator prefill topic
  const [generatorTopic, setGeneratorTopic] = useState<Topic | null>(null);

  // Active game session
  const [activeSession, setActiveSession] = useState<{
    topic: Topic;
    difficulty: DifficultyLevel;
    activityType: 'quiz' | 'speed' | 'matching';
    questions: Question[];
    source: 'ai' | 'rule_based';
  } | null>(null);

  // Quiz completion result modal
  const [completedResult, setCompletedResult] = useState<QuizResult | null>(null);

  // Modals
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);
  const [isSound, setIsSound] = useState<boolean>(getIsSoundEnabled());

  // AI Server Health check
  const [aiStatus, setAiStatus] = useState<{ enabled: boolean; text: string }>({
    enabled: false,
    text: 'Checking AI status...',
  });

  // Check health on mount
  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        if (data.aiEnabled) {
          setAiStatus({
            enabled: true,
            text: 'Gemini AI online & generating challenges',
          });
        } else {
          setAiStatus({
            enabled: false,
            text: 'Predefined verified question bank active (100% offline-ready)',
          });
        }
      })
      .catch(() => {
        setAiStatus({
          enabled: false,
          text: 'Predefined question bank ready (100% offline-ready)',
        });
      });
  }, []);

  // Listen for storage events for reactive updates
  useEffect(() => {
    const handleProfileUpdate = (e: any) => {
      if (e.detail) {
        setProfile(e.detail);
        setSelectedGrade(e.detail.grade);
      }
    };
    const handleResultsUpdate = (e: any) => {
      if (e.detail) {
        setResults(e.detail);
      }
    };

    window.addEventListener('learnquest-profile-updated', handleProfileUpdate);
    window.addEventListener('learnquest-results-updated', handleResultsUpdate);

    return () => {
      window.removeEventListener('learnquest-profile-updated', handleProfileUpdate);
      window.removeEventListener('learnquest-results-updated', handleResultsUpdate);
    };
  }, []);

  const handleToggleSound = () => {
    const next = toggleSound();
    setIsSound(next);
  };

  // Launch a topic with default questions
  const handleLaunchTopic = (topic: Topic, mode: 'quiz' | 'speed' | 'matching' = 'quiz') => {
    const questions = generateRuleBasedQuestions(
      topic.id,
      topic.title,
      topic.subject,
      topic.grade,
      topic.difficulty,
      4
    );

    setActiveSession({
      topic,
      difficulty: topic.difficulty,
      activityType: mode,
      questions,
      source: 'rule_based',
    });
  };

  // Completion of session
  const handleSessionComplete = (result: QuizResult) => {
    saveQuizResult(result);
    setActiveSession(null);
    setCompletedResult(result);
  };

  const handleSaveProfile = (updated: StudentProfile) => {
    saveStoredProfile(updated);
    setProfile(updated);
    setSelectedGrade(updated.grade);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-800 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setActiveSession(null);
          setCurrentTab(tab);
        }}
        profile={profile}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenHelp={() => setIsHelpModalOpen(true)}
        isSoundEnabled={isSound}
        onToggleSound={handleToggleSound}
        aiStatus={aiStatus}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {/* If there is an active game session running, render it */}
        {activeSession ? (
          <ActiveGameSession
            topic={activeSession.topic}
            difficulty={activeSession.difficulty}
            activityType={activeSession.activityType}
            questions={activeSession.questions}
            source={activeSession.source}
            onComplete={handleSessionComplete}
            onExit={() => setActiveSession(null)}
          />
        ) : (
          <>
            {currentTab === 'home' && (
              <HomeLanding
                profile={profile}
                onStartLearning={() => setCurrentTab('dashboard')}
                onExploreSyllabus={(grade) => {
                  if (grade) setSelectedGrade(grade);
                  setCurrentTab('learn');
                }}
                onLaunchGame={() => {
                  setGeneratorTopic(null);
                  setCurrentTab('games');
                }}
              />
            )}

            {currentTab === 'dashboard' && (
              <DashboardView
                profile={profile}
                results={results}
                onNavigateTab={(tab) => setCurrentTab(tab)}
                onLaunchTopic={handleLaunchTopic}
                onEditProfile={() => setIsProfileModalOpen(true)}
              />
            )}

            {currentTab === 'learn' && (
              <SyllabusExplorer
                selectedGrade={selectedGrade}
                onSelectGrade={setSelectedGrade}
                onLaunchTopic={(topic, mode) => {
                  handleLaunchTopic(topic, mode);
                }}
              />
            )}

            {currentTab === 'games' && (
              <GameGenerator
                initialTopic={generatorTopic}
                aiEnabled={aiStatus.enabled}
                onStartSession={(sessionData) => {
                  setActiveSession(sessionData);
                }}
              />
            )}

            {currentTab === 'progress' && (
              <ProgressAnalyticsView
                profile={profile}
                results={results}
                onLaunchTopic={handleLaunchTopic}
                onNavigateTab={(tab) => setCurrentTab(tab)}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-8 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="font-bold text-slate-800">LearnQuest AI</span>
            <span>•</span>
            <span>Team 5 — Gamified Learning for KG–10</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsHelpModalOpen(true)}
              className="hover:text-indigo-600 font-medium"
            >
              SRS Documentation
            </button>
            <span>•</span>
            <span>Version 1.0 (MVP)</span>
            <span>•</span>
            <button
              onClick={() => {
                playSound('click');
                setIsProfileModalOpen(true);
              }}
              className="hover:text-indigo-600 font-medium"
            >
              Student Profile
            </button>
          </div>
        </div>
      </footer>

      {/* Results Modal */}
      {completedResult && (
        <QuizResultsModal
          result={completedResult}
          onPlayAgain={() => {
            const topic =
              ALL_TOPICS.find((t) => t.id === completedResult.topicId) || ALL_TOPICS[0];
            setCompletedResult(null);
            handleLaunchTopic(topic);
          }}
          onLaunchNext={(nextTopic) => {
            setCompletedResult(null);
            handleLaunchTopic(nextTopic);
          }}
          onViewProgress={() => {
            setCompletedResult(null);
            setCurrentTab('progress');
          }}
          onClose={() => {
            setCompletedResult(null);
            setCurrentTab('dashboard');
          }}
        />
      )}

      {/* Profile Settings Modal */}
      {isProfileModalOpen && (
        <ProfileModal
          profile={profile}
          onSave={handleSaveProfile}
          onClose={() => setIsProfileModalOpen(false)}
        />
      )}

      {/* Help & System Specs Modal */}
      {isHelpModalOpen && <HelpModal onClose={() => setIsHelpModalOpen(false)} />}
    </div>
  );
}
