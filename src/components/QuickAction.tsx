import { LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuickActionProps {
  icon: LucideIcon;
  label: string;
  path: string;
}

export const QuickAction = ({ icon: Icon, label, path }: QuickActionProps) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(path)}
      className="flex flex-col items-center justify-center p-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 hover:bg-card/80 transition-all duration-300 group"
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors duration-300">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors duration-300">
        {label}
      </span>
    </button>
  );
};