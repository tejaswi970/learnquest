import React, { useState } from 'react';
import {
  User,
  X,
  Check,
  AlertCircle,
  Sparkles,
  BookOpen,
  GraduationCap,
  Heart,
  Save,
} from 'lucide-react';
import { ALL_GRADES, ALL_SUBJECTS } from '../syllabusData';
import { DifficultyLevel, GradeLevel, LearningStyle, StudentProfile, SubjectType } from '../types';
import { playSound } from '../soundEffects';

interface ProfileModalProps {
  profile: StudentProfile;
  onSave: (updatedProfile: StudentProfile) => void;
  onClose: () => void;
}

const AVATAR_OPTIONS = ['🚀', '🦉', '🦊', '⚡', '🧠', '🎨', '🔬', '🌟', '🦄', '🐯', '🤖', '👑'];

const INTEREST_TAGS = [
  'Space & Astronomy',
  'Robotics & Tech',
  'Dinosaurs & Nature',
  'Puzzles & Logic',
  'Storytelling & Writing',
  'History & Ancient Secrets',
  'Inventions & Engineering',
  'Music & Sound Design',
];

const LEARNING_STYLES: LearningStyle[] = [
  'Game-based & Fast',
  'Visual & Interactive',
  'Step-by-Step Analytical',
];

export const ProfileModal: React.FC<ProfileModalProps> = ({ profile, onSave, onClose }) => {
  const [name, setName] = useState(profile.name);
  const [grade, setGrade] = useState<GradeLevel>(profile.grade);
  const [preferredSubjects, setPreferredSubjects] = useState<SubjectType[]>(
    profile.preferredSubjects
  );
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(profile.difficulty);
  const [interests, setInterests] = useState<string[]>(profile.interests);
  const [learningStyle, setLearningStyle] = useState<LearningStyle>(profile.learningStyle);
  const [avatar, setAvatar] = useState(profile.avatar || '🚀');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const toggleSubject = (subj: SubjectType) => {
    playSound('click');
    if (preferredSubjects.includes(subj)) {
      if (preferredSubjects.length <= 1) {
        setErrorMsg('Please keep at least one preferred subject.');
        return;
      }
      setPreferredSubjects(preferredSubjects.filter((s) => s !== subj));
    } else {
      setPreferredSubjects([...preferredSubjects, subj]);
    }
    setErrorMsg(null);
  };

  const toggleInterest = (interest: string) => {
    playSound('click');
    if (interests.includes(interest)) {
      setInterests(interests.filter((i) => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Student name is required.');
      return;
    }
    if (preferredSubjects.length === 0) {
      setErrorMsg('Please choose at least one preferred subject.');
      return;
    }

    playSound('correct');
    onSave({
      ...profile,
      name: name.trim(),
      grade,
      preferredSubjects,
      difficulty,
      interests,
      learningStyle,
      avatar,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl">
              {avatar}
            </div>
            <div>
              <h2 className="text-lg font-bold">Student Learning Profile</h2>
              <p className="text-xs text-indigo-200">Personalize your grade, subjects & pace</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Student Name & Avatar Picker */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Student Name & Avatar
            </label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                id="input-student-name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrorMsg(null);
                }}
                placeholder="Enter student name..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            {/* Avatar Row */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {AVATAR_OPTIONS.map((av) => (
                <button
                  key={av}
                  type="button"
                  onClick={() => {
                    playSound('click');
                    setAvatar(av);
                  }}
                  className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center border transition shrink-0 ${
                    avatar === av
                      ? 'bg-indigo-50 border-indigo-600 scale-110 shadow-xs'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          {/* Class / Grade Level */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              <span>Active Grade Level (KG to Grade 10)</span>
            </label>
            <select
              id="select-profile-grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value as GradeLevel)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none bg-white"
            >
              {ALL_GRADES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* Preferred Subjects */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Preferred Subjects</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {ALL_SUBJECTS.map((subj) => {
                const isSelected = preferredSubjects.includes(subj);
                return (
                  <button
                    key={subj}
                    type="button"
                    onClick={() => toggleSubject(subj)}
                    className={`p-2.5 rounded-xl text-xs font-semibold text-left border flex items-center justify-between transition ${
                      isSelected
                        ? 'bg-indigo-50 text-indigo-700 border-indigo-300'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span>{subj}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Difficulty Level */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Learning Difficulty Preference</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Explorer', 'Challenger', 'Master'] as DifficultyLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => {
                    playSound('click');
                    setDifficulty(lvl);
                  }}
                  className={`p-2.5 rounded-xl text-xs font-semibold border text-center transition ${
                    difficulty === lvl
                      ? 'bg-amber-50 text-amber-800 border-amber-300 ring-2 ring-amber-500/20'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div>{lvl}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Learning Style */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Learning Style
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {LEARNING_STYLES.map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => {
                    playSound('click');
                    setLearningStyle(style);
                  }}
                  className={`p-2.5 rounded-xl text-xs font-semibold border text-center transition ${
                    learningStyle === style
                      ? 'bg-purple-50 text-purple-700 border-purple-300'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Interests Tags */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Learning Interests & Themes</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {INTEREST_TAGS.map((tag) => {
                const isSelected = interests.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleInterest(tag)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                      isSelected
                        ? 'bg-rose-50 text-rose-700 border-rose-300 font-semibold'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="btn-save-profile"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 flex items-center gap-2 transition"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
