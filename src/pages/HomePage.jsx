import React, { useState } from 'react';
import { 
  Search, Compass, IndianRupee, 
  ArrowRight, Landmark, Utensils, Camera, Trees, 
  Hotel, BadgeIndianRupee, CloudSun, Shield, Car,
  Scale, Clock, ChevronRight
} from 'lucide-react';
import PlaceCard from '../components/PlaceCard';
import DataBadge from '../components/DataBadge';
import { PUNE_PLACES } from '../data/punePlaces';
import { DEMO_SAFETY_SNAPSHOT } from '../data/safetyData';

export default function HomePage({ 
  onSelectTab, 
  onViewPlaceDetails, 
  savedPlaceIds, 
  onToggleSave, 
  comparePlaceIds, 
  onToggleCompare,
  recentlyViewedIds 
}) {
  const [searchQuery, setSearchQuery] = useState('');

  // Category shortcuts
  const categories = [
    { id: 'heritage', label: 'Heritage Sites', count: '6 Landmarks', icon: Landmark, color: 'bg-amber-100 text-amber-800' },
    { id: 'food', label: 'Food & Cafes', count: 'Iconic Bites', icon: Utensils, color: 'bg-rose-100 text-rose-800' },
    { id: 'attractions', label: 'City Attractions', count: 'Must See', icon: Camera, color: 'bg-sky-100 text-[#183B5B]' },
    { id: 'parks', label: 'Parks & Trails', count: 'Green Escapes', icon: Trees, color: 'bg-emerald-100 text-emerald-800' },
    { id: 'hotels', label: 'Hotels & Stays', count: 'Luxury & Stays', icon: Hotel, color: 'bg-indigo-100 text-indigo-800' },
    { id: 'budget', label: 'Budget-Friendly', count: 'Under ₹150', icon: BadgeIndianRupee, color: 'bg-teal-100 text-teal-800' }
  ];

  // Featured places
  const featuredPlaces = PUNE_PLACES.slice(0, 3);

  // Budget friendly recommendations
  const budgetRecommendations = PUNE_PLACES.filter(p => p.isBudgetFriendly && p.indicativePrice <= 150).slice(0, 4);

  // Recently viewed places
  const recentlyViewedPlaces = PUNE_PLACES.filter(p => recentlyViewedIds.includes(p.id)).slice(0, 4);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSelectTab('explore', { search: searchQuery });
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-12">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-6 pb-12 sm:pt-12 sm:pb-16 bg-gradient-to-b from-[#C7E2FF]/40 via-[#EAF4FF] to-transparent rounded-3xl border border-[#DCE7F2]/60 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCE7F2] shadow-2xs text-xs font-semibold text-[#183B5B]">
            <Compass className="w-3.5 h-3.5 text-[#2864A6]" />
            <span>Discovering Pune, Maharashtra</span>
            <span className="text-[#64748B]">•</span>
            <span className="text-[#2864A6]">15+ Curated Cultural Landmarks & Cafes</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#183B5B] font-['Plus_Jakarta_Sans'] leading-tight">
            Your city, a little more <span className="text-[#2864A6] relative">discoverable.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#334155] max-w-2xl mx-auto leading-relaxed">
            Explore heritage forts, historic cafes, lush tekdis, and neighbourhood cultures. Compare places transparently and check community safety insights.
          </p>

          {/* Prominent Search Bar */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto relative mt-6">
            <div className="flex items-center bg-white rounded-2xl shadow-lg border border-[#DCE7F2] p-2 hover:border-[#78B8F5] transition-all focus-within:ring-2 focus-within:ring-[#78B8F5]/50 focus-within:border-[#2864A6]">
              <div className="pl-3 pr-2 text-[#2864A6]">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Shaniwar Wada, FC Road cafes, tekdis, or budget spots..."
                className="w-full text-sm sm:text-base text-[#183B5B] placeholder-[#64748B] bg-transparent focus:outline-hidden py-2"
              />
              <button
                type="submit"
                className="bg-[#2864A6] hover:bg-[#1e5088] text-white px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl text-sm font-semibold transition-all shadow-xs flex-shrink-0 flex items-center gap-1.5"
              >
                <span>Explore</span>
                <ArrowRight className="w-4 h-4 hidden sm:inline" />
              </button>
            </div>

            {/* Quick search suggestions */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-[#64748B]">
              <span className="font-medium text-[#183B5B]">Popular:</span>
              <button 
                type="button" 
                onClick={() => onSelectTab('explore', { search: 'Vaishali' })}
                className="hover:text-[#2864A6] bg-white px-2 py-0.5 rounded-md border border-[#DCE7F2]"
              >
                Vaishali
              </button>
              <button 
                type="button" 
                onClick={() => onSelectTab('explore', { search: 'Shaniwar Wada' })}
                className="hover:text-[#2864A6] bg-white px-2 py-0.5 rounded-md border border-[#DCE7F2]"
              >
                Shaniwar Wada
              </button>
              <button 
                type="button" 
                onClick={() => onSelectTab('explore', { search: 'Free entry' })}
                className="hover:text-[#2864A6] bg-white px-2 py-0.5 rounded-md border border-[#DCE7F2]"
              >
                Free entry
              </button>
              <button 
                type="button" 
                onClick={() => onSelectTab('explore', { search: 'Vetal Tekdi' })}
                className="hover:text-[#2864A6] bg-white px-2 py-0.5 rounded-md border border-[#DCE7F2]"
              >
                Vetal Tekdi
              </button>
            </div>
          </form>

        </div>
      </section>

      {/* City Snapshot (Demo Weather, Traffic, Safety Indicator) */}
      <section className="bg-white rounded-2xl border border-[#DCE7F2] p-5 sm:p-7 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-[#DCE7F2] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-[#183B5B] font-['Plus_Jakarta_Sans']">
                Pune Live Snapshot
              </h2>
              <DataBadge type="demo" label="Simulated Feed" size="xs" />
            </div>
            <p className="text-xs text-[#64748B] mt-0.5">
              Demonstration environmental indicators & civic alerts
            </p>
          </div>
          <button 
            onClick={() => onSelectTab('safety')}
            className="text-xs font-semibold text-[#2864A6] hover:text-[#183B5B] flex items-center gap-1 hover:underline"
          >
            <span>View Full Safety & Incident Feed</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Weather Box */}
          <div className="p-4 rounded-xl bg-[#EAF4FF] border border-[#DCE7F2] flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-white text-[#2864A6] shadow-2xs">
              <CloudSun className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-[#64748B] block">Weather Snapshot</span>
              <div className="text-lg font-bold text-[#183B5B]">
                {DEMO_SAFETY_SNAPSHOT.weather.temp} • {DEMO_SAFETY_SNAPSHOT.weather.condition}
              </div>
              <p className="text-xs text-[#334155]">
                AQI: <strong>{DEMO_SAFETY_SNAPSHOT.weather.aqi}</strong> ({DEMO_SAFETY_SNAPSHOT.weather.aqiLabel})
              </p>
            </div>
          </div>

          {/* Traffic Summary */}
          <div className="p-4 rounded-xl bg-[#EAF4FF] border border-[#DCE7F2] flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-white text-[#2864A6] shadow-2xs">
              <Car className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-[#64748B] block">Traffic Advisory (Demo)</span>
              <div className="text-sm font-bold text-[#183B5B]">
                {DEMO_SAFETY_SNAPSHOT.traffic.condition}
              </div>
              <p className="text-xs text-[#334155] line-clamp-2">
                {DEMO_SAFETY_SNAPSHOT.traffic.summary}
              </p>
            </div>
          </div>

          {/* Safety Awareness */}
          <div className="p-4 rounded-xl bg-[#EAF4FF] border border-[#DCE7F2] flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-white text-emerald-600 shadow-2xs">
              <Shield className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-[#64748B] block">Urban Safety Notice</span>
              <div className="text-sm font-bold text-[#183B5B]">
                {DEMO_SAFETY_SNAPSHOT.safetyAdvisory.level}
              </div>
              <p className="text-xs text-[#334155] line-clamp-2">
                {DEMO_SAFETY_SNAPSHOT.safetyAdvisory.statement}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Quick Category Cards */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#183B5B] font-['Plus_Jakarta_Sans']">
              Explore by Category
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B]">
              Browse tailored collections across Pune's top neighbourhoods
            </p>
          </div>
          <button
            onClick={() => onSelectTab('explore')}
            className="text-xs sm:text-sm font-semibold text-[#2864A6] hover:text-[#183B5B] flex items-center gap-1"
          >
            <span>All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectTab('explore', { category: cat.id })}
                className="bg-white hover:bg-[#EAF4FF] border border-[#DCE7F2] hover:border-[#78B8F5] p-4 rounded-2xl text-left transition-all group flex flex-col justify-between shadow-2xs hover:shadow-xs hover:-translate-y-0.5"
              >
                <div className={`w-10 h-10 rounded-xl ${cat.color} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#183B5B] group-hover:text-[#2864A6] transition-colors">
                    {cat.label}
                  </h3>
                  <span className="text-[11px] text-[#64748B] mt-0.5 block">
                    {cat.count}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured Places Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-[#183B5B] font-['Plus_Jakarta_Sans']">
                Featured Places in Pune
              </h2>
              <DataBadge type="sample" label="Curated Demo" size="xs" />
            </div>
            <p className="text-xs sm:text-sm text-[#64748B]">
              Hand-picked landmarks combining history, culinary heritage, and scenic vantage points
            </p>
          </div>
          <button
            onClick={() => onSelectTab('explore')}
            className="text-xs sm:text-sm font-semibold text-[#2864A6] hover:text-[#183B5B] flex items-center gap-1"
          >
            <span>View All ({PUNE_PLACES.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPlaces.map((place) => (
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
      </section>

      {/* Signature Feature Preview Banner: Compare Places */}
      <section className="bg-gradient-to-r from-[#183B5B] via-[#2864A6] to-[#183B5B] text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C7E2FF]/20 text-[#C7E2FF] text-xs font-semibold backdrop-blur-xs">
            <Scale className="w-3.5 h-3.5" />
            <span>Signature Feature</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-['Plus_Jakarta_Sans'] leading-tight text-white">
            Compare options side by side. Make confident choices.
          </h2>

          <p className="text-sm sm:text-base text-sky-100 leading-relaxed max-w-2xl">
            Unsure between Shaniwar Wada, Aga Khan Palace, or Goodluck Cafe? Compare indicative costs, accessibility features, cleanliness standards, and crowd patterns with transparent criteria.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelectTab('compare')}
              className="bg-white hover:bg-[#EAF4FF] text-[#183B5B] font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-md flex items-center gap-2"
            >
              <Scale className="w-4 h-4 text-[#2864A6]" />
              <span>Launch Place Comparison Matrix</span>
            </button>
            <span className="text-xs text-sky-200">
              {comparePlaceIds.length} place{comparePlaceIds.length === 1 ? '' : 's'} currently selected
            </span>
          </div>
        </div>

        {/* Decorative graphic background pattern */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-[#78B8F5]/10 blur-2xl pointer-events-none" />
      </section>

      {/* Budget-Friendly Recommendations (Under ₹150) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-[#183B5B] font-['Plus_Jakarta_Sans']">
                Explore Pune on a Budget
              </h2>
              <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-0.5 rounded-full font-bold">
                Under ₹150
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#64748B]">
              High-value cultural experiences, scenic Tekdi viewpoints, and pocket-friendly delicacies
            </p>
          </div>
          <button
            onClick={() => onSelectTab('explore', { category: 'budget' })}
            className="text-xs sm:text-sm font-semibold text-[#2864A6] hover:text-[#183B5B] flex items-center gap-1"
          >
            <span>See All Budget Picks</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {budgetRecommendations.map((place) => (
            <div 
              key={place.id}
              onClick={() => onViewPlaceDetails(place)}
              className="bg-white rounded-xl border border-[#DCE7F2] p-4 hover:border-[#78B8F5] transition-all cursor-pointer shadow-2xs hover:shadow-xs group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[11px] font-semibold text-[#2864A6] bg-[#EAF4FF] px-2 py-0.5 rounded-md capitalize">
                    {place.category}
                  </span>
                  <div className="flex items-center text-xs font-bold text-[#183B5B]">
                    <IndianRupee className="w-3.5 h-3.5 text-[#2864A6]" />
                    <span>{place.indicativePrice === 0 ? 'Free' : `₹${place.indicativePrice}`}</span>
                  </div>
                </div>

                <h3 className="font-bold text-sm text-[#183B5B] group-hover:text-[#2864A6] transition-colors line-clamp-1 font-['Plus_Jakarta_Sans']">
                  {place.name}
                </h3>
                <p className="text-xs text-[#64748B] line-clamp-2 mt-1">
                  {place.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#64748B]">
                <span>{place.neighbourhood}</span>
                <span className="font-semibold text-[#2864A6] group-hover:underline flex items-center gap-0.5">
                  View <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recently Viewed Places (if available) */}
      {recentlyViewedPlaces.length > 0 && (
        <section className="bg-white rounded-2xl border border-[#DCE7F2] p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#2864A6]" />
              <h3 className="text-base font-bold text-[#183B5B] font-['Plus_Jakarta_Sans']">
                Recently Explored by You
              </h3>
            </div>
            <button
              onClick={() => onSelectTab('explore')}
              className="text-xs text-[#2864A6] hover:underline"
            >
              Explore More
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {recentlyViewedPlaces.map((place) => (
              <div
                key={place.id}
                onClick={() => onViewPlaceDetails(place)}
                className="p-3 rounded-xl bg-[#EAF4FF]/50 border border-[#DCE7F2] hover:bg-[#EAF4FF] cursor-pointer transition-colors"
              >
                <div className="font-semibold text-xs text-[#183B5B] truncate">
                  {place.name}
                </div>
                <div className="text-[11px] text-[#64748B] flex items-center justify-between mt-1">
                  <span>{place.neighbourhood}</span>
                  <span className="text-amber-600 font-medium">★ {place.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
