import React, { useState, useEffect, useMemo } from 'react';
import {
  Clock,
  Flame,
  HelpCircle,
  Pause,
  Play,
  RotateCcw,
  X,
  CheckCircle2,
  XCircle,
  Trophy,
  Sparkles,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { AnswerRecord, DifficultyLevel, Question, QuizResult, Topic } from '../types';
import { playSound } from '../soundEffects';

interface ActiveGameSessionProps {
  topic: Topic;
  difficulty: DifficultyLevel;
  activityType: 'quiz' | 'speed' | 'matching';
  questions: Question[];
  source: 'ai' | 'rule_based';
  onComplete: (result: QuizResult) => void;
  onExit: () => void;
}

export const ActiveGameSession: React.FC<ActiveGameSessionProps> = ({
  topic,
  difficulty,
  activityType,
  questions,
  source,
  onComplete,
  onExit,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [answersSummary, setAnswersSummary] = useState<AnswerRecord[]>([]);

  // Timer state
  const [timeSpent, setTimeSpent] = useState(0);
  const [speedTimer, setSpeedTimer] = useState(15); // for speed challenge mode per question
  const [streak, setStreak] = useState(0);
  const [totalXpEarned, setTotalXpEarned] = useState(0);

  // For Card Matcher mode
  const [matchedPairsCount, setMatchedPairsCount] = useState(0);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [resolvedCards, setResolvedCards] = useState<string[]>([]);

  // Current Question
  const currentQ = questions[currentIndex] || questions[0];

  // Overall session timer
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Speed mode countdown timer
  useEffect(() => {
    if (activityType !== 'speed' || isPaused || isAnswerRevealed) return;
    if (speedTimer <= 0) {
      // Auto timeout for speed sprint
      handleTimeOut();
      return;
    }
    const timer = setInterval(() => {
      setSpeedTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [activityType, isPaused, isAnswerRevealed, speedTimer]);

  const handleTimeOut = () => {
    setIsAnswerRevealed(true);
    playSound('incorrect');
    setStreak(0);

    const record: AnswerRecord = {
      questionId: currentQ.id,
      questionText: currentQ.question,
      selectedAnswer: 'Time Out (No Answer)',
      correctAnswer: currentQ.answer,
      isCorrect: false,
      explanation: currentQ.explanation,
    };
    setAnswersSummary((prev) => [...prev, record]);
  };

  // Card Matcher initialization
  const matchingCards = useMemo(() => {
    if (activityType !== 'matching') return [];
    // Combine pairs from matching questions or synthesized from question options
    const pairs: { id: string; text: string; matchId: string; type: 'left' | 'right' }[] = [];

    questions.forEach((q, qIdx) => {
      if (q.matchingPairs && q.matchingPairs.length > 0) {
        q.matchingPairs.forEach((p, pIdx) => {
          const matchKey = `q${qIdx}-p${pIdx}`;
          pairs.push({ id: `l-${matchKey}`, text: p.left, matchId: matchKey, type: 'left' });
          pairs.push({ id: `r-${matchKey}`, text: p.right, matchId: matchKey, type: 'right' });
        });
      } else {
        // synthesize pair from question and answer
        const matchKey = `q${qIdx}`;
        pairs.push({ id: `l-${matchKey}`, text: q.question.substring(0, 45) + '...', matchId: matchKey, type: 'left' });
        pairs.push({ id: `r-${matchKey}`, text: q.answer, matchId: matchKey, type: 'right' });
      }
    });

    // Shuffle pairs
    return pairs.sort(() => Math.random() - 0.5);
  }, [activityType, questions]);

  const handleCardClick = (card: { id: string; text: string; matchId: string; type: 'left' | 'right' }) => {
    if (resolvedCards.includes(card.id) || selectedCardId === card.id) return;
    playSound('click');

    if (!selectedCardId) {
      setSelectedCardId(card.id);
    } else {
      const firstCard = matchingCards.find((c) => c.id === selectedCardId);
      if (firstCard && firstCard.matchId === card.matchId && firstCard.id !== card.id) {
        // Correct Match!
        playSound('correct');
        setResolvedCards((prev) => [...prev, firstCard.id, card.id]);
        setSelectedCardId(null);
        setMatchedPairsCount((prev) => prev + 1);
        setTotalXpEarned((prev) => prev + 30);
        setStreak((prev) => prev + 1);

        // Check if all cards matched
        if (resolvedCards.length + 2 >= matchingCards.length) {
          finishMatchingGame(matchedPairsCount + 1);
        }
      } else {
        // Mismatch
        playSound('incorrect');
        setStreak(0);
        setTimeout(() => {
          setSelectedCardId(null);
        }, 800);
      }
    }
  };

  const finishMatchingGame = (totalMatched: number) => {
    playSound('victory');
    const result: QuizResult = {
      id: `res-${Date.now()}`,
      topicId: topic.id,
      topicTitle: topic.title,
      subject: topic.subject,
      grade: topic.grade,
      difficulty,
      activityType: 'Card Matcher',
      totalQuestions: matchingCards.length / 2,
      correctAnswers: totalMatched,
      scorePercentage: 100,
      xpEarned: totalXpEarned + 50,
      timeSpentSeconds: timeSpent,
      timestamp: new Date().toISOString(),
      answers: [],
    };
    onComplete(result);
  };

  // Standard / Speed Question answer handler
  const handleSelectAnswer = (option: string) => {
    if (isAnswerRevealed) return;
    setSelectedOption(option);
    setIsAnswerRevealed(true);

    const isCorrect = option.trim().toLowerCase() === currentQ.answer.trim().toLowerCase();

    if (isCorrect) {
      playSound('correct');
      const bonusMultiplier = streak >= 2 ? 1.5 : 1;
      const gained = Math.round(currentQ.xpReward * bonusMultiplier);
      setTotalXpEarned((prev) => prev + gained);
      setStreak((prev) => prev + 1);
    } else {
      playSound('incorrect');
      setStreak(0);
    }

    const record: AnswerRecord = {
      questionId: currentQ.id,
      questionText: currentQ.question,
      selectedAnswer: option,
      correctAnswer: currentQ.answer,
      isCorrect,
      explanation: currentQ.explanation,
    };
    setAnswersSummary((prev) => [...prev, record]);
  };

  const handleNextQuestion = () => {
    playSound('click');
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerRevealed(false);
      setShowHint(false);
      setSpeedTimer(15);
    } else {
      // Finished all questions!
      playSound('victory');
      const totalCorrect = [...answersSummary].filter((a) => a.isCorrect).length;
      const scorePct = Math.round((totalCorrect / questions.length) * 100);

      const result: QuizResult = {
        id: `res-${Date.now()}`,
        topicId: topic.id,
        topicTitle: topic.title,
        subject: topic.subject,
        grade: topic.grade,
        difficulty,
        activityType:
          activityType === 'speed'
            ? 'Speed Sprint'
            : activityType === 'matching'
            ? 'Card Matcher'
            : 'Interactive Quiz',
        totalQuestions: questions.length,
        correctAnswers: totalCorrect,
        scorePercentage: scorePct,
        xpEarned: totalXpEarned,
        timeSpentSeconds: timeSpent,
        timestamp: new Date().toISOString(),
        answers: answersSummary,
      };
      onComplete(result);
    }
  };

  const handleRestart = () => {
    playSound('start');
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    setShowHint(false);
    setAnswersSummary([]);
    setTimeSpent(0);
    setSpeedTimer(15);
    setStreak(0);
    setTotalXpEarned(0);
    setResolvedCards([]);
    setSelectedCardId(null);
    setMatchedPairsCount(0);
    setIsPaused(false);
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins}:${remaining < 10 ? '0' : ''}${remaining}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Session Top Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Left: Topic Title & Badges */}
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              {topic.subject}
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {topic.grade}
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
              {difficulty}
            </span>
            {source === 'ai' && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> AI
              </span>
            )}
          </div>
          <h2 className="font-bold text-slate-900 text-base sm:text-lg truncate">{topic.title}</h2>
        </div>

        {/* Right: Stats, Timers, Pause & Exit */}
        <div className="flex items-center gap-3">
          {/* Total Elapsed Time */}
          <div className="flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{formatTimer(timeSpent)}</span>
          </div>

          {/* Streak Indicator */}
          {streak > 0 && (
            <div className="flex items-center gap-1 text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-1.5 rounded-lg border border-orange-200">
              <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
              <span>{streak}x Streak</span>
            </div>
          )}

          {/* Total XP so far */}
          <div className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1.5 rounded-lg border border-amber-200">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>+{totalXpEarned} XP</span>
          </div>

          {/* Pause / Resume Button */}
          <button
            onClick={() => {
              playSound('click');
              setIsPaused(!isPaused);
            }}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
            title={isPaused ? 'Resume Activity' : 'Pause Activity'}
          >
            {isPaused ? <Play className="w-4 h-4 fill-slate-700" /> : <Pause className="w-4 h-4" />}
          </button>

          {/* Restart Button */}
          <button
            onClick={handleRestart}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
            title="Restart Session"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Exit Button */}
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to leave this challenge? Unsaved quiz answers will be lost.')) {
                onExit();
              }
            }}
            className="p-2 rounded-lg bg-slate-100 hover:bg-rose-100 hover:text-rose-600 text-slate-600 transition"
            title="Exit to Dashboard"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Paused Overlay State */}
      {isPaused && (
        <div className="p-8 rounded-3xl bg-amber-50 border border-amber-200 text-center space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
            <Pause className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-amber-900">Activity Paused</h3>
          <p className="text-sm text-amber-800 max-w-sm mx-auto">
            Take a breath! Your progress is kept safe while paused. Click Resume when you are ready to continue.
          </p>
          <button
            onClick={() => setIsPaused(false)}
            className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-sm transition"
          >
            Resume Learning
          </button>
        </div>
      )}

      {!isPaused && (
        <>
          {/* Card Matcher Mode */}
          {activityType === 'matching' ? (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                    Concept Memory Matcher
                  </h3>
                  <p className="text-xs text-slate-500">
                    Click cards to pair related questions, terms, and answers.
                  </p>
                </div>
                <div className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                  Matched: {matchedPairsCount} / {matchingCards.length / 2}
                </div>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {matchingCards.map((card) => {
                  const isResolved = resolvedCards.includes(card.id);
                  const isSelected = selectedCardId === card.id;

                  return (
                    <button
                      key={card.id}
                      disabled={isResolved}
                      onClick={() => handleCardClick(card)}
                      className={`min-h-[100px] p-4 rounded-2xl text-xs sm:text-sm font-semibold text-center flex items-center justify-center transition-all ${
                        isResolved
                          ? 'bg-emerald-50 text-emerald-700 border-2 border-emerald-300 opacity-60 cursor-default shadow-none'
                          : isSelected
                          ? 'bg-indigo-600 text-white border-2 border-indigo-600 shadow-md scale-105'
                          : 'bg-slate-50 text-slate-800 border-2 border-slate-200 hover:border-indigo-400 hover:bg-white shadow-xs'
                      }`}
                    >
                      {card.text}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Standard Quiz & Speed Attack Modes */
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
              {/* Progress & Speed Countdown */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-indigo-600 font-bold">
                    Question {currentIndex + 1} of {questions.length}
                  </span>
                  {activityType === 'speed' && (
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-bold transition ${
                        speedTimer <= 5
                          ? 'bg-rose-100 text-rose-700 animate-bounce'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      ⏱️ {speedTimer}s remaining
                    </span>
                  )}
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Text */}
              <div className="space-y-2 pt-2">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  {currentQ.question}
                </h3>

                {/* Optional Hint Button */}
                {currentQ.hint && !isAnswerRevealed && (
                  <div className="pt-1">
                    {!showHint ? (
                      <button
                        onClick={() => setShowHint(true)}
                        className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 transition"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>Need a hint?</span>
                      </button>
                    ) : (
                      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span><strong>Hint:</strong> {currentQ.hint}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Options List */}
              <div className="space-y-3">
                {currentQ.options.map((option, idx) => {
                  const isSelected = selectedOption === option;
                  const isCorrect = option.trim().toLowerCase() === currentQ.answer.trim().toLowerCase();

                  let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:border-indigo-400 hover:bg-slate-50';

                  if (isAnswerRevealed) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold ring-2 ring-emerald-500/20';
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-50 border-rose-500 text-rose-900 font-semibold ring-2 ring-rose-500/20';
                    } else {
                      btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      id={`option-btn-${idx}`}
                      disabled={isAnswerRevealed}
                      onClick={() => handleSelectAnswer(option)}
                      className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between gap-4 transition-all shadow-xs ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-sm sm:text-base font-medium">{option}</span>
                      </div>

                      {isAnswerRevealed && (
                        <div className="shrink-0">
                          {isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          ) : isSelected ? (
                            <XCircle className="w-5 h-5 text-rose-600" />
                          ) : null}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Post-Answer Educational Explanation Box */}
              {isAnswerRevealed && (
                <div
                  className={`p-4 rounded-2xl border transition space-y-2 ${
                    selectedOption?.trim().toLowerCase() === currentQ.answer.trim().toLowerCase()
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                      : 'bg-rose-50/70 border-rose-200 text-rose-900'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm">
                    {selectedOption?.trim().toLowerCase() === currentQ.answer.trim().toLowerCase() ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Spot on! Great work! (+{currentQ.xpReward} XP)</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-600" />
                        <span>Not quite. Let&apos;s understand why:</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed">{currentQ.explanation}</p>
                </div>
              )}

              {/* Bottom Navigation Strip */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {isAnswerRevealed ? 'Feedback reviewed' : 'Select an answer above'}
                </span>

                {isAnswerRevealed && (
                  <button
                    id="btn-next-question"
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-600/20 flex items-center gap-2 transition hover:-translate-y-0.5"
                  >
                    <span>
                      {currentIndex + 1 === questions.length ? 'View Results' : 'Next Question'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
