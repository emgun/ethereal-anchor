import { Home, BookOpen, Brain, Wind, ChefHat, Leaf, User, Palette } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';

const tabs = [
  { id: 'home', label: 'Home', icon: Home, path: '/' },
  { id: 'journal', label: 'Journal', icon: BookOpen, path: '/journal' },
  { id: 'meditate', label: 'Meditate', icon: Brain, path: '/meditate' },
  { id: 'breathwork', label: 'Breathwork', icon: Wind, path: '/breathwork' },
  { id: 'recipes', label: 'Recipes', icon: ChefHat, path: '/recipes' },
  { id: 'plants', label: 'Plants', icon: Leaf, path: '/plants' },
  { id: 'profile', label: 'Profile', icon: User, path: '/profile' }
];

export const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { world, setWorld } = useTheme();

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass-dark backdrop-blur-xl z-50">
      <div className="grid grid-cols-7 gap-1 px-2 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path;
          
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-white/15 text-foreground'
                  : 'text-foreground/70 hover:text-foreground hover:bg-white/10'
              }`}
            >
              <Icon className="h-4 w-4 mb-1" />
              <span className="text-xs font-medium leading-none">{tab.label}</span>
            </button>
          );
        })}
        {/* Theme quick switcher */}
        <div className="col-span-7 flex items-center justify-center gap-2 pt-1">
          <div className="flex items-center gap-1 text-xs">
            <Palette className="w-3 h-3 text-muted-foreground" />
            <select value={world} onChange={(e) => setWorld(e.target.value as any)} className="bg-card border border-border/30 rounded px-2 py-1 text-xs">
              <option value="forest">Forest</option>
              <option value="ocean">Ocean</option>
              <option value="desert">Desert</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};