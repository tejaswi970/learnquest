import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Star } from 'lucide-react';
import { playSound } from '../soundEffects';

interface InteractiveLogoProps {
  onNavigateHome?: () => void;
  showWordmark?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

type MascotMood = 'happy' | 'wink' | 'starry' | 'cheer' | 'smart';

interface SparkParticle {
  id: number;
  x: number;
  y: number;
  icon: string;
  color: string;
}

const CHEER_PHRASES = [
  'Ready to explore? 🚀',
  'Brainpower +10! ⚡',
  'You are brilliant! 🌟',
  'High five, Quest champion! ✋',
  'Knowledge is a superpower! 💡',
  'Keep that streak alive! 🔥',
  'Leveling up your mind! 🎯',
  'Curiosity unlocked! 🗝️',
];

export const InteractiveLogo: React.FC<InteractiveLogoProps> = ({
  onNavigateHome,
  showWordmark = true,
  size = 'md',
}) => {
  const [mood, setMood] = useState<MascotMood>('happy');
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [speechBubble, setSpeechBubble] = useState<string | null>(null);
  const [particles, setParticles] = useState<SparkParticle[]>([]);
  const speechTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Natural idle blinking loop every 3.5 - 5 seconds
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 3600);

    return () => clearInterval(blinkInterval);
  }, []);

  // Handle student click interaction
  const handleLogoClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Play friendly cheerful mascot chime
    playSound('mascot');

    // Cycle through fun expressions
    const moodList: MascotMood[] = ['happy', 'wink', 'starry', 'cheer', 'smart'];
    const nextMood = moodList[(moodList.indexOf(mood) + 1) % moodList.length];
    setMood(nextMood);

    // Increase high-five click counter
    const newCount = clickCount + 1;
    setClickCount(newCount);

    // Set speech bubble phrase
    const phrase = CHEER_PHRASES[newCount % CHEER_PHRASES.length];
    setSpeechBubble(phrase);

    if (speechTimerRef.current) {
      clearTimeout(speechTimerRef.current);
    }
    speechTimerRef.current = setTimeout(() => {
      setSpeechBubble(null);
    }, 2800);

    // Spawn floating particle burst around mascot
    const emojis = ['✨', '⭐', '💡', '🚀', '⚡', '🎉'];
    const colors = ['#F59E0B', '#6366F1', '#EC4899', '#10B981', '#8B5CF6'];
    const newParticles: SparkParticle[] = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 60,
      y: -20 - Math.random() * 40,
      icon: emojis[Math.floor(Math.random() * emojis.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setParticles((prev) => [...prev.slice(-6), ...newParticles]);

    // Cleanup particles after animation
    setTimeout(() => {
      setParticles([]);
    }, 1000);

    // Execute navigation
    if (onNavigateHome) {
      onNavigateHome();
    }
  };

  const isWinking = mood === 'wink';
  const isStarry = mood === 'starry';
  const isCheering = mood === 'cheer';
  const isSmart = mood === 'smart';

  const badgeDimensions = {
    sm: 'w-8 h-8 rounded-xl',
    md: 'w-10 h-10 sm:w-11 sm:h-11 rounded-2xl',
    lg: 'w-14 h-14 rounded-3xl',
  }[size];

  return (
    <div
      id="nav-brand-logo"
      className="relative inline-flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none group"
      onClick={handleLogoClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label="LearnQuest Mascot - Click for brainpower cheer"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleLogoClick(e as unknown as React.MouseEvent);
        }
      }}
    >
      {/* Interactive Mascot Badge Container */}
      <motion.div
        className={`relative ${badgeDimensions} p-0.5 shadow-md shadow-indigo-500/20 group-hover:shadow-indigo-500/35 transition-shadow duration-300 flex items-center justify-center`}
        whileHover={{ scale: 1.08, rotate: -2 }}
        whileTap={{ scale: 0.92, rotate: 4 }}
        animate={{
          y: isHovered ? [0, -3, 0] : 0,
        }}
        transition={{
          y: { repeat: isHovered ? Infinity : 0, duration: 1.2, ease: 'easeInOut' },
          scale: { type: 'spring', stiffness: 400, damping: 17 },
        }}
      >
        {/* Animated Gradient Halo Border */}
        <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-tr from-indigo-500 via-purple-500 to-amber-400 p-0.5">
          <div className="w-full h-full rounded-[inherit] bg-slate-900" />
        </div>

        {/* Mascot Face Canvas */}
        <div className="relative w-full h-full rounded-[inherit] bg-gradient-to-b from-indigo-600 via-indigo-700 to-purple-800 flex items-center justify-center overflow-hidden z-10 shadow-inner">
          {/* Subtle glossy reflection highlight */}
          <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-white/25 blur-xs pointer-events-none" />

          {/* Questie Character SVG (Clean, Expressive, Student-Friendly) */}
          <svg
            viewBox="0 0 48 48"
            className="w-full h-full p-1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Spark Crown / Antenna */}
            <g className="transition-transform duration-300">
              <circle cx="24" cy="9" r="2.5" fill="#FBBF24" />
              <line x1="24" y1="11" x2="24" y2="15" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" />
            </g>

            {/* Smart Glasses Mode (Easter egg) */}
            {isSmart && (
              <g stroke="#FCD34D" strokeWidth="1.6" fill="none">
                <circle cx="16" cy="22" r="5" />
                <circle cx="32" cy="22" r="5" />
                <line x1="21" y1="22" x2="27" y2="22" />
              </g>
            )}

            {/* LEFT EYE */}
            <g>
              {isBlinking ? (
                // Blinking closed eye line
                <line x1="12" y1="22" x2="20" y2="22" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              ) : isHovered || isCheering ? (
                // Happy curved smiling eye (^_^)
                <path
                  d="M 12 23 Q 16 17 20 23"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />
              ) : isStarry ? (
                // Starry curious pupil
                <g>
                  <circle cx="16" cy="22" r="4.5" fill="#1E1B4B" />
                  <polygon points="16,18.5 17.2,21 20,21.2 17.8,22.8 18.5,25.5 16,24 13.5,25.5 14.2,22.8 12,21.2 14.8,21" fill="#FBBF24" />
                </g>
              ) : (
                // Normal bright, friendly curious anime eye
                <g>
                  <circle cx="16" cy="22" r="4.5" fill="#0F172A" />
                  <circle cx="14.8" cy="20.5" r="1.8" fill="white" />
                  <circle cx="17.8" cy="23.5" r="0.8" fill="white" />
                </g>
              )}
            </g>

            {/* RIGHT EYE */}
            <g>
              {isBlinking || isWinking ? (
                // Playful wink or blink
                <path
                  d="M 28 23 Q 32 18 36 23"
                  stroke="#FDE047"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />
              ) : isHovered || isCheering ? (
                // Happy curved smiling eye
                <path
                  d="M 28 23 Q 32 17 36 23"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />
              ) : isStarry ? (
                // Starry pupil
                <g>
                  <circle cx="32" cy="22" r="4.5" fill="#1E1B4B" />
                  <polygon points="32,18.5 33.2,21 36,21.2 33.8,22.8 34.5,25.5 32,24 29.5,25.5 30.2,22.8 28,21.2 30.8,21" fill="#FBBF24" />
                </g>
              ) : (
                // Normal bright eye
                <g>
                  <circle cx="32" cy="22" r="4.5" fill="#0F172A" />
                  <circle cx="30.8" cy="20.5" r="1.8" fill="white" />
                  <circle cx="33.8" cy="23.5" r="0.8" fill="white" />
                </g>
              )}
            </g>

            {/* Cute Rosy Blush Cheeks */}
            <ellipse cx="11" cy="27" rx="3" ry="1.8" fill="#FB7185" opacity={isHovered || isCheering ? 0.9 : 0.65} />
            <ellipse cx="37" cy="27" rx="3" ry="1.8" fill="#FB7185" opacity={isHovered || isCheering ? 0.9 : 0.65} />

            {/* Joyful Mouth */}
            {isCheering ? (
              // Open cheerful happy mouth with tongue
              <g>
                <path d="M 19 28 Q 24 36 29 28 Z" fill="#E11D48" />
                <path d="M 21 30 Q 24 34 27 30" fill="#FDA4AF" />
              </g>
            ) : (
              // Sweet smiling curve
              <path
                d="M 19 28 Q 24 33 29 28"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            )}
          </svg>
        </div>

        {/* Ambient Pulsing Aura on Hover */}
        {isHovered && (
          <motion.div
            className="absolute -inset-1 rounded-[inherit] bg-gradient-to-r from-amber-400 via-indigo-500 to-purple-500 opacity-40 blur-sm pointer-events-none -z-10"
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.98, 1.05, 0.98] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        )}
      </motion.div>

      {/* Floating Sparkle Particles on Click */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 0.5, x: 0, y: 0 }}
            animate={{ opacity: 0, scale: 1.4, x: p.x, y: p.y }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="absolute left-4 top-2 pointer-events-none text-xs font-bold z-50 select-none"
          >
            {p.icon}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Encouraging Speech Bubble Popover */}
      <AnimatePresence>
        {speechBubble && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 450, damping: 22 }}
            className="absolute left-0 -bottom-9 sm:left-12 sm:bottom-auto sm:-top-2 z-50 whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-900 text-amber-300 text-[11px] font-bold shadow-lg border border-amber-400/40 flex items-center gap-1.5 pointer-events-none"
          >
            <Sparkles className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
            <span>{speechBubble}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clean, Vibrant LearnQuest Wordmark */}
      {showWordmark && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1">
            <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 group-hover:text-indigo-950 transition-colors">
              Learn<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-500">Quest</span>
            </span>

            {/* Little playful wink star that spins on hover */}
            <motion.div
              animate={{ rotate: isHovered ? 180 : 0, scale: isHovered ? 1.2 : 1 }}
              transition={{ duration: 0.4 }}
              className="text-amber-400 shrink-0"
            >
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};
