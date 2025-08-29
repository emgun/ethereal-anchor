import { BookOpen, Brain, Wind, ChefHat } from 'lucide-react';
import { BreathOrb } from '@/components/BreathOrb';
import { QuickAction } from '@/components/QuickAction';
import { currentUser } from '@/data/seedData';

const Home = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-hero flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-obsidian/60" />
        <div className="relative z-10 text-center px-6">
          <h1 className="font-heading text-3xl font-semibold text-mist mb-2">
            Welcome back, {currentUser.name}.
          </h1>
          <p className="text-mist/80 text-lg font-body">
            Your ritual begins here.
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 -mt-8 relative z-20">
        <div className="grid grid-cols-4 gap-3 mb-8">
          <QuickAction icon={BookOpen} label="Journal" path="/journal" />
          <QuickAction icon={Brain} label="Meditate" path="/meditate" />
          <QuickAction icon={Wind} label="Breathwork" path="/breathwork" />
          <QuickAction icon={ChefHat} label="Recipes" path="/recipes" />
        </div>

        {/* Main Cards */}
        <div className="space-y-6">
          {/* Breathwork Card */}
          <div className="bg-gradient-card rounded-3xl p-6 border border-border/20">
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
            <button className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors duration-200">
              Begin ritual
            </button>
          </div>

          {/* Recipe Card */}
          <div className="bg-gradient-card rounded-3xl p-6 border border-border/20">
            <h3 className="font-heading text-xl font-medium text-foreground mb-2">
              Your recipe for clarity
            </h3>
            <p className="text-muted-foreground font-body mb-4">
              Discover nourishing blends crafted for focus and flow.
            </p>
            <button className="py-2 px-4 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors duration-200">
              Explore recipes
            </button>
          </div>

          {/* Evening Card */}
          <div className="bg-gradient-card rounded-3xl p-6 border border-border/20">
            <h3 className="font-heading text-xl font-medium text-foreground mb-2">
              End your day here
            </h3>
            <p className="text-muted-foreground font-body mb-4">
              Wind down with gentle reflections and restorative practices.
            </p>
            <button className="py-2 px-4 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/90 transition-colors duration-200">
              Evening ritual
            </button>
          </div>

          {/* Streak Display */}
          <div className="bg-gradient-card rounded-3xl p-6 border border-border/20 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-heading font-bold text-primary">
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
      </div>
    </div>
  );
};

export default Home;