export interface User {
  id: string;
  name: string;
  email: string;
  theme: 'light' | 'dark';
  timezone: string;
  morningReminderTime?: string;
  eveningReminderTime?: string;
  streak: number;
  lastActivityDate?: string;
}

export interface JournalEntry {
  id: string;
  userId: string;
  date: string;
  prompt: string;
  mood: 1 | 2 | 3 | 4 | 5;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export interface Meditation {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  intent: 'Calm' | 'Focus' | 'Energy' | 'Release';
  audioUrl?: string;
  coverImage?: string;
  instructor?: string;
}

export interface BreathPattern {
  id: string;
  name: string;
  description: string;
  pattern: number[]; // [inhale, hold1, exhale, hold2]
  cycles: number;
  instructions: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  intent: 'Calm' | 'Focus' | 'Energy' | 'Release' | 'Clarity' | 'Grounding';
  ingredients: string[];
  steps: string[];
  prepTime: number; // in minutes
  servings: number;
  image?: string;
  tags: string[];
}

export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  category: 'Plants' | 'Fungi';
  benefits: string[];
  folklore: string;
  safety: string;
  image?: string;
  pairedRecipes: string[]; // Recipe IDs
  description: string;
}

export interface DailyActivity {
  date: string;
  journalComplete: boolean;
  breathworkComplete: boolean;
  meditationComplete: boolean;
}