import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

export const ThemeBackdrop = () => {
  const { world } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handle = () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const y = window.scrollY;
      el.style.transform = `translateY(${y * 0.05}px)`; // subtler parallax to avoid cropping issues
    };
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  const mediaBase = world === 'ocean' ? 'ocean' : world === 'desert' ? 'desert' : 'forest';
  const overlayClass = world === 'ocean' ? 'bg-black/10' : world === 'desert' ? 'bg-black/20' : 'bg-black/20';
  const candidates = (
    mediaBase === 'ocean'
      ? ['/backgrounds/ocean.png','/backgrounds/ocean.PNG','/backgrounds/ocean.jpg','/backgrounds/ocean.webp']
      : mediaBase === 'forest'
      ? ['/backgrounds/forest.png','/backgrounds/forest.PNG','/backgrounds/forest.jpg','/backgrounds/forest.webp']
      : ['/backgrounds/desert.png','/backgrounds/desert.jpg','/backgrounds/desert.webp']
  );

  return (
    <div ref={ref} className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <img
        src={candidates[Math.min(imgIdx, candidates.length - 1)]}
        alt="theme background"
        className="w-full h-full object-cover pointer-events-none"
        style={{ 
          objectPosition: world === 'ocean' ? '50% 45%' : world === 'desert' ? '50% 55%' : '50% 50%'
        }}
        onError={() => setImgIdx((i) => Math.min(i + 1, candidates.length - 1))}
      />
      {/* color grading + readability layers */}
      <div className={`absolute inset-0 ${overlayClass} pointer-events-none`} />
      {world === 'ocean' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#041726]/60 via-transparent to-[#041726]/30 pointer-events-none" />
      )}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(120% 80% at 50% 40%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.28) 100%)'
      }} />
    </div>
  );
};


