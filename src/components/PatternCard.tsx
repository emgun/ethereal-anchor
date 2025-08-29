import { Play } from 'lucide-react';
import { BreathPattern } from '@/types';
import { BreathOrb } from './BreathOrb';

interface PatternCardProps {
  pattern: BreathPattern;
  onSelect: (pattern: BreathPattern) => void;
}

export const PatternCard = ({ pattern, onSelect }: PatternCardProps) => {
  return (
    <div className="group bg-card/50 backdrop-blur-sm rounded-3xl p-6 border border-border/20 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-heading text-xl font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
            {pattern.name}
          </h3>
          <p className="text-muted-foreground font-body text-sm leading-relaxed mb-3">
            {pattern.description}
          </p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground font-body">
            <span className="px-2 py-1 bg-muted/50 rounded-full">{pattern.cycles} cycles</span>
            <span className="px-2 py-1 bg-muted/50 rounded-full">{pattern.pattern.join('-')} pattern</span>
          </div>
        </div>
        
        {/* Mini breath orb preview */}
        <div className="ml-4">
          <BreathOrb size="sm" isActive={false} className="opacity-60 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
      
      <button
        onClick={() => onSelect(pattern)}
        className="w-full py-3 px-6 bg-primary/5 hover:bg-primary text-foreground hover:text-primary-foreground rounded-2xl font-medium transition-all duration-300 flex items-center justify-center gap-3 group-hover:shadow-md"
      >
        <Play className="h-5 w-5" />
        Begin Practice
      </button>
    </div>
  );
};