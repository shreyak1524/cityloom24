import React, { useState } from 'react';
import { 
  Sparkles, Search, ArrowRight 
} from 'lucide-react';
import DataBadge from '../components/DataBadge';
import { PUNE_CULTURE_STORIES, CULTURE_CATEGORIES } from '../data/cultureData';
import { PUNE_PLACES } from '../data/punePlaces';

export default function CulturePage({ onViewPlaceDetails, onSelectTab }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter cultural stories
  const filteredStories = PUNE_CULTURE_STORIES.filter(story => {
    // 1. Category
    if (selectedCategory !== 'all' && story.category !== selectedCategory) {
      return false;
    }
    // 2. Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = story.title.toLowerCase().includes(q);
      const matchSub = story.subtitle.toLowerCase().includes(q);
      const matchSummary = story.summary.toLowerCase().includes(q);
      const matchFacts = story.keyFacts.some(f => f.toLowerCase().includes(q));
      if (!matchTitle && !matchSub && !matchSummary && !matchFacts) {
        return false;
      }
    }
    return true;
  });

  const handleOpenPlace = (placeId) => {
    const place = PUNE_PLACES.find(p => p.id === placeId);
    if (place) {
      onViewPlaceDetails(place);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DCE7F2] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#183B5B] font-['Plus_Jakarta_Sans']">
              Pune Cultural Archives & Living Heritage
            </h1>
            <DataBadge type="verified" label="Curated Historical Archives" size="sm" />
          </div>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Discover the stories, architecture, and living traditions that shaped Maharashtra's cultural capital
          </p>
        </div>

        <button
          onClick={() => onSelectTab('explore', { category: 'heritage' })}
          className="text-xs font-semibold text-[#2864A6] hover:text-[#183B5B] flex items-center gap-1.5"
        >
          <span>Explore All Heritage Places</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-[#183B5B] via-[#2864A6] to-[#183B5B] text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold text-[#C7E2FF] uppercase tracking-wider">
            Cultural Tapestry of Pune
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-['Plus_Jakarta_Sans'] text-white">
            From the 8th Century Basalt Sanctuaries to the Freedom Struggle
          </h2>
          <p className="text-xs sm:text-sm text-sky-100 leading-relaxed">
            Nicknamed the "Oxford of the East" and the heart of the Maratha Empire, Pune's historic lanes (Peths) preserve centuries of courageous battles, philosophical discourses, Sarvajanik Ganeshotsav revolutions, and distinctive food culture.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-[#DCE7F2] p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2864A6]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search historical facts, Peshwas, Tilak, or traditions..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#DCE7F2] text-xs text-[#183B5B] focus:outline-hidden focus:border-[#2864A6]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {CULTURE_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  selectedCategory === cat.id
                    ? 'bg-[#2864A6] text-white border-[#2864A6]'
                    : 'bg-[#EAF4FF]/50 text-[#334155] border-[#DCE7F2] hover:bg-[#C7E2FF]/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStories.map((story) => (
          <div 
            key={story.id}
            className="bg-white rounded-2xl border border-[#DCE7F2] shadow-xs overflow-hidden flex flex-col justify-between hover:border-[#78B8F5] transition-all group hover:-translate-y-0.5"
          >
            <div>
              {/* Image banner */}
              <div className="relative h-44 w-full overflow-hidden bg-[#C7E2FF]/30">
                <img 
                  src={story.image} 
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
                
                <div className="absolute top-3 left-3">
                  <span className="bg-[#183B5B]/90 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-xs">
                    {story.categoryLabel}
                  </span>
                </div>

                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <span className="text-[11px] text-sky-200 block font-medium">
                    Era: {story.period}
                  </span>
                </div>
              </div>

              {/* Story Body */}
              <div className="p-4 sm:p-5 space-y-3">
                <div>
                  <h3 className="text-base font-bold text-[#183B5B] group-hover:text-[#2864A6] transition-colors font-['Plus_Jakarta_Sans'] leading-snug">
                    {story.title}
                  </h3>
                  <span className="text-xs text-[#2864A6] font-medium block mt-0.5">
                    {story.subtitle}
                  </span>
                </div>

                <p className="text-xs text-[#334155] leading-relaxed">
                  {story.summary}
                </p>

                {/* Key Facts Bullet points */}
                <div className="p-3 rounded-xl bg-[#EAF4FF]/70 border border-[#DCE7F2] space-y-1.5">
                  <span className="text-[11px] font-bold text-[#183B5B] flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#2864A6]" />
                    <span>Historical Insights & Highlights</span>
                  </span>
                  <ul className="space-y-1 text-[11px] text-[#334155] list-disc list-inside">
                    {story.keyFacts.map((fact, idx) => (
                      <li key={idx} className="leading-snug">{fact}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Card Action Link */}
            <div className="p-4 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between text-xs">
              <span className="text-[#64748B] text-[11px]">
                {story.coordinates.lat.toFixed(3)}°N, {story.coordinates.lng.toFixed(3)}°E
              </span>
              
              <button
                onClick={() => handleOpenPlace(story.relatedPlaceId)}
                className="font-bold text-[#2864A6] hover:text-[#183B5B] flex items-center gap-1 transition-colors group-hover:underline"
              >
                <span>Explore Site Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
