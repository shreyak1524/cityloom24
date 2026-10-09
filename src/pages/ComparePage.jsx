import React, { useState } from 'react';
import { 
  Scale, X, Trash2, 
  IndianRupee, Sparkles, Accessibility, 
  HelpCircle, ArrowRight
} from 'lucide-react';
import DataBadge from '../components/DataBadge';
import { PUNE_PLACES } from '../data/punePlaces';

// Approximate distance calculator from a reference center (Pune Junction: 18.5284, 73.8744)
function calculateDistanceKm(lat1, lon1, lat2 = 18.5284, lon2 = 73.8744) {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return (R * c).toFixed(1);
}

export default function ComparePage({ 
  comparePlaceIds, 
  onToggleCompare, 
  onClearCompare, 
  onViewPlaceDetails
}) {
  const [activeGoal, setActiveGoal] = useState('overall'); // 'budget', 'culture', 'accessibility', 'overall'
  const [showFormulaModal, setShowFormulaModal] = useState(false);

  // Get selected place objects
  const selectedPlaces = PUNE_PLACES.filter(p => comparePlaceIds.includes(p.id));

  // Places not currently in comparison (available to add)
  const availableToAdd = PUNE_PLACES.filter(p => !comparePlaceIds.includes(p.id));

  // Transparent Goal-Based Recommendations
  const getGoalRecommendation = () => {
    if (selectedPlaces.length < 2) return null;

    if (activeGoal === 'budget') {
      const sortedByPrice = [...selectedPlaces].sort((a, b) => a.indicativePrice - b.indicativePrice);
      const winner = sortedByPrice[0];
      return {
        winner,
        headline: `Top Budget Pick: ${winner.name}`,
        reason: winner.indicativePrice === 0 
          ? `Free entry with high urban exploration value.` 
          : `Most affordable option at indicative price of ₹${winner.indicativePrice} (${winner.priceRangeLabel}).`,
        badgeText: 'Lowest Indicative Cost'
      };
    }

    if (activeGoal === 'culture') {
      const cultureWeights = { heritage: 10, attractions: 7, food: 5, parks: 4, hotels: 2 };
      const sorted = [...selectedPlaces].sort((a, b) => {
        const scoreA = (cultureWeights[a.category] || 3) + (a.culturalHighlights ? 4 : 0);
        const scoreB = (cultureWeights[b.category] || 3) + (b.culturalHighlights ? 4 : 0);
        return scoreB - scoreA;
      });
      const winner = sorted[0];
      return {
        winner,
        headline: `Top Cultural Choice: ${winner.name}`,
        reason: winner.culturalHighlights 
          ? `Rich historical background and documented heritage significance.` 
          : `Distinctive cultural landmark in ${winner.neighbourhood}.`,
        badgeText: 'Highest Heritage Score'
      };
    }

    if (activeGoal === 'accessibility') {
      const sorted = [...selectedPlaces].sort((a, b) => {
        const scoreA = (a.accessibility.wheelchairAccess ? 5 : 0) + (a.accessibility.publicTransitNearby ? 3 : 0) + (a.accessibility.parkingAvailable ? 2 : 0);
        const scoreB = (b.accessibility.wheelchairAccess ? 5 : 0) + (b.accessibility.publicTransitNearby ? 3 : 0) + (b.accessibility.parkingAvailable ? 2 : 0);
        return scoreB - scoreA;
      });
      const winner = sorted[0];
      return {
        winner,
        headline: `Top Accessibility Pick: ${winner.name}`,
        reason: `${winner.accessibility.wheelchairAccess ? 'Step-free / wheelchair supported terrain' : 'Partially accessible'}, ${winner.accessibility.publicTransitNearby ? 'public transit within walking radius' : ''}.`,
        badgeText: 'Optimal Accessibility Features'
      };
    }

    // Default 'overall' transparent match
    const scored = [...selectedPlaces].map(place => {
      // Affordability: 0 - 25 pts (Free = 25, <=100 = 22, <=300 = 18, <=1000 = 12, >1000 = 8)
      let priceScore = 8;
      if (place.indicativePrice === 0) priceScore = 25;
      else if (place.indicativePrice <= 100) priceScore = 22;
      else if (place.indicativePrice <= 300) priceScore = 18;
      else if (place.indicativePrice <= 1000) priceScore = 14;

      // Rating: 0 - 25 pts based on sample rating (4.0 - 5.0)
      const ratingScore = Math.round((place.rating / 5.0) * 25);

      // Cleanliness: 0 - 25 pts
      const cleanScore = place.cleanliness.level === 'High' ? 25 : place.cleanliness.level === 'Moderate' ? 18 : 12;

      // Accessibility: 0 - 25 pts
      const accessScore = (place.accessibility.wheelchairAccess ? 12 : 4) + 
                          (place.accessibility.publicTransitNearby ? 8 : 2) + 
                          (place.accessibility.parkingAvailable ? 5 : 2);

      const totalScore = priceScore + ratingScore + cleanScore + accessScore;
      return { place, totalScore, breakdown: { priceScore, ratingScore, cleanScore, accessScore } };
    }).sort((a, b) => b.totalScore - a.totalScore);

    const winner = scored[0].place;
    return {
      winner,
      headline: `Balanced Overall Match: ${winner.name} (${scored[0].totalScore}/100 pts)`,
      reason: `Calculated from affordability (${scored[0].breakdown.priceScore}/25), sample rating (${scored[0].breakdown.ratingScore}/25), cleanliness (${scored[0].breakdown.cleanScore}/25), and accessibility (${scored[0].breakdown.accessScore}/25).`,
      badgeText: 'Transparent Multi-Factor Score'
    };
  };

  const recommendation = getGoalRecommendation();

  // Quick preset loader
  const handleLoadPreset = (ids) => {
    onClearCompare();
    ids.forEach(id => onToggleCompare(id));
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DCE7F2] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#183B5B] font-['Plus_Jakarta_Sans']">
              Compare Places Side-by-Side
            </h1>
            <span className="bg-[#C7E2FF] text-[#183B5B] text-xs font-bold px-2.5 py-0.5 rounded-full">
              {selectedPlaces.length}/3 Selected
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Transparent comparison of affordability, cleanliness, accessibility, and crowd patterns
          </p>
        </div>

        <div className="flex items-center gap-2">
          {selectedPlaces.length > 0 && (
            <button
              onClick={onClearCompare}
              className="text-xs text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1 px-3 py-1.5 rounded-lg border border-rose-200 bg-white hover:bg-rose-50 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Selections</span>
            </button>
          )}

          <button
            onClick={() => setShowFormulaModal(true)}
            className="text-xs text-[#2864A6] hover:text-[#183B5B] font-semibold flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#DCE7F2] bg-white hover:bg-[#EAF4FF] transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Scoring Criteria</span>
          </button>
        </div>
      </div>

      {/* Place Picker Bar */}
      <div className="bg-white rounded-2xl border border-[#DCE7F2] p-4 sm:p-5 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-[#183B5B]">
          <span>Currently Comparing:</span>
          {selectedPlaces.length < 3 && (
            <span className="text-[#64748B]">
              Add {3 - selectedPlaces.length} more place{3 - selectedPlaces.length === 1 ? '' : 's'} for a 3-way matrix
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {selectedPlaces.map((place) => (
            <div 
              key={place.id}
              className="flex items-center gap-2 bg-[#EAF4FF] border border-[#78B8F5] text-[#183B5B] px-3 py-1.5 rounded-xl text-xs font-semibold"
            >
              <span className="truncate max-w-[150px]">{place.name}</span>
              <button
                onClick={() => onToggleCompare(place.id)}
                className="text-slate-500 hover:text-rose-600 p-0.5 rounded-full"
                aria-label={`Remove ${place.name}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {/* Add Dropdown if space available */}
          {selectedPlaces.length < 3 && availableToAdd.length > 0 && (
            <div className="relative">
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    onToggleCompare(e.target.value);
                    e.target.value = '';
                  }
                }}
                defaultValue=""
                className="text-xs font-semibold bg-white border border-dashed border-[#2864A6] text-[#2864A6] hover:bg-[#EAF4FF] px-3 py-1.5 rounded-xl cursor-pointer focus:outline-hidden"
              >
                <option value="" disabled>+ Add a place to compare...</option>
                {availableToAdd.map(p => (
                  <option key={p.id} value={p.id}>
                    + {p.name} ({p.neighbourhood})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Preset suggestions if 0 or 1 place selected */}
        {selectedPlaces.length < 2 && (
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs text-[#64748B]">
            <span>Try popular comparison pairs:</span>
            <button
              onClick={() => handleLoadPreset(['shaniwar-wada', 'aga-khan-palace'])}
              className="bg-white hover:bg-[#EAF4FF] text-[#2864A6] px-2.5 py-1 rounded-lg border border-[#DCE7F2] font-medium"
            >
              Shaniwar Wada vs Aga Khan Palace
            </button>
            <button
              onClick={() => handleLoadPreset(['vaishali-restaurant', 'goodluck-cafe'])}
              className="bg-white hover:bg-[#EAF4FF] text-[#2864A6] px-2.5 py-1 rounded-lg border border-[#DCE7F2] font-medium"
            >
              Vaishali vs Cafe Goodluck
            </button>
            <button
              onClick={() => handleLoadPreset(['pula-deshpande-garden', 'vetal-tekdi'])}
              className="bg-white hover:bg-[#EAF4FF] text-[#2864A6] px-2.5 py-1 rounded-lg border border-[#DCE7F2] font-medium"
            >
              Pu La Garden vs Vetal Tekdi
            </button>
          </div>
        )}
      </div>

      {/* When at least 2 places selected, show Goal Switcher & Recommendation Banner */}
      {selectedPlaces.length >= 2 ? (
        <div className="space-y-6">
          
          {/* Goal Selector Switcher */}
          <div className="bg-white rounded-2xl border border-[#DCE7F2] p-4 shadow-xs space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#183B5B] block">
              What is your primary exploration goal?
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setActiveGoal('budget')}
                className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                  activeGoal === 'budget'
                    ? 'bg-[#EAF4FF] border-[#2864A6] text-[#183B5B] shadow-2xs'
                    : 'bg-white border-[#DCE7F2] text-[#334155] hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1 text-[#2864A6]">
                  <IndianRupee className="w-4 h-4" />
                  <span className="font-bold">Budget Priority</span>
                </div>
                <span className="text-[11px] text-[#64748B] block font-normal">
                  Find lowest costs & free admissions
                </span>
              </button>

              <button
                onClick={() => setActiveGoal('culture')}
                className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                  activeGoal === 'culture'
                    ? 'bg-[#EAF4FF] border-[#2864A6] text-[#183B5B] shadow-2xs'
                    : 'bg-white border-[#DCE7F2] text-[#334155] hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1 text-amber-700">
                  <Sparkles className="w-4 h-4" />
                  <span className="font-bold">Cultural Visit</span>
                </div>
                <span className="text-[11px] text-[#64748B] block font-normal">
                  History, architecture, artifacts
                </span>
              </button>

              <button
                onClick={() => setActiveGoal('accessibility')}
                className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                  activeGoal === 'accessibility'
                    ? 'bg-[#EAF4FF] border-[#2864A6] text-[#183B5B] shadow-2xs'
                    : 'bg-white border-[#DCE7F2] text-[#334155] hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1 text-emerald-700">
                  <Accessibility className="w-4 h-4" />
                  <span className="font-bold">Accessibility</span>
                </div>
                <span className="text-[11px] text-[#64748B] block font-normal">
                  Wheelchairs, ramps & transit links
                </span>
              </button>

              <button
                onClick={() => setActiveGoal('overall')}
                className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                  activeGoal === 'overall'
                    ? 'bg-[#EAF4FF] border-[#2864A6] text-[#183B5B] shadow-2xs'
                    : 'bg-white border-[#DCE7F2] text-[#334155] hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1 text-[#183B5B]">
                  <Scale className="w-4 h-4 text-[#2864A6]" />
                  <span className="font-bold">Overall Match</span>
                </div>
                <span className="text-[11px] text-[#64748B] block font-normal">
                  Transparent 100-pt formula
                </span>
              </button>
            </div>
          </div>

          {/* Recommendation Banner */}
          {recommendation && (
            <div className="bg-gradient-to-r from-[#EAF4FF] to-white rounded-2xl border-2 border-[#78B8F5] p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="bg-[#2864A6] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    {recommendation.badgeText}
                  </span>
                  <span className="text-xs text-[#64748B]">Goal-Oriented Verdict</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#183B5B] font-['Plus_Jakarta_Sans']">
                  {recommendation.headline}
                </h3>
                <p className="text-xs sm:text-sm text-[#334155] max-w-2xl leading-relaxed">
                  {recommendation.reason}
                </p>
              </div>

              <button
                onClick={() => onViewPlaceDetails(recommendation.winner)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#2864A6] hover:bg-[#1e5088] transition-all flex-shrink-0 shadow-xs"
              >
                <span>View Full Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Full Comparison Matrix / Side-by-Side Cards */}
          <div className="bg-white rounded-2xl border border-[#DCE7F2] shadow-xs overflow-hidden">
            <div className="p-4 border-b border-[#DCE7F2] bg-[#F8FAFC] flex items-center justify-between">
              <span className="text-xs font-bold text-[#183B5B] uppercase tracking-wider">
                Detailed Attribute Matrix
              </span>
              <DataBadge type="sample" label="Seeded Demo Attributes" size="xs" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#DCE7F2] bg-[#EAF4FF]/40 text-[#183B5B]">
                    <th className="p-4 font-bold w-1/4 min-w-[160px]">Attribute</th>
                    {selectedPlaces.map(place => (
                      <th key={place.id} className="p-4 font-bold text-sm min-w-[200px] align-top">
                        <div className="space-y-1">
                          <span className="font-['Plus_Jakarta_Sans'] text-base text-[#183B5B] block">{place.name}</span>
                          <span className="text-xs text-[#64748B] font-normal block">{place.neighbourhood}</span>
                          <span className="text-[11px] inline-block font-semibold bg-white border border-[#DCE7F2] px-2 py-0.5 rounded capitalize text-[#2864A6]">
                            {place.category}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#DCE7F2] text-[#334155]">
                  {/* Photo row */}
                  <tr>
                    <td className="p-4 font-bold text-[#183B5B] bg-slate-50/50">Visual Preview</td>
                    {selectedPlaces.map(place => (
                      <td key={place.id} className="p-4">
                        <img 
                          src={place.image} 
                          alt={place.name} 
                          className="w-full h-28 object-cover rounded-xl border border-[#DCE7F2]"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=400&q=80';
                          }}
                        />
                      </td>
                    ))}
                  </tr>

                  {/* Affordability Row */}
                  <tr>
                    <td className="p-4 font-bold text-[#183B5B] bg-slate-50/50">
                      <div>Indicative Cost</div>
                      <span className="text-[10px] text-[#64748B] font-normal">Per person estimate</span>
                    </td>
                    {selectedPlaces.map(place => (
                      <td key={place.id} className="p-4">
                        <div className="font-bold text-sm text-[#183B5B] flex items-center gap-1">
                          <IndianRupee className="w-4 h-4 text-[#2864A6]" />
                          <span>{place.indicativePrice === 0 ? 'Free Entry' : `₹${place.indicativePrice}`}</span>
                        </div>
                        <span className="text-[11px] text-[#64748B] block mt-0.5">{place.priceRangeLabel}</span>
                      </td>
                    ))}
                  </tr>

                  {/* Rating Row */}
                  <tr>
                    <td className="p-4 font-bold text-[#183B5B] bg-slate-50/50">
                      <div>Rating & Reviews</div>
                      <span className="text-[10px] text-amber-600 font-medium">Demonstration Sample</span>
                    </td>
                    {selectedPlaces.map(place => (
                      <td key={place.id} className="p-4">
                        <div className="flex items-center gap-1 font-bold text-sm text-[#183B5B]">
                          <span className="text-amber-500">★</span>
                          <span>{place.rating}</span>
                          <span className="text-xs font-normal text-[#64748B]">({place.ratingCount.toLocaleString()} reviews)</span>
                        </div>
                        <span className="text-[10px] text-[#64748B] block mt-0.5">Simulated survey metric</span>
                      </td>
                    ))}
                  </tr>

                  {/* Cleanliness Row */}
                  <tr>
                    <td className="p-4 font-bold text-[#183B5B] bg-slate-50/50">Cleanliness Standard</td>
                    {selectedPlaces.map(place => (
                      <td key={place.id} className="p-4">
                        <div className="flex items-center gap-1.5 font-bold text-xs text-[#183B5B]">
                          <span className={`w-2.5 h-2.5 rounded-full ${
                            place.cleanliness.level === 'High' ? 'bg-emerald-500' :
                            place.cleanliness.level === 'Moderate' ? 'bg-amber-500' : 'bg-slate-400'
                          }`} />
                          <span>{place.cleanliness.level} Level</span>
                        </div>
                        <p className="text-[11px] text-[#64748B] mt-1 leading-relaxed">
                          {place.cleanliness.description}
                        </p>
                      </td>
                    ))}
                  </tr>

                  {/* Accessibility Row */}
                  <tr>
                    <td className="p-4 font-bold text-[#183B5B] bg-slate-50/50">
                      <div>Accessibility Features</div>
                      <span className="text-[10px] text-[#64748B] font-normal">Physical terrain & transit</span>
                    </td>
                    {selectedPlaces.map(place => (
                      <td key={place.id} className="p-4 space-y-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] text-white ${
                            place.accessibility.wheelchairAccess ? 'bg-emerald-600' : 'bg-slate-400'
                          }`}>
                            {place.accessibility.wheelchairAccess ? '✓' : '✗'}
                          </span>
                          <span className="font-semibold text-xs">
                            {place.accessibility.wheelchairAccess ? 'Wheelchair Accessible' : 'Steps / Uneven'}
                          </span>
                        </div>

                        <div className="text-[11px] text-[#64748B]">
                          Transit: {place.accessibility.publicTransitNearby ? 'Public bus/metro within 400m' : 'Auto/cab required'}
                        </div>
                        <div className="text-[11px] text-[#64748B]">
                          Parking: {place.accessibility.parkingAvailable ? 'Available on-site' : 'Street/limited'}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Safety Profile */}
                  <tr>
                    <td className="p-4 font-bold text-[#183B5B] bg-slate-50/50">
                      <div>Safety Observations</div>
                      <span className="text-[10px] text-[#64748B] font-normal">Lighting & crowd profile</span>
                    </td>
                    {selectedPlaces.map(place => (
                      <td key={place.id} className="p-4 space-y-1">
                        <div className="text-xs font-semibold text-[#183B5B]">
                          Lighting: <span className="font-normal">{place.safety.lighting}</span>
                        </div>
                        <div className="text-[11px] text-[#64748B]">
                          Crowd: {place.safety.crowdLevel}
                        </div>
                        <div className="text-[11px] text-[#334155] bg-[#EAF4FF] p-2 rounded-lg mt-1">
                          Best hours: {place.safety.bestTimeToVisit}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Proximity / Distance reference */}
                  <tr>
                    <td className="p-4 font-bold text-[#183B5B] bg-slate-50/50">
                      <div>Proximity Reference</div>
                      <span className="text-[10px] text-[#64748B] font-normal">From Pune Station hub</span>
                    </td>
                    {selectedPlaces.map(place => {
                      const distKm = calculateDistanceKm(place.coordinates.lat, place.coordinates.lng);
                      return (
                        <td key={place.id} className="p-4">
                          <div className="font-bold text-xs text-[#183B5B]">
                            ~{distKm} km
                          </div>
                          <span className="text-[10px] text-[#64748B]">
                            Direct Euclidean distance
                          </span>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Action buttons */}
                  <tr>
                    <td className="p-4 bg-slate-50/50">Quick Action</td>
                    {selectedPlaces.map(place => (
                      <td key={place.id} className="p-4">
                        <button
                          onClick={() => onViewPlaceDetails(place)}
                          className="w-full bg-[#2864A6] hover:bg-[#1e5088] text-white font-semibold py-2 px-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-1"
                        >
                          <span>Explore Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    ))}
                  </tr>

                </tbody>
              </table>
            </div>
          </div>

        </div>
      ) : (
        /* Empty / Insufficient Selection State */
        <div className="bg-white rounded-2xl border border-[#DCE7F2] p-10 text-center space-y-4 max-w-lg mx-auto shadow-xs">
          <div className="w-14 h-14 rounded-full bg-[#EAF4FF] text-[#2864A6] flex items-center justify-center mx-auto">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#183B5B] font-['Plus_Jakarta_Sans']">
              Select 2 or 3 places to compare
            </h3>
            <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
              Add places using the dropdown above or click the "Compare" button on any place card across the app. We'll generate an objective breakdown of prices, amenities, and accessibility.
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={() => handleLoadPreset(['shaniwar-wada', 'aga-khan-palace', 'sinhagad-fort'])}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#2864A6] hover:bg-[#1e5088] transition-all shadow-xs"
            >
              <span>Load 3 Iconic Pune Heritage Sites</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Transparent Scoring Formula Modal */}
      {showFormulaModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#DCE7F2] space-y-4 text-xs text-[#334155]">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-[#2864A6]" />
                <h3 className="text-base font-bold text-[#183B5B] font-['Plus_Jakarta_Sans']">
                  Transparent Scoring Criteria
                </h3>
              </div>
              <button 
                onClick={() => setShowFormulaModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="leading-relaxed">
              CityLoom does not use hidden algorithms or arbitrary ratings. The <strong>Overall Match (100 pts)</strong> score is derived mathematically:
            </p>

            <div className="space-y-2 bg-[#EAF4FF] p-3 rounded-xl border border-[#DCE7F2]">
              <div><strong>1. Affordability (25 pts):</strong> Free entry (25 pts), under ₹100 (22 pts), under ₹300 (18 pts), above ₹1000 (8-14 pts).</div>
              <div><strong>2. Sample Rating (25 pts):</strong> Proportional to seeded rating (e.g., 4.6 / 5.0 * 25 = 23 pts).</div>
              <div><strong>3. Cleanliness (25 pts):</strong> High level (25 pts), Moderate (18 pts), Basic (12 pts).</div>
              <div><strong>4. Accessibility (25 pts):</strong> Wheelchair access (12 pts), Public transit proximity (8 pts), Designated parking (5 pts).</div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1">
              <strong>Honesty Commitment:</strong>
              <p>
                Missing fields remain strictly <em>Unknown</em> rather than receiving penalty points. We never label a place definitively safe or unsafe based on incomplete sample data.
              </p>
            </div>

            <div className="text-right pt-2">
              <button
                onClick={() => setShowFormulaModal(false)}
                className="bg-[#2864A6] text-white px-4 py-2 rounded-xl font-semibold text-xs"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
