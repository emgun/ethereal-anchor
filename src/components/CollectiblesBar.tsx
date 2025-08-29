import { useMemo } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useRitual } from '@/context/RitualContext';

export const CollectiblesBar = () => {
  const { world } = useTheme();
  const { xp, level } = useRitual();

  const token = useMemo(() => {
    return world === 'forest' ? 'Leaves' : world === 'ocean' ? 'Shells' : 'Spores';
  }, [world]);

  const count = Math.floor(xp / 120); // gentle pacing

  const badgeClass = world === 'forest'
    ? 'bg-moss/15 text-moss'
    : world === 'ocean'
      ? 'bg-cyan-300/15 text-cyan-300'
      : 'bg-fuchsia-300/15 text-fuchsia-300';

  return (
    <div className="w-full rounded-2xl glass p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full ${badgeClass} flex items-center justify-center text-xs font-medium`}>{count}</div>
          <div>
            <p className="text-sm font-medium text-foreground">{token}</p>
            <p className="text-xs text-muted-foreground">Earned through daily rituals</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className={`px-2 py-1 rounded-full text-[10px] ${i < level ? badgeClass : 'bg-muted text-muted-foreground'}`}>
              {i === 0 ? 'Seed' : i === 1 ? 'Sprout' : i === 2 ? 'Bloom' : 'Grove'}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};


