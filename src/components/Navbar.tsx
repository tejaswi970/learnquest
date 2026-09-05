import React from 'react';
import {
  BookOpen,
  Sparkles,
  Trophy,
  Flame,
  Volume2,
  VolumeX,
  Compass,
  Gamepad2,
  HelpCircle,
  User,
  LayoutDashboard,
  CheckCircle2,
} from 'lucide-react';
import { StudentProfile } from '../types';
import { playSound } from '../soundEffects';
import { InteractiveLogo } from './InteractiveLogo';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  profile: StudentProfile;
  onOpenProfile: () => void;
  onOpenHelp: () => void;
  isSoundEnabled: boolean;
  onToggleSound: () => void;
  aiStatus: { enabled: boolean; text: string };
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  profile,
  onOpenProfile,
  onOpenHelp,
  isSoundEnabled,
  onToggleSound,
  aiStatus,
}) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'learn', label: 'Syllabus', icon: BookOpen },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'progress', label: 'Progress', icon: Trophy },
  ];

  const handleNavClick = (tabId: string) => {
    playSound('click');
    onSelectTab(tabId);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Interactive Logo & Brand */}
          <InteractiveLogo onNavigateHome={() => handleNavClick('home')} />

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* AI Status Badge */}
            <div
              className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                aiStatus.enabled
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}
              title={aiStatus.text}
            >
              <span className={`w-2 h-2 rounded-full ${aiStatus.enabled ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <span className="truncate max-w-[130px]">{aiStatus.enabled ? 'Gemini AI Active' : 'Offline / Bank Ready'}</span>
            </div>

            {/* Streak Counter */}
            <div
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold"
              title="Daily Learning Streak"
            >
              <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
              <span>{profile.streakDays}d</span>
            </div>

            {/* XP Points */}
            <div
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold"
              title="Total XP Earned"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>{profile.totalXp} XP</span>
            </div>

            {/* Audio Toggle */}
            <button
              id="btn-toggle-sound"
              onClick={() => {
                onToggleSound();
                playSound('click');
              }}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
              title={isSoundEnabled ? 'Mute Sound' : 'Enable Sound'}
              aria-label="Toggle Sound"
            >
              {isSoundEnabled ? <Volume2 className="w-4 h-4 text-indigo-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>

            {/* Help Button */}
            <button
              id="btn-nav-help"
              onClick={() => {
                playSound('click');
                onOpenHelp();
              }}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
              title="Help & SRS Documentation"
              aria-label="Help"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* Profile Avatar Button */}
            <button
              id="btn-nav-profile"
              onClick={() => {
                playSound('click');
                onOpenProfile();
              }}
              className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 transition"
              title="Manage Student Profile"
            >
              <span className="text-base leading-none">{profile.avatar || '🚀'}</span>
              <span className="text-xs font-medium text-slate-800 hidden sm:inline max-w-[80px] truncate">
                {profile.name}
              </span>
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-sm bg-indigo-100 text-indigo-700">
                {profile.grade}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-1 border-t border-slate-100 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                  isActive
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-600 bg-slate-100 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
