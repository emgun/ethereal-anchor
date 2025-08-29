import { useState, useEffect } from 'react';

interface BreathOrbProps {
  isActive?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const BreathOrb = ({ isActive = true, size = 'md', className = '' }: BreathOrbProps) => {
  const [phase, setPhase] = useState<'inhale' | 'hold1' | 'exhale' | 'hold2'>('inhale');

  useEffect(() => {
    if (!isActive) return;

    const phases = [
      { name: 'inhale', duration: 4000 },
      { name: 'hold1', duration: 1000 },
      { name: 'exhale', duration: 4000 },
      { name: 'hold2', duration: 1000 }
    ] as const;

    let currentPhaseIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const nextPhase = () => {
      currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
      setPhase(phases[currentPhaseIndex].name);
      timeoutId = setTimeout(nextPhase, phases[currentPhaseIndex].duration);
    };

    timeoutId = setTimeout(nextPhase, phases[0].duration);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isActive]);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  const scaleClasses = {
    inhale: 'scale-125 opacity-90',
    hold1: 'scale-125 opacity-100',
    exhale: 'scale-100 opacity-70',
    hold2: 'scale-100 opacity-70'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} flex items-center justify-center`}>
      <div
        className={`w-full h-full rounded-full bg-gradient-breath transition-all duration-[2000ms] ease-in-out ${
          isActive ? scaleClasses[phase] : 'scale-100 opacity-70'
        }`}
        style={{
          background: 'radial-gradient(circle, hsl(var(--blush) / 0.4), hsl(var(--blush) / 0.1))',
          boxShadow: '0 0 30px hsl(var(--blush) / 0.3)'
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-r from-blush/30 to-clay/20" />
      </div>
    </div>
  );
};