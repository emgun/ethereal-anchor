import { ReactNode, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface CinematicBackgroundProps {
  height?: number;
  children?: ReactNode;
}

export const CinematicBackground = ({ height = 360, children }: CinematicBackgroundProps) => {
  const { world } = useTheme();
  const [videoOk, setVideoOk] = useState(false);
  const [imageOk, setImageOk] = useState(true);

  const blobA = world === 'ocean'
    ? 'bg-cyan-300/25'
    : world === 'mycelium'
      ? 'bg-fuchsia-300/25'
      : 'bg-moss/25';

  const blobB = world === 'ocean'
    ? 'bg-blue-500/20'
    : world === 'mycelium'
      ? 'bg-purple-400/20'
      : 'bg-emerald-700/20';

  const horizon = world === 'ocean'
    ? 'from-blue-900/60 to-obsidian/0'
    : world === 'mycelium'
      ? 'from-purple-900/60 to-obsidian/0'
      : 'from-emerald-900/60 to-obsidian/0';

  const mediaBase = world === 'ocean' ? 'ocean' : world === 'mycelium' ? 'mycelium' : 'forest';

  return (
    <div className="relative w-full overflow-hidden" style={{ height }}>
      {/* Try themed video first (drop files in public/backgrounds: ocean.webm/mp4 etc.) */}
      {videoOk && (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVideoOk(false)}
          onCanPlay={() => setVideoOk(true)}
        >
          <source src={`/backgrounds/${mediaBase}.webm`} type="video/webm" />
          <source src={`/backgrounds/${mediaBase}.mp4`} type="video/mp4" />
        </video>
      )}
      {/* If no video, try photo (WebP/PNG). Put forest.webp/png etc. in public/backgrounds */}
      {!videoOk && imageOk && (
        <picture>
          <source srcSet={`/backgrounds/${mediaBase}.webp`} type="image/webp" />
          <source srcSet={`/backgrounds/${mediaBase}.jpg`} type="image/jpeg" />
          <img
            src={`/backgrounds/${mediaBase}.png`}
            alt="themed background"
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setImageOk(false)}
          />
        </picture>
      )}
      {/* Fallback to vector scene if neither provided */}
      {!videoOk && !imageOk && (
        <img
          src={world === 'ocean' ? '/backgrounds/cinematic-ocean.svg' : world === 'mycelium' ? '/backgrounds/cinematic-mycelium.svg' : '/backgrounds/cinematic-forest.svg'}
          alt="themed background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-obsidian/50" />

      {/* horizon mist */}
      <div className={`absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t ${horizon}`} />

      {/* ambient blobs */}
      <div className={`absolute -left-10 bottom-4 w-40 h-40 ${blobA} rounded-full blur-3xl animate-float`} />
      <div className={`absolute right-0 top-8 w-56 h-56 ${blobB} rounded-full blur-[60px] animate-float`} style={{ animationDelay: '0.8s' }} />
      <div className="absolute left-1/2 -translate-x-1/2 top-16 w-80 h-80 bg-white/5 rounded-full blur-[72px]" />

      {/* grain overlay */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.4) 0, rgba(255,255,255,0.4) 1px, transparent 1px, transparent 2px)' }} />

      {/* content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};


