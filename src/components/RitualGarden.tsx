import { useMemo } from 'react';
import { useRitual } from '@/context/RitualContext';
import { useTheme } from '@/context/ThemeContext';

const LEVEL_TITLES = ['Seed', 'Sprout', 'Bloom', 'Grove', 'Sacred Sanctuary'];

export const RitualGarden = () => {
  const { level, xp, streak } = useRitual();
  const { world } = useTheme();

  const progressToNext = useMemo(() => {
    const thresholds = [0, 100, 300, 700, 1200];
    const current = thresholds[level] ?? 0;
    const next = thresholds[Math.min(level + 1, thresholds.length - 1)];
    const span = Math.max(1, next - current);
    const within = Math.max(0, Math.min(xp - current, span));
    return within / span;
  }, [level, xp]);

  const worldGradient = {
    forest: 'from-moss/40 via-moss/20 to-obsidian/10',
    ocean: 'from-blue-400/30 via-cyan-300/20 to-obsidian/10',
    mycelium: 'from-purple-300/30 via-fuchsia-300/20 to-obsidian/10'
  } as const;

  const ringColor = {
    forest: 'border-moss/40',
    ocean: 'border-cyan-300/40',
    mycelium: 'border-fuchsia-300/40'
  } as const;

  return (
    <div className="relative overflow-hidden rounded-3xl p-6 glass">
      <div className={`absolute inset-0 blur-3xl opacity-60 bg-gradient-to-br ${worldGradient[world]}`} />
      <div className="relative z-10 grid grid-cols-3 gap-6 items-center">
        {/* Left copy */}
        <div className="col-span-2">
          <h3 className="font-heading text-2xl font-medium text-foreground mb-1">Ritual Garden</h3>
          <p className="text-muted-foreground font-body mb-4">{LEVEL_TITLES[level]} • {Math.round(progressToNext * 100)}% to next</p>

          <div className="w-full h-2 bg-muted/50 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progressToNext * 100}%` }} />
          </div>

          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
            <span>{xp} XP</span>
            <span>•</span>
            <span>{streak} day streak</span>
          </div>
        </div>

        {/* Orb habitat */}
        <div className="relative">
          <div className={`w-28 h-28 rounded-full border ${ringColor[world]} mx-auto animate-glow`} />
          <div className="absolute inset-2 rounded-full bg-gradient-breath opacity-60" />
        </div>
      </div>
    </div>
  );
};


