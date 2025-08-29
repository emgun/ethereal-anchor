import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { breathPatterns } from '@/data/seedData';
import { BreathPattern } from '@/types';

const Breathwork = () => {
  const [selectedPattern, setSelectedPattern] = useState<BreathPattern | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [currentCycle, setCurrentCycle] = useState(0);
  const [phase, setPhase] = useState<'inhale' | 'hold1' | 'exhale' | 'hold2'>('inhale');
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!isActive || !selectedPattern) return;

    const phases = [
      { name: 'inhale', duration: selectedPattern.pattern[0] * 1000 },
      { name: 'hold1', duration: selectedPattern.pattern[1] * 1000 },
      { name: 'exhale', duration: selectedPattern.pattern[2] * 1000 },
      { name: 'hold2', duration: selectedPattern.pattern[3] * 1000 }
    ] as const;

    let currentPhaseIndex = 0;
    let intervalId: NodeJS.Timeout;
    let timeoutId: NodeJS.Timeout;

    const nextPhase = () => {
      currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
      
      if (currentPhaseIndex === 0) {
        setCurrentCycle(prev => {
          const newCycle = prev + 1;
          if (newCycle >= selectedPattern.cycles) {
            setIsActive(false);
            return 0;
          }
          return newCycle;
        });
      }
      
      setPhase(phases[currentPhaseIndex].name);
      setTimeLeft(phases[currentPhaseIndex].duration / 1000);
      
      if (phases[currentPhaseIndex].duration > 0) {
        timeoutId = setTimeout(nextPhase, phases[currentPhaseIndex].duration);
      }
    };

    setTimeLeft(phases[0].duration / 1000);
    intervalId = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);
    
    if (phases[0].duration > 0) {
      timeoutId = setTimeout(nextPhase, phases[0].duration);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isActive, selectedPattern]);

  const handleStart = () => {
    if (!selectedPattern) return;
    setIsActive(true);
    setCurrentCycle(0);
    setPhase('inhale');
  };

  const handleStop = () => {
    setIsActive(false);
    setCurrentCycle(0);
    setPhase('inhale');
  };

  const phaseInstructions = {
    inhale: 'Breathe in',
    hold1: 'Hold',
    exhale: 'Breathe out',
    hold2: 'Hold'
  };

  const orbScale = {
    inhale: 'scale-150',
    hold1: 'scale-150',
    exhale: 'scale-100',
    hold2: 'scale-100'
  };

  if (selectedPattern && isActive) {
    return (
      <div className="min-h-screen bg-gradient-hero flex flex-col">
        <div className="absolute inset-0 bg-obsidian/70" />
        
        {/* Header */}
        <div className="relative z-10 px-6 pt-8 pb-4">
          <button
            onClick={handleStop}
            className="text-mist/80 hover:text-mist mb-4"
          >
            ← Back to Patterns
          </button>
        </div>

        {/* Breath Session */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
          <h2 className="font-heading text-2xl font-semibold text-mist mb-2">
            {selectedPattern.name}
          </h2>
          <p className="text-mist/60 font-body text-sm mb-12">
            Cycle {currentCycle + 1} of {selectedPattern.cycles}
          </p>

          {/* Large Breath Orb */}
          <div className="relative mb-12">
            <div
              className={`w-64 h-64 rounded-full transition-all duration-[2000ms] ease-in-out ${orbScale[phase]}`}
              style={{
                background: 'radial-gradient(circle, hsl(var(--blush) / 0.6), hsl(var(--blush) / 0.2))',
                boxShadow: '0 0 60px hsl(var(--blush) / 0.4)'
              }}
            >
              <div className="w-full h-full rounded-full bg-gradient-to-r from-blush/30 to-clay/20" />
            </div>
            
            {/* Timer */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-heading font-bold text-mist">
                {Math.ceil(timeLeft)}
              </span>
            </div>
          </div>

          {/* Phase Instruction */}
          <h3 className="font-heading text-3xl font-medium text-mist mb-4">
            {phaseInstructions[phase]}
          </h3>
          <p className="text-mist/80 font-body">
            {selectedPattern.instructions}
          </p>

          {/* Stop Button */}
          <button
            onClick={handleStop}
            className="mt-12 px-6 py-3 bg-mist/20 text-mist rounded-xl font-medium hover:bg-mist/30 transition-colors duration-200 backdrop-blur-sm"
          >
            End Session
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="px-6 pt-8 pb-6">
        <h1 className="font-heading text-2xl font-semibold text-foreground mb-2">
          Breathwork
        </h1>
        <p className="text-muted-foreground font-body">
          Connect with your breath through ancient patterns
        </p>
      </div>

      {/* Pattern Selection or Active Session */}
      {selectedPattern && !isActive ? (
        <div className="px-6">
          <button
            onClick={() => setSelectedPattern(null)}
            className="text-muted-foreground hover:text-foreground mb-6"
          >
            ← Back to Patterns
          </button>
          
          <div className="bg-gradient-card rounded-3xl p-6 border border-border/20 text-center">
            <div className="w-32 h-32 mx-auto mb-6">
              <div
                className="w-full h-full rounded-full opacity-60"
                style={{
                  background: 'radial-gradient(circle, hsl(var(--blush) / 0.4), hsl(var(--blush) / 0.1))',
                  boxShadow: '0 0 30px hsl(var(--blush) / 0.3)'
                }}
              >
                <div className="w-full h-full rounded-full bg-gradient-to-r from-blush/30 to-clay/20" />
              </div>
            </div>
            
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-2">
              {selectedPattern.name}
            </h2>
            <p className="text-muted-foreground font-body mb-4">
              {selectedPattern.description}
            </p>
            <p className="text-sm text-muted-foreground font-body mb-6">
              {selectedPattern.instructions}
            </p>
            
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground font-body mb-6">
              <span>{selectedPattern.cycles} cycles</span>
              <span>•</span>
              <span>{selectedPattern.pattern.join('-')} pattern</span>
            </div>

            <button
              onClick={handleStart}
              className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Play className="h-5 w-5" />
              Begin Session
            </button>
          </div>
        </div>
      ) : (
        /* Pattern Grid */
        <div className="px-6">
          <div className="grid gap-4">
            {breathPatterns.map((pattern) => (
              <div key={pattern.id} className="bg-card rounded-2xl p-4 border border-border/20">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-heading text-lg font-medium text-foreground mb-1">
                      {pattern.name}
                    </h3>
                    <p className="text-muted-foreground font-body text-sm mb-2">
                      {pattern.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground font-body">
                      <span>{pattern.cycles} cycles</span>
                      <span>•</span>
                      <span>{pattern.pattern.join('-')} pattern</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPattern(pattern)}
                    className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors duration-200 ml-4"
                  >
                    <Play className="h-5 w-5 ml-0.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Breathwork;