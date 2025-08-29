import { useState } from 'react';
import { Search, Filter, ArrowLeft, Link } from 'lucide-react';
import { plants, recipes } from '@/data/seedData';
import { Plant } from '@/types';

const Plants = () => {
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Plants', 'Fungi'];
  
  const filteredPlants = plants.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plant.scientificName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || plant.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getPairedRecipes = (plantId: string) => {
    const plant = plants.find(p => p.id === plantId);
    if (!plant) return [];
    return recipes.filter(r => plant.pairedRecipes.includes(r.id));
  };

  if (selectedPlant) {
    const pairedRecipes = getPairedRecipes(selectedPlant.id);
    
    return (
      <div className="min-h-screen bg-background/10 pb-20">
        {/* Header */}
        <div className="px-6 pt-8 pb-4">
          <button
            onClick={() => setSelectedPlant(null)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Plants
          </button>
        </div>

        {/* Plant Hero */}
        <div className="px-6 mb-6">
          <div className="glass rounded-3xl p-6">
            <div className="mb-4">
              <h1 className="font-heading text-2xl font-semibold text-foreground mb-1">
                {selectedPlant.name}
              </h1>
              <p className="text-muted-foreground font-body italic text-sm mb-3">
                {selectedPlant.scientificName}
              </p>
              <span className="px-3 py-1 bg-nature/20 text-nature rounded-full text-sm font-medium">
                {selectedPlant.category}
              </span>
            </div>
            <p className="text-foreground/80 font-body">
              {selectedPlant.description}
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="px-6 mb-6">
          <div className="glass rounded-2xl p-6">
            <h3 className="font-heading text-lg font-medium text-foreground mb-4">
              Benefits
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedPlant.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-nature rounded-full flex-shrink-0" />
                  <span className="text-foreground/80 font-body text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Folklore */}
        <div className="px-6 mb-6">
          <div className="glass rounded-2xl p-6">
            <h3 className="font-heading text-lg font-medium text-foreground mb-3">
              Traditional Wisdom
            </h3>
            <p className="text-foreground/80 font-body text-sm leading-relaxed">
              {selectedPlant.folklore}
            </p>
          </div>
        </div>

        {/* Safety */}
        <div className="px-6 mb-6">
          <div className="glass rounded-2xl p-6">
            <h3 className="font-heading text-lg font-medium text-foreground mb-3">
              Safety Notes
            </h3>
            <p className="text-foreground/80 font-body text-sm leading-relaxed">
              {selectedPlant.safety}
            </p>
          </div>
        </div>

        {/* Paired Recipes */}
        {pairedRecipes.length > 0 && (
          <div className="px-6">
            <div className="glass rounded-2xl p-6">
              <h3 className="font-heading text-lg font-medium text-foreground mb-4">
                Pair with Recipe
              </h3>
              <div className="space-y-3">
                {pairedRecipes.map((recipe) => (
                  <div key={recipe.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <h4 className="font-medium text-foreground text-sm">{recipe.title}</h4>
                      <p className="text-muted-foreground text-xs">{recipe.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-accent/20 text-accent rounded text-xs">
                        {recipe.intent}
                      </span>
                      <button className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center" onClick={() => addActivity('plant')}>
                        <Link className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background/10 pb-20 overflow-x-hidden">
      {/* Header */}
      <div className="px-6 pt-8 pb-6">
        <h1 className="font-heading text-2xl font-semibold text-foreground mb-2">
          Plants
        </h1>
        <p className="text-muted-foreground font-body">
          Explore nature's wisdom and healing properties
        </p>
      </div>

      {/* Search */}
      <div className="px-6 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Search plants and fungi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-card/70 backdrop-blur-sm border border-border/20 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="px-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Category</span>
        </div>
        <div className="flex gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedCategory === category
                  ? 'bg-nature text-mist'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Plants Grid */}
      <div className="px-6">
        <div className="grid gap-4">
          {filteredPlants.map((plant) => (
            <div 
              key={plant.id} 
              onClick={() => setSelectedPlant(plant)}
              className="glass rounded-2xl p-4 cursor-pointer hover:bg-white/10 transition-colors duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-heading text-lg font-medium text-foreground mb-1">
                    {plant.name}
                  </h3>
                  <p className="text-muted-foreground font-body text-sm italic mb-2">
                    {plant.scientificName}
                  </p>
                  <p className="text-foreground/80 font-body text-sm line-clamp-2 mb-3">
                    {plant.description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {plant.benefits.slice(0, 2).map((benefit, index) => (
                    <span key={index} className="px-2 py-1 bg-nature/10 text-nature rounded text-xs">
                      {benefit}
                    </span>
                  ))}
                  {plant.benefits.length > 2 && (
                    <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                      +{plant.benefits.length - 2} more
                    </span>
                  )}
                </div>
                <span className="px-2 py-1 bg-accent/20 text-accent rounded-full text-xs font-medium">
                  {plant.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredPlants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground font-body">
              No plants found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Plants;