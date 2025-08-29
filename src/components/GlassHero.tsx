import { Apple } from 'lucide-react';

interface GlassHeroProps {
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  onCta?: () => void;
}

export const GlassHero = ({ title, subtitle, ctaLabel = 'Begin ritual', onCta }: GlassHeroProps) => {
  return (
    <div className="relative h-[420px] flex items-center justify-center overflow-hidden">
      {/* Background scene placeholders (can be replaced with images/video) */}
      <div className="absolute inset-0">
        <div className="absolute -left-10 bottom-6 w-24 h-24 rounded-full bg-foreground/10 blur-2xl" />
        <div className="absolute right-6 -bottom-10 w-40 h-40 rounded-full bg-accent/30 blur-3xl" />
        <div className="absolute left-1/2 top-12 -translate-x-1/2 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
      </div>

      {/* Glass card */}
      <div className="relative z-10 w-[280px] rounded-[28px] bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 shadow-[0_10px_40px_rgba(0,0,0,0.25)] p-6 text-center">
        <div className="w-full h-36 rounded-2xl bg-gradient-to-b from-white/30 to-white/5 dark:from-white/10 dark:to-white/0 mb-5" />
        <div className="mb-1 text-xs uppercase tracking-wider text-white/70">destination</div>
        <div className="text-3xl font-heading text-white mb-2">{title}</div>
        {subtitle && <div className="text-white/70 text-xs mb-4">{subtitle}</div>}
        <div className="text-white/90 text-sm mb-4">$12,999</div>
        <button onClick={onCta} className="w-full h-10 rounded-full bg-black/80 text-white hover:bg-black/70 transition">
          <span className="inline-flex items-center justify-center gap-2"><Apple className="w-4 h-4" /> {ctaLabel}</span>
        </button>
        <div className="mt-2 text-[10px] text-white/60">Pay, cry and fly.</div>
      </div>
    </div>
  );
};


