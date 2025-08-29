import { useState } from 'react';
import { Clock, Users, ArrowLeft, Heart } from 'lucide-react';
import { recipes } from '@/data/seedData';
import { Recipe } from '@/types';

const Recipes = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedIntent, setSelectedIntent] = useState<string>('All');
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);

  const intents = ['All', 'Calm', 'Focus', 'Energy', 'Clarity', 'Grounding'];
  
  const filteredRecipes = selectedIntent === 'All' 
    ? recipes 
    : recipes.filter(r => r.intent === selectedIntent);

  const handleSaveRecipe = (recipeId: string) => {
    setSavedRecipes(prev => 
      prev.includes(recipeId) 
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  if (selectedRecipe) {
    return (
      <div className="min-h-screen bg-background pb-20">
        {/* Header */}
        <div className="px-6 pt-8 pb-4">
          <button
            onClick={() => setSelectedRecipe(null)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Recipes
          </button>
        </div>

        {/* Recipe Hero */}
        <div className="px-6 mb-6">
          <div className="bg-gradient-card rounded-3xl p-6 border border-border/20">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="font-heading text-2xl font-semibold text-foreground mb-2">
                  {selectedRecipe.title}
                </h1>
                <p className="text-muted-foreground font-body mb-4">
                  {selectedRecipe.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground font-body">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {selectedRecipe.prepTime} min
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {selectedRecipe.servings} serving{selectedRecipe.servings > 1 ? 's' : ''}
                  </div>
                  <span className="px-2 py-1 bg-accent/20 text-accent rounded-full text-xs">
                    {selectedRecipe.intent}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleSaveRecipe(selectedRecipe.id)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 ${
                  savedRecipes.includes(selectedRecipe.id)
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                <Heart className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <div className="px-6 mb-6">
          <div className="bg-card rounded-2xl p-6 border border-border/20">
            <h3 className="font-heading text-lg font-medium text-foreground mb-4">
              Ingredients
            </h3>
            <ul className="space-y-3">
              {selectedRecipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                  <span className="text-foreground/80 font-body">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Steps */}
        <div className="px-6 mb-6">
          <div className="bg-card rounded-2xl p-6 border border-border/20">
            <h3 className="font-heading text-lg font-medium text-foreground mb-4">
              Preparation
            </h3>
            <ol className="space-y-4">
              {selectedRecipe.steps.map((step, index) => (
                <li key={index} className="flex gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-foreground/80 font-body pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Save Action */}
        <div className="px-6">
          <button
            onClick={() => handleSaveRecipe(selectedRecipe.id)}
            className={`w-full py-3 px-6 rounded-xl font-medium transition-colors duration-200 ${
              savedRecipes.includes(selectedRecipe.id)
                ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                : 'bg-primary text-primary-foreground hover:bg-primary/90'
            }`}
          >
            {savedRecipes.includes(selectedRecipe.id) ? 'Saved to My Rituals' : 'Save to My Rituals'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="px-6 pt-8 pb-6">
        <h1 className="font-heading text-2xl font-semibold text-foreground mb-2">
          Recipes
        </h1>
        <p className="text-muted-foreground font-body">
          Nourishing blends for every intention
        </p>
      </div>

      {/* Intent Filter */}
      <div className="px-6 mb-6">
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

      {/* Recipes Grid */}
      <div className="px-6">
        <div className="grid sm:grid-cols-2 gap-4">
          {filteredRecipes.map((recipe) => (
            <div 
              key={recipe.id} 
              onClick={() => setSelectedRecipe(recipe)}
              className="bg-card rounded-2xl p-4 border border-border/20 cursor-pointer hover:bg-card/80 transition-colors duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-heading text-lg font-medium text-foreground mb-1">
                    {recipe.title}
                  </h3>
                  <p className="text-muted-foreground font-body text-sm mb-2 line-clamp-2">
                    {recipe.description}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSaveRecipe(recipe.id);
                  }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                    savedRecipes.includes(recipe.id)
                      ? 'bg-accent/20 text-accent'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  <Heart className="h-4 w-4" />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-muted-foreground font-body">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {recipe.prepTime}m
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {recipe.servings}
                  </div>
                </div>
                <span className="px-2 py-1 bg-accent/20 text-accent rounded-full text-xs font-medium">
                  {recipe.intent}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recipes;