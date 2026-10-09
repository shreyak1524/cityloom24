import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { PUNE_PLACES } from '../data/punePlaces';
import { getRecentSearches, addRecentSearch } from '../utils/storage';

export default function QuickSearchModal({ 
  isOpen, 
  onClose, 
  onSelectPlace, 
  onExploreSearch 
}) {
  const [query, setQuery] = useState('');
  const [recentSearches] = useState(() => getRecentSearches());
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setQuery('');
    onClose();
  };

  // Filter matching places
  const matchingPlaces = query.trim()
    ? PUNE_PLACES.filter(p => {
        const q = query.toLowerCase().trim();
        return p.name.toLowerCase().includes(q) ||
               p.neighbourhood.toLowerCase().includes(q) ||
               p.category.toLowerCase().includes(q) ||
               p.tags.some(t => t.toLowerCase().includes(q));
      }).slice(0, 5)
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      addRecentSearch(query);
      onExploreSearch(query);
      handleClose();
    }
  };

  const handlePickPlace = (place) => {
    addRecentSearch(place.name);
    onSelectPlace(place);
    handleClose();
  };

  const handlePickRecent = (recentQuery) => {
    onExploreSearch(recentQuery);
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24 animate-fade-in">
      <div 
        className="bg-white max-w-xl w-full rounded-2xl shadow-2xl border border-[#DCE7F2] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="flex items-center px-4 py-3.5 border-b border-[#DCE7F2] gap-3">
          <Search className="w-5 h-5 text-[#2864A6]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Pune monuments, cafes, tekdis, budgets..."
            className="flex-1 text-sm text-[#183B5B] placeholder-[#64748B] focus:outline-hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-xs text-[#64748B] hover:text-[#183B5B]"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </form>

        {/* Results Area */}
        <div className="max-h-80 overflow-y-auto p-4 space-y-4 text-xs">
          {matchingPlaces.length > 0 ? (
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block">
                Matching Places ({matchingPlaces.length})
              </span>
              {matchingPlaces.map((place) => (
                <div
                  key={place.id}
                  onClick={() => handlePickPlace(place)}
                  className="p-2.5 rounded-xl border border-[#DCE7F2] hover:bg-[#EAF4FF] hover:border-[#78B8F5] cursor-pointer transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img 
                      src={place.image} 
                      alt="" 
                      className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-bold text-[#183B5B] group-hover:text-[#2864A6] truncate font-['Plus_Jakarta_Sans']">
                        {place.name}
                      </h4>
                      <p className="text-[11px] text-[#64748B] truncate">
                        {place.neighbourhood} • <span className="capitalize">{place.category}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="font-bold text-[#183B5B]">
                      {place.indicativePrice === 0 ? 'Free' : `₹${place.indicativePrice}`}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#2864A6] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          ) : query.trim() ? (
            <div className="text-center py-6 text-slate-500">
              <p>No places found matching "{query}".</p>
              <button
                type="button"
                onClick={handleSearchSubmit}
                className="mt-2 text-[#2864A6] font-semibold hover:underline"
              >
                Search all listings for "{query}" →
              </button>
            </div>
          ) : (
            /* Recent searches & Suggested tags */
            <div className="space-y-3">
              {recentSearches.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block mb-1.5">
                    Recent Searches
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {recentSearches.map((term, idx) => (
                      <button
                        key={idx}
                        onClick={() => handlePickRecent(term)}
                        className="bg-[#EAF4FF] hover:bg-[#C7E2FF] text-[#183B5B] px-2.5 py-1 rounded-lg text-xs font-medium border border-[#DCE7F2] transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block mb-1.5">
                  Popular Exploration Themes
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['FC Road Cafes', 'Sinhagad Fort Trek', 'Japanese Garden', 'Under ₹150 Budget', 'Freedom Movement'].map((tag, idx) => (
                    <button
                      key={idx}
                      onClick={() => handlePickRecent(tag)}
                      className="bg-white hover:bg-slate-50 text-[#334155] px-2.5 py-1 rounded-lg text-xs border border-[#DCE7F2] transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-[#DCE7F2] flex items-center justify-between text-[11px] text-[#64748B]">
          <span>Tip: Press Enter to perform comprehensive explore search</span>
          <span>CityLoom Pune Seed</span>
        </div>
      </div>
    </div>
  );
}
