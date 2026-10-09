import React from 'react';
import { 
  X, Heart, Scale, MapPin, Clock, IndianRupee, 
  Sparkles, Accessibility, ShieldCheck, 
  Bus, Car, Eye 
} from 'lucide-react';
import DataBadge from './DataBadge';

export default function PlaceDetailModal({ 
  place, 
  isOpen, 
  onClose, 
  isSaved, 
  onToggleSave, 
  isInCompare, 
  onToggleCompare, 
  onNavigateToMap 
}) {
  if (!isOpen || !place) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div 
        className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-[#DCE7F2] overflow-hidden relative max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header with Image */}
        <div className="relative h-56 sm:h-72 w-full overflow-hidden bg-[#C7E2FF]/30 flex-shrink-0">
          <img 
            src={place.image} 
            alt={place.name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              // fallback if Unsplash fails
              e.target.src = 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
          
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white text-[#183B5B] p-2 rounded-full shadow-md transition-all hover:scale-105"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges on Image */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="bg-[#183B5B]/90 text-white text-xs font-semibold px-3 py-1 rounded-full capitalize">
              {place.category}
            </span>
            <DataBadge type="sample" label="Demo Profile" size="xs" />
          </div>

          {/* Title and neighbourhood on image */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 text-sm text-sky-200 mb-1">
              <MapPin className="w-4 h-4 text-[#78B8F5]" />
              <span>{place.neighbourhood}, Pune</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white drop-shadow-sm font-['Plus_Jakarta_Sans']">
              {place.name}
            </h2>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-6 flex-1 text-[#334155]">
          
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#EAF4FF] border border-[#DCE7F2]">
            <div>
              <span className="text-xs text-[#64748B] block">Indicative Cost</span>
              <div className="flex items-center gap-1 text-[#183B5B] font-bold text-base mt-0.5">
                <IndianRupee className="w-4 h-4 text-[#2864A6]" />
                <span>{place.indicativePrice === 0 ? 'Free' : `₹${place.indicativePrice}`}</span>
              </div>
              <span className="text-[11px] text-[#64748B]">{place.priceRangeLabel}</span>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-[#64748B]">Rating</span>
                <span className="text-[10px] bg-[#C7E2FF] text-[#183B5B] px-1.5 py-0.2 rounded font-medium">Sample</span>
              </div>
              <div className="flex items-center gap-1 text-[#183B5B] font-bold text-base mt-0.5">
                <span className="text-amber-500">★</span>
                <span>{place.rating}</span>
                <span className="text-xs font-normal text-[#64748B]">({place.ratingCount.toLocaleString()})</span>
              </div>
              <span className="text-[11px] text-[#64748B]">Seeded Estimate</span>
            </div>

            <div>
              <span className="text-xs text-[#64748B] block">Cleanliness</span>
              <div className="flex items-center gap-1 font-semibold text-sm mt-0.5 text-[#183B5B]">
                <span className={`w-2 h-2 rounded-full ${
                  place.cleanliness.level === 'High' ? 'bg-emerald-500' : 
                  place.cleanliness.level === 'Moderate' ? 'bg-amber-500' : 'bg-slate-400'
                }`} />
                <span>{place.cleanliness.level}</span>
              </div>
              <span className="text-[11px] text-[#64748B] truncate block" title={place.cleanliness.description}>
                {place.cleanliness.description}
              </span>
            </div>

            <div>
              <span className="text-xs text-[#64748B] block">Wheelchair Access</span>
              <div className="flex items-center gap-1 font-semibold text-sm mt-0.5 text-[#183B5B]">
                <Accessibility className="w-4 h-4 text-[#2864A6]" />
                <span>{place.accessibility.wheelchairAccess ? 'Supported' : 'Limited / Steps'}</span>
              </div>
              <span className="text-[11px] text-[#64748B]">
                {place.accessibility.publicTransitNearby ? 'Transit nearby' : 'Private cab needed'}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-base font-bold text-[#183B5B] mb-2 font-['Plus_Jakarta_Sans']">
              About this place
            </h3>
            <p className="text-sm leading-relaxed text-[#334155]">
              {place.description}
            </p>
          </div>

          {/* Cultural & Historical Highlights */}
          {place.culturalHighlights && (
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80">
              <div className="flex items-center gap-2 mb-1.5 text-amber-900 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>Cultural & Heritage Significance</span>
              </div>
              <p className="text-xs leading-relaxed text-amber-950">
                {place.culturalHighlights}
              </p>
            </div>
          )}

          {/* Accessibility & Transit Section */}
          <div className="border-t border-[#DCE7F2] pt-4">
            <h3 className="text-base font-bold text-[#183B5B] mb-3 flex items-center gap-2 font-['Plus_Jakarta_Sans']">
              <Accessibility className="w-4 h-4 text-[#2864A6]" />
              <span>Accessibility & Arrival Logistics</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mb-2">
              <div className="p-2.5 rounded-lg bg-white border border-[#DCE7F2] flex items-center gap-2">
                <Accessibility className={`w-4 h-4 ${place.accessibility.wheelchairAccess ? 'text-emerald-600' : 'text-slate-400'}`} />
                <div>
                  <span className="font-semibold block text-[#183B5B]">Wheelchair Access</span>
                  <span className="text-[#64748B]">{place.accessibility.wheelchairAccess ? 'Step-free / Ramped' : 'Uneven / Stone steps'}</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-white border border-[#DCE7F2] flex items-center gap-2">
                <Bus className={`w-4 h-4 ${place.accessibility.publicTransitNearby ? 'text-emerald-600' : 'text-slate-400'}`} />
                <div>
                  <span className="font-semibold block text-[#183B5B]">Public Transit</span>
                  <span className="text-[#64748B]">{place.accessibility.publicTransitNearby ? 'Bus / Metro < 400m' : 'Auto / Cab recommended'}</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-white border border-[#DCE7F2] flex items-center gap-2">
                <Car className={`w-4 h-4 ${place.accessibility.parkingAvailable ? 'text-emerald-600' : 'text-slate-400'}`} />
                <div>
                  <span className="font-semibold block text-[#183B5B]">Parking Space</span>
                  <span className="text-[#64748B]">{place.accessibility.parkingAvailable ? 'Designated parking' : 'Street parking limited'}</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-[#64748B] mt-1 bg-slate-50 p-2.5 rounded-lg border border-slate-200/60">
              <strong className="text-[#334155]">Terrain Note: </strong> {place.accessibility.notes}
            </p>
          </div>

          {/* Safety & Environment Information */}
          <div className="border-t border-[#DCE7F2] pt-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-[#183B5B] flex items-center gap-2 font-['Plus_Jakarta_Sans']">
                <ShieldCheck className="w-4 h-4 text-[#2864A6]" />
                <span>Safety Observations & Hours</span>
              </h3>
              <DataBadge type="sample" label="Sample Safety Data" size="xs" />
            </div>

            <div className="space-y-2 text-xs bg-white border border-[#DCE7F2] p-3.5 rounded-xl">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#2864A6] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-[#183B5B]">Hours: </span>
                  <span>{place.openingHours}</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Eye className="w-4 h-4 text-[#2864A6] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-[#183B5B]">Atmosphere & Lighting: </span>
                  <span>{place.safety.crowdLevel} • Illumination: {place.safety.lighting}</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-[#2864A6] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-[#183B5B]">Recommended Hours: </span>
                  <span>{place.safety.bestTimeToVisit}</span>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-sky-50 text-[#183B5B] mt-1">
                <strong className="text-[#2864A6]">Observation Note: </strong>
                {place.safety.safetyNotes}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {place.tags.map((tag, idx) => (
              <span key={idx} className="text-xs bg-[#C7E2FF]/40 text-[#183B5B] px-2.5 py-1 rounded-md border border-[#DCE7F2]">
                #{tag}
              </span>
            ))}
          </div>

        </div>

        {/* Modal Action Footer */}
        <div className="p-4 sm:p-5 bg-[#F8FAFC] border-t border-[#DCE7F2] flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-[#64748B]">
            Coordinates: {place.coordinates.lat.toFixed(4)}°N, {place.coordinates.lng.toFixed(4)}°E
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(place.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all border ${
                isSaved 
                  ? 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100' 
                  : 'bg-white border-[#DCE7F2] text-[#334155] hover:bg-[#EAF4FF] hover:border-[#78B8F5]'
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-600 text-rose-600' : ''}`} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={() => onToggleCompare(place.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all border ${
                isInCompare 
                  ? 'bg-[#C7E2FF] border-[#78B8F5] text-[#183B5B]' 
                  : 'bg-white border-[#DCE7F2] text-[#334155] hover:bg-[#EAF4FF] hover:border-[#78B8F5]'
              }`}
            >
              <Scale className="w-4 h-4 text-[#2864A6]" />
              <span>{isInCompare ? 'Comparing' : 'Compare'}</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onNavigateToMap(place);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-[#2864A6] hover:bg-[#1e5088] transition-all shadow-xs"
            >
              <MapPin className="w-4 h-4" />
              <span>Locate on Map</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
