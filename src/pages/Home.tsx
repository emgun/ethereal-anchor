import { BookOpen, Brain, Wind, ChefHat, Sparkles } from 'lucide-react';
import { BreathOrb } from '@/components/BreathOrb';
import { QuickAction } from '@/components/QuickAction';
import { currentUser } from '@/data/seedData';
import { RitualGarden } from '@/components/RitualGarden';
import { useTheme } from '@/context/ThemeContext';
import { CollectiblesBar } from '@/components/CollectiblesBar';
import { CinematicBackground } from '@/components/CinematicBackground';
import { DailyLogin } from '@/components/DailyLogin';
import { useNavigate } from 'react-router-dom';
// Parallax removed per request

const Home = () => {
  const { world } = useTheme();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background/10 pb-20">
      <DailyLogin />
      {/* Header (original welcome, no background blocks) */}
      <div className="px-6 pt-8 pb-4 text-center relative z-10">
        <h1 className="font-heading text-3xl md:text-4xl font-semibold text-foreground drop-shadow-md mb-2">Welcome back, {currentUser.name}.</h1>
        <p className="text-foreground/80 font-body text-base md:text-lg">Your ritual begins here.</p>
      </div>

      {/* Content */}
      <div className="px-6 pt-2 relative">
        {/* Ritual Garden */}
        <div className="mb-8">
          <RitualGarden />
        </div>

        {/* Collectibles */}
        <div className="mb-8">
          <CollectiblesBar />
        </div>

        {/* Main Cards */}
        <div className="space-y-6">
          {/* Garden entry (scrapped for now) */}
          {/* Breathwork Card */}
          <div className="rounded-3xl p-6 glass">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-heading text-xl font-medium text-foreground mb-1">
                  How do you want to show up today?
                </h3>
                <p className="text-muted-foreground font-body">
                  Breathe in. Breathe out.
                </p>
              </div>
              <BreathOrb size="md" />
            </div>
            <button onClick={() => navigate('/breathwork')} className="w-full py-3 px-6 bg-primary/80 hover:bg-primary text-primary-foreground rounded-xl font-medium transition-colors duration-200">
              Begin ritual
            </button>
          </div>

          {/* Recipe Card */}
          <div className="rounded-3xl p-6 glass">
            <h3 className="font-heading text-xl font-medium text-foreground mb-2">
              Your recipe for clarity
            </h3>
            <p className="text-muted-foreground font-body mb-4">
              Discover nourishing blends crafted for focus and flow.
            </p>
            <button onClick={() => navigate('/recipes')} className="py-2 px-4 bg-accent/80 hover:bg-accent text-accent-foreground rounded-lg font-medium transition-colors duration-200">
              Explore recipes
            </button>
          </div>

          {/* Evening Card */}
          <div className="rounded-3xl p-6 glass">
            <h3 className="font-heading text-xl font-medium text-foreground mb-2">
              End your day here
            </h3>
            <p className="text-muted-foreground font-body mb-4">
              Wind down with gentle reflections and restorative practices.
            </p>
            <button onClick={() => navigate('/meditate')} className="py-2 px-4 bg-secondary/80 hover:bg-secondary text-secondary-foreground rounded-lg font-medium transition-colors duration-200">
              Evening ritual
            </button>
          </div>

          {/* Streak Display */}
          <div className="glass rounded-3xl p-6 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 bg-white/10">
              <span className="text-2xl font-heading font-bold text-foreground">
                {currentUser.streak}
              </span>
            </div>
            <h4 className="font-heading text-lg font-medium text-foreground mb-1">
              Day Streak
            </h4>
            <p className="text-muted-foreground font-body text-sm">
              Keep the momentum flowing
            </p>
          </div>
        </div>

        {/* Quick Actions removed per request */}
      </div>
    </div>
  );
};

export default Home;