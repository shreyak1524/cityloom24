import React from 'react';
import { 
  Heart, Scale, MapPin, IndianRupee, 
  Accessibility, ArrowRight 
} from 'lucide-react';

export default function PlaceCard({ 
  place, 
  onViewDetails, 
  isSaved, 
  onToggleSave, 
  isInCompare, 
  onToggleCompare 
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#DCE7F2] shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col group hover:-translate-y-0.5">
      
      {/* Image container with badges & action overlays */}
      <div className="relative h-48 w-full overflow-hidden bg-[#C7E2FF]/30">
        <img 
          src={place.image} 
          alt={place.name} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
          <span className="bg-[#183B5B]/90 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full capitalize shadow-xs">
            {place.category}
          </span>
          {place.isBudgetFriendly && (
            <span className="bg-emerald-600/90 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-xs">
              Budget Pick
            </span>
          )}
        </div>

        {/* Top Right Save button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(place.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-xs transition-all shadow-md ${
            isSaved 
              ? 'bg-white text-rose-600 scale-105' 
              : 'bg-white/80 hover:bg-white text-slate-600 hover:text-rose-600'
          }`}
          title={isSaved ? 'Remove from saved' : 'Save place'}
          aria-label="Save place"
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-600 text-rose-600' : ''}`} />
        </button>

        {/* Price & Rating over the image bottom */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1 bg-[#183B5B]/80 backdrop-blur-xs px-2.5 py-1 rounded-lg">
            <IndianRupee className="w-3.5 h-3.5 text-[#78B8F5]" />
            <span className="font-bold text-sm">
              {place.indicativePrice === 0 ? 'Free' : `₹${place.indicativePrice}`}
            </span>
            <span className="text-[11px] text-sky-200 ml-0.5 hidden sm:inline">indicative</span>
          </div>

          <div 
            className="flex items-center gap-1 bg-[#183B5B]/80 backdrop-blur-xs px-2 py-1 rounded-lg text-amber-300 font-semibold"
            title="Sample demonstration rating"
          >
            <span>★</span>
            <span className="text-white text-xs">{place.rating}</span>
            <span className="text-[10px] text-sky-200 font-normal">sample</span>
          </div>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Location row */}
          <div className="flex items-center gap-1 text-xs text-[#64748B] mb-1">
            <MapPin className="w-3.5 h-3.5 text-[#2864A6] flex-shrink-0" />
            <span className="truncate">{place.neighbourhood}, Pune</span>
          </div>

          {/* Place title */}
          <h3 
            onClick={() => onViewDetails(place)}
            className="text-lg font-bold text-[#183B5B] hover:text-[#2864A6] transition-colors cursor-pointer line-clamp-1 font-['Plus_Jakarta_Sans']"
          >
            {place.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-[#334155] line-clamp-2 mt-1.5 leading-relaxed">
            {place.description}
          </p>
        </div>

        {/* Informative Attribute Pills */}
        <div className="space-y-2 pt-2 border-t border-[#DCE7F2]/80">
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            {/* Cleanliness */}
            <div className="flex items-center gap-1.5 text-[#334155]" title={`Cleanliness: ${place.cleanliness.level} (${place.cleanliness.description})`}>
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                place.cleanliness.level === 'High' ? 'bg-emerald-500' :
                place.cleanliness.level === 'Moderate' ? 'bg-amber-500' : 'bg-slate-400'
              }`} />
              <span className="text-[#64748B]">Cleanliness:</span>
              <span className="font-semibold">{place.cleanliness.level}</span>
            </div>

            {/* Accessibility */}
            <div className="flex items-center gap-1.5 text-[#334155]" title={place.accessibility.notes}>
              <Accessibility className={`w-3 h-3 flex-shrink-0 ${place.accessibility.wheelchairAccess ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span className="text-[#64748B]">Access:</span>
              <span className="font-semibold truncate">
                {place.accessibility.wheelchairAccess ? 'Ramped' : 'Steps'}
              </span>
            </div>
          </div>

          {/* Safety Status Pill */}
          <div className="flex items-center justify-between text-[11px] bg-[#EAF4FF] px-2.5 py-1 rounded-lg text-[#183B5B]">
            <span className="truncate" title={place.safety.safetyNotes}>
              Lighting: <strong>{place.safety.lighting}</strong> • {place.safety.crowdLevel.split('&')[0]}
            </span>
            <span className="text-[10px] text-[#2864A6] bg-[#C7E2FF]/70 px-1.5 py-0.2 rounded font-medium flex-shrink-0">
              Sample
            </span>
          </div>
        </div>

        {/* Card Actions Footer */}
        <div className="pt-2 flex items-center justify-between gap-2 border-t border-[#DCE7F2]/80">
          <button
            onClick={() => onToggleCompare(place.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
              isInCompare 
                ? 'bg-[#C7E2FF] border-[#78B8F5] text-[#183B5B]' 
                : 'bg-white border-[#DCE7F2] text-[#334155] hover:bg-[#EAF4FF] hover:border-[#78B8F5]'
            }`}
            title="Add to side-by-side comparison"
          >
            <Scale className="w-3.5 h-3.5 text-[#2864A6]" />
            <span>{isInCompare ? 'Comparing' : 'Compare'}</span>
          </button>

          <button
            onClick={() => onViewDetails(place)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#2864A6] hover:text-[#183B5B] transition-colors py-1.5 px-2 hover:bg-[#EAF4FF] rounded-lg"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
