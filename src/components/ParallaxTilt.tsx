import { ReactNode, useEffect, useRef } from 'react';

interface Props {
  children: ReactNode;
  intensity?: number; // deg max
}

export const ParallaxTilt = ({ children, intensity = 4 }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ rx: 0, ry: 0 });
  const currentRef = useRef({ rx: 0, ry: 0 });

  const reduceMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = typeof window !== 'undefined' && 'ontouchstart' in window;

  const update = () => {
    const el = ref.current;
    if (!el) return;
    const ease = 0.12; // subtle smoothing
    currentRef.current.rx += (targetRef.current.rx - currentRef.current.rx) * ease;
    currentRef.current.ry += (targetRef.current.ry - currentRef.current.ry) * ease;
    el.style.transform = `perspective(900px) rotateX(${currentRef.current.rx.toFixed(2)}deg) rotateY(${currentRef.current.ry.toFixed(2)}deg)`;
    rafRef.current = requestAnimationFrame(update);
  };

  useEffect(() => {
    if (reduceMotion || isTouch) return; // disable on touch / reduced motion
    rafRef.current = requestAnimationFrame(update);
    const onResize = () => {
      rectRef.current = ref.current?.getBoundingClientRect() ?? null;
    };
    window.addEventListener('resize', onResize);
    onResize();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onEnter = () => {
    rectRef.current = ref.current?.getBoundingClientRect() ?? null;
  };

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || isTouch) return;
    const rect = rectRef.current;
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
    const rx = clamp(-py * intensity, -intensity, intensity);
    const ry = clamp(px * intensity, -intensity, intensity);
    targetRef.current = { rx, ry };
  };

  const onLeave = () => {
    targetRef.current = { rx: 0, ry: 0 };
  };

  return (
    <div
      ref={ref}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="transition-transform duration-300 will-change-transform"
      style={{ transform: 'perspective(900px)' }}
    >
      {children}
    </div>
  );
};


