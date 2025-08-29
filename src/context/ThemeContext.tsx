import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';

export type WorldTheme = 'forest' | 'ocean' | 'desert';

interface ThemeContextValue {
  world: WorldTheme;
  isDark: boolean;
  setWorld: (world: WorldTheme) => void;
  toggleDark: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const WORLD_STORAGE_KEY = 'anima.worldTheme';
const DARK_STORAGE_KEY = 'anima.darkMode';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [world, setWorldState] = useState<WorldTheme>(() => {
    const saved = localStorage.getItem(WORLD_STORAGE_KEY) as WorldTheme | null;
    return saved ?? 'forest';
  });
  const [isDark, setIsDark] = useState<boolean>(() => {
    return true; // Force dark
  });

  useEffect(() => {
    document.documentElement.classList.add('dark');
    localStorage.setItem(DARK_STORAGE_KEY, 'true');
  }, [isDark]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-forest', 'theme-ocean', 'theme-mycelium', 'theme-desert');
    root.classList.add(`theme-${world}`);
    localStorage.setItem(WORLD_STORAGE_KEY, world);
  }, [world]);

  const value = useMemo<ThemeContextValue>(() => ({
    world,
    isDark,
    setWorld: setWorldState,
    toggleDark: () => setIsDark(true),
  }), [world, isDark]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};


