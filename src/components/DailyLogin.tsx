import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

const STORAGE_KEY = 'anima.lastLoginDate';

export const DailyLogin = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const last = localStorage.getItem(STORAGE_KEY);
    if (last !== today) {
      localStorage.setItem(STORAGE_KEY, today);
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setShow(true);
      if (!prefersReduced) {
        const timer = setTimeout(() => setShow(false), 1600);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[60] pointer-events-none">
      <div className="absolute inset-0 bg-obsidian/60 backdrop-blur-sm transition-opacity" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="pointer-events-auto rounded-3xl bg-white/10 dark:bg-white/5 border border-white/20 backdrop-blur-2xl px-6 py-5 text-center shadow-[0_8px_60px_rgba(0,0,0,0.35)] animate-fade-in">
          <div className="flex items-center justify-center gap-2 text-mist mb-2">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm tracking-wide">Welcome back</span>
          </div>
          <h2 className="font-heading text-2xl text-mist">Begin ritual.</h2>
        </div>
      </div>
    </div>
  );
};


