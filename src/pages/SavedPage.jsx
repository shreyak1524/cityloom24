import React from 'react';
import { 
  Heart, ArrowRight, Compass 
} from 'lucide-react';
import PlaceCard from '../components/PlaceCard';
import { PUNE_PLACES } from '../data/punePlaces';

export default function SavedPage({ 
  savedPlaceIds, 
  onToggleSave, 
  onViewPlaceDetails, 
  comparePlaceIds, 
  onToggleCompare, 
  onSelectTab 
}) {
  const savedPlaces = PUNE_PLACES.filter(p => savedPlaceIds.includes(p.id));

  // Category counts
  const categoryCounts = savedPlaces.reduce((acc, place) => {
    acc[place.category] = (acc[place.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DCE7F2] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#183B5B] font-['Plus_Jakarta_Sans']">
              My Saved Favourites
            </h1>
            <span className="bg-[#C7E2FF] text-[#183B5B] text-xs font-bold px-2.5 py-0.5 rounded-full">
              {savedPlaces.length} Saved
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Bookmarked places preserved in your browser's local storage across sessions
          </p>
        </div>

        {savedPlaces.length > 0 && (
          <button
            onClick={() => onSelectTab('explore')}
            className="text-xs font-semibold text-[#2864A6] hover:text-[#183B5B] flex items-center gap-1.5"
          >
            <span>Discover More Places</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {savedPlaces.length > 0 ? (
        <div className="space-y-6">
          
          {/* Summary Strip */}
          <div className="bg-white rounded-2xl border border-[#DCE7F2] p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-[#183B5B]">Collection Breakdown:</span>
              {Object.entries(categoryCounts).map(([cat, count]) => (
                <span key={cat} className="bg-[#EAF4FF] text-[#2864A6] px-2.5 py-1 rounded-lg font-semibold capitalize border border-[#DCE7F2]">
                  {cat}: {count}
                </span>
              ))}
            </div>

            <div className="text-[#64748B]">
              Ready to compare? Click "Compare" on any saved place.
            </div>
          </div>

          {/* Places Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedPlaces.map((place) => (
              <PlaceCard
                key={place.id}
                place={place}
                onViewDetails={onViewPlaceDetails}
                isSaved={true}
                onToggleSave={onToggleSave}
                isInCompare={comparePlaceIds.includes(place.id)}
                onToggleCompare={onToggleCompare}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-[#DCE7F2] p-12 text-center space-y-4 max-w-md mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#183B5B] font-['Plus_Jakarta_Sans']">
              No saved places yet
            </h3>
            <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
              When exploring Pune landmarks, tap the heart icon on any place card or detail page to bookmark it here for your itinerary.
            </p>
          </div>
          <button
            onClick={() => onSelectTab('explore')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#2864A6] hover:bg-[#1e5088] transition-all shadow-xs"
          >
            <Compass className="w-4 h-4" />
            <span>Start Exploring Pune</span>
          </button>
        </div>
      )}

    </div>
  );
}
