import { Home, BookOpen, Brain, Wind, ChefHat, Leaf, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

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

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border/20 backdrop-blur-xl z-50">
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
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon className="h-4 w-4 mb-1" />
              <span className="text-xs font-medium leading-none">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};