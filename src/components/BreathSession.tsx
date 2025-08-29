import { useState, useEffect } from 'react';
import { X, Pause, Play } from 'lucide-react';
import { BreathPattern } from '@/types';
import { BreathOrb } from './BreathOrb';
import { ThreeBreathOrb } from './ThreeBreathOrb';
import { useRitual } from '@/context/RitualContext';

interface BreathSessionProps {
  pattern: BreathPattern;
  onEnd: () => void;
}

export const BreathSession = ({ pattern, onEnd }: BreathSessionProps) => {
  const [isActive, setIsActive] = useState(false);
  const [currentCycle, setCurrentCycle] = useState(0);
  const [phase, setPhase] = useState<'inhale' | 'hold1' | 'exhale' | 'hold2'>('inhale');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const { addActivity } = useRitual();

  useEffect(() => {
    if (!isActive || !pattern) return;

    const phases = [
      { name: 'inhale', duration: pattern.pattern[0] * 1000 },
      { name: 'hold1', duration: pattern.pattern[1] * 1000 },
      { name: 'exhale', duration: pattern.pattern[2] * 1000 },
      { name: 'hold2', duration: pattern.pattern[3] * 1000 }
    ] as const;

    let currentPhaseIndex = 0;
    let intervalId: NodeJS.Timeout;
    let timeoutId: NodeJS.Timeout;

    const nextPhase = () => {
      currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
      
      if (currentPhaseIndex === 0) {
        setCurrentCycle(prev => {
          const newCycle = prev + 1;
          if (newCycle >= pattern.cycles) {
            setIsActive(false);
            setIsStarted(false);
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
  }, [isActive, pattern]);

  const handleStart = () => {
    setIsActive(true);
    setIsStarted(true);
    setCurrentCycle(0);
    setPhase('inhale');
  };

  const handlePause = () => {
    setIsActive(!isActive);
  };

  const handleEnd = () => {
    setIsActive(false);
    setIsStarted(false);
    setCurrentCycle(0);
    setPhase('inhale');
    addActivity('breathwork');
    onEnd();
  };

  const phaseInstructions = {
    inhale: 'Breathe in deeply',
    hold1: 'Hold gently',
    exhale: 'Release slowly',
    hold2: 'Rest in stillness'
  };

  const phaseSubtext = {
    inhale: 'Fill your lungs with intention',
    hold1: 'Feel the fullness within',
    exhale: 'Let go of what no longer serves',
    hold2: 'Find peace in the pause'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-40 h-40 bg-blush/20 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-16 w-60 h-60 bg-moss/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-clay/10 rounded-full blur-3xl" />
      </div>
      
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-6 pt-8 pb-4">
        <button
          onClick={handleEnd}
          className="p-2 rounded-full bg-muted/50 backdrop-blur-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="text-center">
          <h2 className="font-heading text-lg font-medium text-foreground">
            {pattern.name}
          </h2>
          {isStarted && (
            <p className="text-muted-foreground font-body text-sm mt-1">
              Cycle {currentCycle + 1} of {pattern.cycles}
            </p>
          )}
        </div>
        
        <div className="w-10" /> {/* Spacer for balance */}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
        {!isStarted ? (
          // Pre-session state
          <div className="max-w-sm mx-auto">
            <BreathOrb size="lg" isActive={false} className="mb-8 mx-auto" />
            
            <h3 className="font-heading text-2xl font-medium text-foreground mb-4">
              Ready to begin?
            </h3>
            <p className="text-muted-foreground font-body mb-8 leading-relaxed">
              {pattern.instructions}
            </p>
            
            <button
              onClick={handleStart}
              className="w-full py-4 px-8 bg-primary text-primary-foreground rounded-2xl font-medium hover:bg-primary/90 transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
            >
              <Play className="h-6 w-6" />
              Begin Session
            </button>
          </div>
        ) : (
          // Active session
          <>
            <div className="mb-8 flex items-center justify-center">
              <div className="hidden sm:block">
                <ThreeBreathOrb isActive={isActive} size={320} />
              </div>
              <div className="sm:hidden">
                <BreathOrb 
                  size="xl" 
                  isActive={isActive}
                  pattern={pattern.pattern}
                  showTimer={true}
                  timeLeft={timeLeft}
                  className="mx-auto"
                />
              </div>
            </div>

            <div className="mb-8 space-y-2">
              <h3 className="font-heading text-3xl font-light text-foreground">
                {phaseInstructions[phase]}
              </h3>
              <p className="text-muted-foreground font-body text-lg">
                {phaseSubtext[phase]}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={handlePause}
                className="p-4 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 backdrop-blur-sm"
              >
                {isActive ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </button>
              
              <button
                onClick={handleEnd}
                className="px-6 py-3 bg-muted/50 text-muted-foreground rounded-xl font-medium hover:bg-muted hover:text-foreground transition-all duration-200 backdrop-blur-sm"
              >
                End Session
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};