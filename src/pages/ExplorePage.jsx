import React, { useState, useMemo } from 'react';
import { 
  Search, ArrowUpDown, RotateCcw 
} from 'lucide-react';
import PlaceCard from '../components/PlaceCard';
import DataBadge from '../components/DataBadge';
import { PUNE_PLACES, CATEGORIES, NEIGHBOURHOODS } from '../data/punePlaces';

export default function ExplorePage({ 
  onViewPlaceDetails, 
  savedPlaceIds, 
  onToggleSave, 
  comparePlaceIds, 
  onToggleCompare,
  initialSearch = '',
  initialCategory = 'all'
}) {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedNeighbourhood, setSelectedNeighbourhood] = useState('All Neighbourhoods');
  const [budgetFilter, setBudgetFilter] = useState('all'); // 'all', 'free', 'under100', 'under500', 'above500'
  const [accessibilityOnly, setAccessibilityOnly] = useState(false);
  const [sortBy, setSortBy] = useState('recommended'); // 'recommended', 'rating', 'price_asc', 'price_desc', 'name'

  // Filter & Sort Logic
  const filteredPlaces = useMemo(() => {
    return PUNE_PLACES.filter((place) => {
      // 1. Text Search (name, description, neighbourhood, tags)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = place.name.toLowerCase().includes(query);
        const matchesDesc = place.description.toLowerCase().includes(query);
        const matchesNeighbourhood = place.neighbourhood.toLowerCase().includes(query);
        const matchesTags = place.tags.some(tag => tag.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesNeighbourhood && !matchesTags) {
          return false;
        }
      }

      // 2. Category
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'budget') {
          if (!place.isBudgetFriendly) return false;
        } else if (place.category !== selectedCategory) {
          return false;
        }
      }

      // 3. Neighbourhood
      if (selectedNeighbourhood !== 'All Neighbourhoods') {
        if (place.neighbourhood !== selectedNeighbourhood) {
          return false;
        }
      }

      // 4. Budget
      if (budgetFilter === 'free' && place.indicativePrice !== 0) return false;
      if (budgetFilter === 'under100' && place.indicativePrice > 100) return false;
      if (budgetFilter === 'under500' && place.indicativePrice > 500) return false;
      if (budgetFilter === 'above500' && place.indicativePrice <= 500) return false;

      // 5. Wheelchair Accessibility
      if (accessibilityOnly && !place.accessibility.wheelchairAccess) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price_asc') return a.indicativePrice - b.indicativePrice;
      if (sortBy === 'price_desc') return b.indicativePrice - a.indicativePrice;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0; // default order
    });
  }, [searchQuery, selectedCategory, selectedNeighbourhood, budgetFilter, accessibilityOnly, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedNeighbourhood('All Neighbourhoods');
    setBudgetFilter('all');
    setAccessibilityOnly(false);
    setSortBy('recommended');
  };

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'all' || 
    selectedNeighbourhood !== 'All Neighbourhoods' || budgetFilter !== 'all' || 
    accessibilityOnly || sortBy !== 'recommended';

  return (
    <div className="space-y-6 pb-12">
      
      {/* Page Title & Transparent Data Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DCE7F2] pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#183B5B] font-['Plus_Jakarta_Sans']">
            Discover Pune Places
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Explore heritage landmarks, restaurants, parks, and hidden urban gems
          </p>
        </div>

        <div className="flex items-center gap-2">
          <DataBadge type="sample" label="Ratings & Metrics are Seeded Demo Data" size="sm" />
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-2xl border border-[#DCE7F2] p-4 sm:p-5 shadow-xs space-y-4">
        
        {/* Search Input Row */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2864A6]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by monument, cafe, neighbourhood, or activity..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-[#DCE7F2] bg-[#EAF4FF]/30 focus:bg-white focus:outline-hidden focus:border-[#2864A6] focus:ring-2 focus:ring-[#78B8F5]/30 text-sm text-[#183B5B]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#183B5B] text-xs font-semibold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 sm:w-64">
            <ArrowUpDown className="w-4 h-4 text-[#2864A6] flex-shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-[#DCE7F2] bg-white text-xs font-semibold text-[#183B5B] focus:outline-hidden focus:border-[#2864A6]"
            >
              <option value="recommended">Sort: Curated Recommendation</option>
              <option value="rating">Sort: Highest Sample Rating</option>
              <option value="price_asc">Sort: Indicative Price (Low to High)</option>
              <option value="price_desc">Sort: Indicative Price (High to Low)</option>
              <option value="name">Sort: Name (A to Z)</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedCategory === cat.id
                  ? 'bg-[#2864A6] text-white border-[#2864A6] shadow-xs'
                  : 'bg-[#EAF4FF]/60 text-[#334155] border-[#DCE7F2] hover:bg-[#C7E2FF]/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Additional Secondary Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-xs">
          
          {/* Neighbourhood select */}
          <div className="flex items-center gap-2">
            <span className="text-[#64748B] font-medium whitespace-nowrap">Area:</span>
            <select
              value={selectedNeighbourhood}
              onChange={(e) => setSelectedNeighbourhood(e.target.value)}
              className="w-full py-1.5 px-2.5 rounded-lg border border-[#DCE7F2] bg-white text-[#183B5B] font-medium focus:outline-hidden"
            >
              {NEIGHBOURHOODS.map((area, idx) => (
                <option key={idx} value={area}>{area}</option>
              ))}
            </select>
          </div>

          {/* Budget tier */}
          <div className="flex items-center gap-2">
            <span className="text-[#64748B] font-medium whitespace-nowrap">Budget:</span>
            <select
              value={budgetFilter}
              onChange={(e) => setBudgetFilter(e.target.value)}
              className="w-full py-1.5 px-2.5 rounded-lg border border-[#DCE7F2] bg-white text-[#183B5B] font-medium focus:outline-hidden"
            >
              <option value="all">Any Cost</option>
              <option value="free">Free Admission Only</option>
              <option value="under100">Pocket Friendly (≤ ₹100)</option>
              <option value="under500">Moderate (≤ ₹500)</option>
              <option value="above500">Premium (&gt; ₹500)</option>
            </select>
          </div>

          {/* Wheelchair toggle & Reset */}
          <div className="flex items-center justify-between gap-2">
            <label className="flex items-center gap-1.5 cursor-pointer text-[#334155] select-none">
              <input
                type="checkbox"
                checked={accessibilityOnly}
                onChange={(e) => setAccessibilityOnly(e.target.checked)}
                className="rounded-sm border-slate-300 text-[#2864A6] focus:ring-[#78B8F5]"
              />
              <span className="font-medium">Wheelchair Accessible</span>
            </label>

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-[#2864A6] hover:text-[#183B5B] font-semibold flex items-center gap-1 text-[11px] underline"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

        </div>

      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-[#64748B]">
        <div>
          Showing <strong className="text-[#183B5B]">{filteredPlaces.length}</strong> of {PUNE_PLACES.length} places
        </div>
        {hasActiveFilters && (
          <span className="text-emerald-700 font-medium">Filters active</span>
        )}
      </div>

      {/* Places Grid */}
      {filteredPlaces.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map((place) => (
            <PlaceCard
              key={place.id}
              place={place}
              onViewDetails={onViewPlaceDetails}
              isSaved={savedPlaceIds.includes(place.id)}
              onToggleSave={onToggleSave}
              isInCompare={comparePlaceIds.includes(place.id)}
              onToggleCompare={onToggleCompare}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-[#DCE7F2] p-10 text-center space-y-4 max-w-md mx-auto shadow-xs">
          <div className="w-14 h-14 rounded-full bg-[#EAF4FF] text-[#2864A6] flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#183B5B] font-['Plus_Jakarta_Sans']">
              No matching places found
            </h3>
            <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
              We couldn't find any places matching your current search or filter combination. Try clearing your filters or exploring another category.
            </p>
          </div>
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#2864A6] hover:bg-[#1e5088] transition-all shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}

    </div>
  );
}
