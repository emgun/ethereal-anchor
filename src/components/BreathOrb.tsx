import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';

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
  const { world } = useTheme();

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
    exhale: 'scale-95',
    hold2: 'scale-100'
  };

  const opacityClasses = {
    inhale: 'opacity-100',
    hold1: 'opacity-95',
    exhale: 'opacity-80',
    hold2: 'opacity-75'
  };

  const themeHue = world === 'forest' ? 'var(--moss)' : world === 'ocean' ? '200 70% 60%' : '290 60% 65%';
  const glowIntensity = {
    inhale: `0 0 60px hsl(${themeHue} / 0.6), 0 0 120px hsl(${themeHue} / 0.3)`,
    hold1: `0 0 80px hsl(${themeHue} / 0.7), 0 0 160px hsl(${themeHue} / 0.4)`,
    exhale: `0 0 40px hsl(${themeHue} / 0.4), 0 0 80px hsl(${themeHue} / 0.2)`,
    hold2: `0 0 30px hsl(${themeHue} / 0.3), 0 0 60px hsl(${themeHue} / 0.15)`
  } as const;

  return (
    <div className={`${sizeClasses[size]} ${className} relative flex items-center justify-center`}>
      {/* Outer glow ring */}
      <div
        className="absolute inset-0 rounded-full transition-all duration-[3200ms] ease-in-out"
        style={{
          background: 'radial-gradient(circle, transparent 40%, hsl(var(--blush) / 0.1) 70%)',
          boxShadow: isActive ? glowIntensity[phase] : '0 0 20px hsl(var(--blush) / 0.2)'
        }}
      />
      
      {/* Main orb with subtle organic shimmer */}
      <div
        className={`
          relative w-full h-full rounded-full transition-all duration-[3200ms] ease-[cubic-bezier(0.4,0,0.2,1)]
          ${isActive ? `${scaleClasses[phase]} ${opacityClasses[phase]}` : 'scale-100 opacity-70'}
        `}
        style={{
          background: world === 'forest'
            ? `radial-gradient(circle at 30% 30%, hsl(var(--moss) / 0.95), hsl(var(--moss) / 0.6) 40%, hsl(var(--moss) / 0.25) 80%), linear-gradient(135deg, hsl(var(--clay) / 0.15), hsl(var(--moss) / 0.1))`
            : world === 'ocean'
            ? `radial-gradient(circle at 28% 32%, hsl(200 80% 72% / 0.95), hsl(200 70% 60% / 0.6) 42%, hsl(200 70% 50% / 0.25) 78%), linear-gradient(135deg, hsl(204 60% 30% / 0.25), hsl(200 40% 40% / 0.15))`
            : `radial-gradient(circle at 30% 30%, hsl(28 70% 70% / 0.95), hsl(28 60% 60% / 0.6) 40%, hsl(28 60% 50% / 0.25) 80%), linear-gradient(135deg, hsl(28 30% 40% / 0.25), hsl(28 30% 30% / 0.15))`,
          backdropFilter: 'blur(1px)',
          backgroundSize: '200% 200%'
        }}
      >
        {/* Inner shine */}
        <div 
          className="absolute inset-2 rounded-full opacity-60"
          style={{
            background: 'radial-gradient(circle at 25% 25%, hsl(var(--mist) / 0.4), transparent 50%)'
          }}
        />
        {/* Subtle shimmer */}
        <div
          className="absolute inset-0 rounded-full mix-blend-screen opacity-20"
          style={{
            background: 'radial-gradient(ellipse at 60% 40%, rgba(255,255,255,0.35), transparent 40%)',
            animation: 'orbShimmer 8s ease-in-out infinite'
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
          absolute inset-0 rounded-full border-2 transition-all duration-[3200ms] ease-in-out
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