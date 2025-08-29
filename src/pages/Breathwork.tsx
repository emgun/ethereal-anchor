import { useState } from 'react';
import { breathPatterns } from '@/data/seedData';
import { BreathPattern } from '@/types';
import { PatternCard } from '@/components/PatternCard';
import { BreathSession } from '@/components/BreathSession';

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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10 pb-20">
      {/* Header */}
      <div className="px-6 pt-12 pb-8">
        <div className="max-w-sm mx-auto text-center mb-8">
          <h1 className="font-heading text-3xl font-light text-foreground mb-3">
            Breathwork
          </h1>
          <p className="text-muted-foreground font-body leading-relaxed">
            Connect with your breath through ancient patterns designed to center your mind and restore balance
          </p>
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