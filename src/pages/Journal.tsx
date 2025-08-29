import { useState } from 'react';
import { Plus, Edit3, Trash2 } from 'lucide-react';
import { journalEntries as initialEntries } from '@/data/seedData';
import { JournalEntry } from '@/types';

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>(initialEntries);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [formData, setFormData] = useState({
    mood: 3 as 1 | 2 | 3 | 4 | 5,
    text: ''
  });

  const todayPrompt = "How do you want to show up today?";

  const handleSubmit = () => {
    if (selectedEntry) {
      // Update existing entry
      setEntries(prev => prev.map(entry => 
        entry.id === selectedEntry.id
          ? { ...entry, mood: formData.mood, text: formData.text, updatedAt: new Date().toISOString() }
          : entry
      ));
    } else {
      // Create new entry
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        userId: '1',
        date: new Date().toISOString().split('T')[0],
        prompt: todayPrompt,
        mood: formData.mood,
        text: formData.text,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setEntries(prev => [newEntry, ...prev]);
    }
    
    setIsCreating(false);
    setSelectedEntry(null);
    setFormData({ mood: 3, text: '' });
  };

  const handleDelete = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const moodEmojis = ['😢', '😕', '😐', '🙂', '😊'];

  if (isCreating || selectedEntry) {
    return (
      <div className="min-h-screen bg-background pb-20 px-6 pt-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <button
              onClick={() => {
                setIsCreating(false);
                setSelectedEntry(null);
                setFormData({ mood: 3, text: '' });
              }}
              className="text-muted-foreground hover:text-foreground mb-4"
            >
              ← Back to Journal
            </button>
            <h1 className="font-heading text-2xl font-semibold text-foreground mb-2">
              {selectedEntry ? 'Edit Entry' : 'New Entry'}
            </h1>
            <p className="text-muted-foreground font-body">
              {todayPrompt}
            </p>
          </div>

          {/* Mood Selector */}
          <div className="bg-card rounded-2xl p-6 mb-6 border border-border/20">
            <h3 className="font-medium text-foreground mb-4">How are you feeling?</h3>
            <div className="flex justify-between">
              {[1, 2, 3, 4, 5].map((mood) => (
                <button
                  key={mood}
                  onClick={() => setFormData(prev => ({ ...prev, mood: mood as 1 | 2 | 3 | 4 | 5 }))}
                  className={`w-12 h-12 rounded-full text-2xl transition-all duration-200 ${
                    formData.mood === mood
                      ? 'bg-primary text-primary-foreground transform scale-110'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  {moodEmojis[mood - 1]}
                </button>
              ))}
            </div>
          </div>

          {/* Text Entry */}
          <div className="bg-card rounded-2xl p-6 mb-6 border border-border/20">
            <textarea
              value={formData.text}
              onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
              placeholder="Share your thoughts..."
              className="w-full h-32 bg-transparent border-none outline-none resize-none text-foreground placeholder:text-muted-foreground font-body"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!formData.text.trim()}
            className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {selectedEntry ? 'Update Entry' : 'Save Entry'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="px-6 pt-8 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-heading text-2xl font-semibold text-foreground">
            Journal
          </h1>
          <button
            onClick={() => setIsCreating(true)}
            className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors duration-200"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
        <p className="text-muted-foreground font-body">
          Tap to journal your thoughts and reflections
        </p>
      </div>

      {/* Today's Prompt */}
      <div className="px-6 mb-6">
        <div className="bg-gradient-card rounded-2xl p-6 border border-border/20">
          <h3 className="font-heading text-lg font-medium text-foreground mb-2">
            Today's Reflection
          </h3>
          <p className="text-muted-foreground font-body mb-4">
            {todayPrompt}
          </p>
          <button
            onClick={() => setIsCreating(true)}
            className="py-2 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
          >
            Begin writing
          </button>
        </div>
      </div>

      {/* Entries List */}
      <div className="px-6">
        <h3 className="font-heading text-lg font-medium text-foreground mb-4">
          Previous Entries
        </h3>
        <div className="space-y-4">
          {entries.map((entry) => (
            <div key={entry.id} className="bg-card rounded-2xl p-4 border border-border/20">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{moodEmojis[entry.mood - 1]}</span>
                  <span className="text-sm text-muted-foreground font-body">
                    {new Date(entry.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedEntry(entry);
                      setFormData({ mood: entry.mood, text: entry.text });
                    }}
                    className="p-1 text-muted-foreground hover:text-foreground"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="p-1 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="text-foreground/80 font-body text-sm line-clamp-3">
                {entry.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Journal;