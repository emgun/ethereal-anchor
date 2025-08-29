import { useState } from 'react';
import { breathPatterns } from '@/data/seedData';
import { BreathPattern } from '@/types';
import { PatternCard } from '@/components/PatternCard';
import { BreathSession } from '@/components/BreathSession';
import { CinematicBackground } from '@/components/CinematicBackground';

const Breathwork = () => {
  const [selectedPattern, setSelectedPattern] = useState<BreathPattern | null>(null);
  const [showSession, setShowSession] = useState(false);

  const handlePatternSelect = (pattern: BreathPattern) => {
    setSelectedPattern(pattern);
    setShowSession(true);
  };

  const handleSessionEnd = () => {
    setShowSession(false);
    setSelectedPattern(null);
  };

  if (selectedPattern && showSession) {
    return <BreathSession pattern={selectedPattern} onEnd={handleSessionEnd} />;
  }

  return (
    <div className="min-h-screen bg-background/10 pb-20">
      {/* Minimal header without background */}
      <div className="px-6 pt-8 pb-6">
        <div className="max-w-sm mx-auto text-center mb-2">
          <h1 className="font-heading text-2xl font-light text-foreground mb-1">Breathwork</h1>
          <p className="text-muted-foreground font-body">Breathe in. Breathe out.</p>
        </div>
      </div>

      {/* Pattern Selection */}
      <div className="px-6">
        <div className="space-y-6 max-w-2xl mx-auto">
          {breathPatterns.map((pattern) => (
            <PatternCard 
              key={pattern.id} 
              pattern={pattern} 
              onSelect={handlePatternSelect} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Breathwork;