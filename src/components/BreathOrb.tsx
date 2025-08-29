import { useState, useEffect } from 'react';

interface BreathOrbProps {
  isActive?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  pattern?: number[];
  showTimer?: boolean;
  timeLeft?: number;
}

export const BreathOrb = ({ 
  isActive = true, 
  size = 'md', 
  className = '', 
  pattern = [4, 1, 4, 1],
  showTimer = false,
  timeLeft = 0
}: BreathOrbProps) => {
  const [phase, setPhase] = useState<'inhale' | 'hold1' | 'exhale' | 'hold2'>('inhale');

  useEffect(() => {
    if (!isActive) return;

    const phases = [
      { name: 'inhale', duration: pattern[0] * 1000 },
      { name: 'hold1', duration: pattern[1] * 1000 },
      { name: 'exhale', duration: pattern[2] * 1000 },
      { name: 'hold2', duration: pattern[3] * 1000 }
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
  }, [isActive, pattern]);

  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
    xl: 'w-80 h-80'
  };

  const scaleClasses = {
    inhale: 'scale-110',
    hold1: 'scale-110',
    exhale: 'scale-90',
    hold2: 'scale-90'
  };

  const opacityClasses = {
    inhale: 'opacity-100',
    hold1: 'opacity-95',
    exhale: 'opacity-80',
    hold2: 'opacity-75'
  };

  const glowIntensity = {
    inhale: '0 0 60px hsl(var(--blush) / 0.6), 0 0 120px hsl(var(--blush) / 0.3)',
    hold1: '0 0 80px hsl(var(--blush) / 0.7), 0 0 160px hsl(var(--blush) / 0.4)',
    exhale: '0 0 40px hsl(var(--blush) / 0.4), 0 0 80px hsl(var(--blush) / 0.2)',
    hold2: '0 0 30px hsl(var(--blush) / 0.3), 0 0 60px hsl(var(--blush) / 0.15)'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative flex items-center justify-center`}>
      {/* Outer glow ring */}
      <div
        className="absolute inset-0 rounded-full transition-all duration-[3000ms] ease-in-out"
        style={{
          background: 'radial-gradient(circle, transparent 40%, hsl(var(--blush) / 0.1) 70%)',
          boxShadow: isActive ? glowIntensity[phase] : '0 0 20px hsl(var(--blush) / 0.2)'
        }}
      />
      
      {/* Main orb */}
      <div
        className={`
          relative w-full h-full rounded-full transition-all duration-[3000ms] ease-[cubic-bezier(0.4,0,0.2,1)]
          ${isActive ? `${scaleClasses[phase]} ${opacityClasses[phase]}` : 'scale-100 opacity-70'}
        `}
        style={{
          background: `
            radial-gradient(circle at 30% 30%, hsl(var(--blush) / 0.9), hsl(var(--blush) / 0.6) 40%, hsl(var(--blush) / 0.3) 80%),
            linear-gradient(135deg, hsl(var(--clay) / 0.2), hsl(var(--moss) / 0.1))
          `,
          backdropFilter: 'blur(1px)'
        }}
      >
        {/* Inner shine */}
        <div 
          className="absolute inset-2 rounded-full opacity-60"
          style={{
            background: 'radial-gradient(circle at 25% 25%, hsl(var(--mist) / 0.4), transparent 50%)'
          }}
        />
        
        {/* Timer display */}
        {showTimer && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl md:text-6xl font-heading font-light text-mist drop-shadow-lg">
              {Math.ceil(timeLeft)}
            </span>
          </div>
        )}
      </div>
      
      {/* Pulse ring for inhale/exhale indication */}
      <div
        className={`
          absolute inset-0 rounded-full border-2 transition-all duration-[3000ms] ease-in-out
          ${phase === 'inhale' ? 'border-blush/40 scale-110' : ''}
          ${phase === 'exhale' ? 'border-clay/40 scale-90' : ''}
          ${phase.includes('hold') ? 'border-moss/30 scale-100' : ''}
        `}
        style={{
          opacity: isActive ? 0.6 : 0
        }}
      />
    </div>
  );
};