import { useState } from 'react';
import { Play, Pause, Filter } from 'lucide-react';
import { meditations } from '@/data/seedData';
import { Meditation } from '@/types';
import { useRitual } from '@/context/RitualContext';
import { CinematicBackground } from '@/components/CinematicBackground';

const Meditate = () => {
  const [selectedIntent, setSelectedIntent] = useState<string>('All');
  const [currentMeditation, setCurrentMeditation] = useState<Meditation | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { addActivity } = useRitual();

  const intents = ['All', 'Calm', 'Focus', 'Energy', 'Release'];
  
  const filteredMeditations = selectedIntent === 'All' 
    ? meditations 
    : meditations.filter(m => m.intent === selectedIntent);

  const handlePlay = (meditation: Meditation) => {
    if (currentMeditation?.id === meditation.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentMeditation(meditation);
      setIsPlaying(true);
    }
  };

  if (currentMeditation && isPlaying) {
    return (
      <div className="min-h-screen bg-gradient-hero flex flex-col">
        <div className="absolute inset-0 bg-obsidian/70" />
        
        {/* Header */}
        <div className="relative z-10 px-6 pt-8 pb-4">
          <button
            onClick={() => {
              setIsPlaying(false);
              setCurrentMeditation(null);
              addActivity('meditation');
            }}
            className="text-mist/80 hover:text-mist mb-4"
          >
            ← Back to Meditations
          </button>
        </div>

        {/* Player */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="w-48 h-48 bg-gradient-breath rounded-full mb-8 flex items-center justify-center">
            <div className="w-40 h-40 bg-mist/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <div className="w-32 h-32 bg-mist/30 rounded-full" />
            </div>
          </div>
          
          <h2 className="font-heading text-2xl font-semibold text-mist mb-2">
            {currentMeditation.title}
          </h2>
          <p className="text-mist/80 font-body mb-1">
            {currentMeditation.instructor}
          </p>
          <p className="text-mist/60 font-body text-sm mb-8">
            {currentMeditation.duration} minutes • {currentMeditation.intent}
          </p>

          {/* Controls */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 bg-mist text-obsidian rounded-full flex items-center justify-center hover:bg-mist/90 transition-colors duration-200"
            >
              {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
            </button>
          </div>

          {/* Progress */}
          <div className="w-full max-w-xs mt-8">
            <div className="flex justify-between text-mist/60 font-body text-sm mb-2">
              <span>2:30</span>
              <span>{currentMeditation.duration}:00</span>
            </div>
            <div className="w-full h-1 bg-mist/20 rounded-full">
              <div className="w-1/4 h-full bg-mist rounded-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background/10 pb-20">
      {/* Minimal header without card backgrounds */}
      <div className="px-6 pt-8 pb-4">
        <h1 className="font-heading text-2xl font-semibold text-foreground mb-1">Meditate</h1>
        <p className="text-muted-foreground font-body">Find your center.</p>
      </div>

      {/* Intent Filter */}
      <div className="px-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Filter by intent</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {intents.map((intent) => (
            <button
              key={intent}
              onClick={() => setSelectedIntent(intent)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                selectedIntent === intent
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {intent}
            </button>
          ))}
        </div>
      </div>

      {/* Meditations Grid */}
      <div className="px-6">
        <div className="grid gap-4">
          {filteredMeditations.map((meditation) => (
            <div key={meditation.id} className="glass rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-heading text-lg font-medium text-foreground mb-1">
                    {meditation.title}
                  </h3>
                  <p className="text-muted-foreground font-body text-sm mb-2">
                    {meditation.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground font-body">
                    <span>{meditation.duration} min</span>
                    <span>•</span>
                    <span>{meditation.intent}</span>
                    {meditation.instructor && (
                      <>
                        <span>•</span>
                        <span>{meditation.instructor}</span>
                      </>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handlePlay(meditation)}
                  className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors duration-200 ml-4"
                >
                  {currentMeditation?.id === meditation.id && isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5 ml-0.5" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Meditate;