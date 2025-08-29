import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from 'react';

type ActivityType = 'journal' | 'breathwork' | 'meditation' | 'recipe' | 'plant';

interface Unlock {
  id: string;
  type: 'recipe' | 'meditation' | 'plant';
  refId: string;
  name: string;
}

interface RitualState {
  xp: number;
  level: number; // 0: Seed, 1: Sprout, 2: Bloom, 3: Grove, 4: Sacred Sanctuary
  streak: number;
  lastActiveDate?: string;
  unlocks: Unlock[];
}

interface RitualContextValue extends RitualState {
  addActivity: (type: ActivityType) => void;
  awardXp: (amount: number, reason?: string) => void;
  resetProgress: () => void;
}

const RitualContext = createContext<RitualContextValue | undefined>(undefined);

const STORAGE_KEY = 'anima.ritualState.v1';

const LEVEL_THRESHOLDS = [0, 100, 300, 700, 1200];

function calculateLevel(xp: number): number {
  let level = 0;
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i]) level = i;
  }
  return Math.min(level, LEVEL_THRESHOLDS.length - 1);
}

function isSameDay(a: string, b: string) {
  return a === b;
}

function nextIsoDate(dateIso: string) {
  const d = new Date(dateIso);
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

export const RitualProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<RitualState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved) as RitualState;
    return { xp: 0, level: 0, streak: 0, unlocks: [] };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const awardXp = useCallback((amount: number) => {
    setState(prev => {
      const newXp = Math.max(0, prev.xp + amount);
      const newLevel = calculateLevel(newXp);
      return { ...prev, xp: newXp, level: newLevel };
    });
  }, []);

  const addActivity = useCallback((type: ActivityType) => {
    const today = new Date().toISOString().split('T')[0];
    setState(prev => {
      let newStreak = prev.streak;
      if (!prev.lastActiveDate) {
        newStreak = 1;
      } else if (isSameDay(prev.lastActiveDate, today)) {
        newStreak = prev.streak; // already counted today
      } else if (nextIsoDate(prev.lastActiveDate) === today) {
        newStreak = prev.streak + 1;
      } else {
        newStreak = 1; // reset streak if a day is missed
      }

      const baseXp = 25;
      const bonus = type === 'breathwork' ? 15 : type === 'meditation' ? 15 : 10;
      const gained = baseXp + bonus;

      const newXp = Math.max(0, prev.xp + gained);
      const newLevel = calculateLevel(newXp);

      return { ...prev, xp: newXp, level: newLevel, streak: newStreak, lastActiveDate: today };
    });
  }, []);

  const resetProgress = useCallback(() => {
    setState({ xp: 0, level: 0, streak: 0, unlocks: [] });
  }, []);

  const value = useMemo<RitualContextValue>(() => ({
    ...state,
    addActivity,
    awardXp,
    resetProgress,
  }), [state, addActivity, awardXp, resetProgress]);

  return (
    <RitualContext.Provider value={value}>{children}</RitualContext.Provider>
  );
};

export const useRitual = () => {
  const ctx = useContext(RitualContext);
  if (!ctx) throw new Error('useRitual must be used within RitualProvider');
  return ctx;
};


