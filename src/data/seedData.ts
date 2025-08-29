import { User, JournalEntry, Meditation, BreathPattern, Recipe, Plant } from '@/types';

export const currentUser: User = {
  id: '1',
  name: 'Luna',
  email: 'luna@example.com',
  theme: 'light',
  timezone: 'America/New_York',
  morningReminderTime: '08:00',
  eveningReminderTime: '21:00',
  streak: 7,
  lastActivityDate: new Date().toISOString().split('T')[0]
};

export const journalEntries: JournalEntry[] = [
  {
    id: '1',
    userId: '1',
    date: new Date().toISOString().split('T')[0],
    prompt: 'How do you want to show up today?',
    mood: 4,
    text: 'Today I want to be present and grounded. I feel grateful for the small moments.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const meditations: Meditation[] = [
  {
    id: '1',
    title: 'Morning Clarity',
    description: 'A gentle awakening meditation to center your mind',
    duration: 10,
    intent: 'Focus',
    instructor: 'Maya Chen'
  },
  {
    id: '2',
    title: 'Ocean Depths',
    description: 'Deep relaxation guided by ocean waves',
    duration: 15,
    intent: 'Calm',
    instructor: 'River Stone'
  },
  {
    id: '3',
    title: 'Forest Energy',
    description: 'Energizing meditation inspired by ancient trees',
    duration: 12,
    intent: 'Energy',
    instructor: 'Cedar Wilde'
  },
  {
    id: '4',
    title: 'Release & Let Go',
    description: 'A practice for releasing what no longer serves',
    duration: 18,
    intent: 'Release',
    instructor: 'Sage Moon'
  }
];

export const breathPatterns: BreathPattern[] = [
  {
    id: '1',
    name: 'Box Breathing',
    description: 'A grounding 4-4-4-4 pattern for balance',
    pattern: [4, 4, 4, 4],
    cycles: 8,
    instructions: 'Inhale for 4, hold for 4, exhale for 4, hold for 4'
  },
  {
    id: '2',
    name: '4-7-8 Breath',
    description: 'A calming pattern for deep relaxation',
    pattern: [4, 7, 8, 0],
    cycles: 6,
    instructions: 'Inhale for 4, hold for 7, exhale for 8'
  },
  {
    id: '3',
    name: 'Alternate Nostril',
    description: 'A balancing pranayama technique',
    pattern: [4, 2, 4, 2],
    cycles: 10,
    instructions: 'Breathe through one nostril, then switch'
  }
];

export const recipes: Recipe[] = [
  {
    id: '1',
    title: 'Golden Milk Elixir',
    description: 'A warming turmeric blend for evening calm',
    intent: 'Calm',
    ingredients: [
      '1 cup coconut milk',
      '1 tsp turmeric powder',
      '1/2 tsp cinnamon',
      '1/4 tsp ginger powder',
      '1 tbsp honey',
      'Pinch of black pepper'
    ],
    steps: [
      'Warm coconut milk in a small pan',
      'Whisk in turmeric, cinnamon, and ginger',
      'Simmer for 3-4 minutes',
      'Remove from heat and stir in honey',
      'Add black pepper and serve warm'
    ],
    prepTime: 8,
    servings: 1,
    tags: ['warm', 'anti-inflammatory', 'evening']
  },
  {
    id: '2',
    title: 'Clarity Tea Blend',
    description: 'Herbaceous blend for mental focus',
    intent: 'Focus',
    ingredients: [
      '1 tsp dried rosemary',
      '1 tsp dried peppermint',
      '1/2 tsp gotu kola',
      '1 cup hot water',
      'Lemon slice'
    ],
    steps: [
      'Combine herbs in a tea strainer',
      'Pour hot water over herbs',
      'Steep for 5-7 minutes',
      'Add lemon slice',
      'Sip mindfully while warm'
    ],
    prepTime: 10,
    servings: 1,
    tags: ['herbal', 'focus', 'morning']
  },
  {
    id: '3',
    title: 'Energy Smoothie Bowl',
    description: 'Vibrant bowl to awaken your senses',
    intent: 'Energy',
    ingredients: [
      '1 frozen mango',
      '1/2 banana',
      '1 cup coconut water',
      '1 tbsp chia seeds',
      '1 tsp spirulina',
      'Fresh berries for topping'
    ],
    steps: [
      'Blend frozen mango, banana, and coconut water',
      'Add spirulina and blend until smooth',
      'Pour into a bowl',
      'Top with chia seeds and berries',
      'Eat immediately for best texture'
    ],
    prepTime: 5,
    servings: 1,
    tags: ['raw', 'energizing', 'morning']
  }
];

export const plants: Plant[] = [
  {
    id: '1',
    name: 'Ashwagandha',
    scientificName: 'Withania somnifera',
    category: 'Plants',
    benefits: ['Stress reduction', 'Sleep support', 'Energy balance'],
    folklore: 'Known as "Indian Winter Cherry," traditionally used by warriors for strength and vitality.',
    safety: 'Generally safe for most adults. Consult healthcare provider if pregnant or on medications.',
    pairedRecipes: ['1'],
    description: 'An adaptogenic herb that helps the body manage stress and restore balance.'
  },
  {
    id: '2',
    name: 'Reishi Mushroom',
    scientificName: 'Ganoderma lucidum',
    category: 'Fungi',
    benefits: ['Immune support', 'Sleep quality', 'Mental calm'],
    folklore: 'Called the "Mushroom of Immortality" in ancient Chinese medicine.',
    safety: 'Safe for most people. May interact with blood thinning medications.',
    pairedRecipes: ['1'],
    description: 'A powerful adaptogenic mushroom revered for its calming and immune-supporting properties.'
  },
  {
    id: '3',
    name: 'Peppermint',
    scientificName: 'Mentha × piperita',
    category: 'Plants',
    benefits: ['Digestive support', 'Mental clarity', 'Cooling'],
    folklore: 'Ancient Greeks believed peppermint could increase mental clarity and focus.',
    safety: 'Generally safe. Avoid if you have GERD or gallstones.',
    pairedRecipes: ['2'],
    description: 'A refreshing herb that invigorates the senses and supports digestive wellness.'
  },
  {
    id: '4',
    name: 'Lion\'s Mane',
    scientificName: 'Hericium erinaceus',
    category: 'Fungi',
    benefits: ['Cognitive function', 'Nerve health', 'Mental clarity'],
    folklore: 'Buddhist monks used Lion\'s Mane tea to enhance their focus during meditation.',
    safety: 'Generally safe. May cause mild digestive upset in sensitive individuals.',
    pairedRecipes: ['2'],
    description: 'A unique mushroom that resembles a white waterfall, prized for cognitive enhancement.'
  }
];