import React, { useState } from 'react';
import { 
  Compass, Map, Scale, Shield, Landmark, 
  Heart, Search, Menu, X, ChevronDown, MapPin 
} from 'lucide-react';

export default function Navbar({ 
  currentTab, 
  onSelectTab, 
  savedCount, 
  compareCount, 
  onOpenQuickSearch,
  selectedCity,
  onSelectCity 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'explore', label: 'Explore', icon: Search },
    { id: 'map', label: 'Map', icon: Map },
    { id: 'compare', label: 'Compare', icon: Scale, badge: compareCount > 0 ? `${compareCount}/3` : null },
    { id: 'safety', label: 'Safety', icon: Shield },
    { id: 'culture', label: 'Culture', icon: Landmark },
    { id: 'saved', label: 'Saved', icon: Heart, badge: savedCount > 0 ? savedCount : null }
  ];

  const cities = [
    { id: 'pune', name: 'Pune, Maharashtra', status: 'Active Demo City (Full Dataset)' },
    { id: 'mumbai', name: 'Mumbai, Maharashtra', status: 'Coming Soon (Preview)' },
    { id: 'bengaluru', name: 'Bengaluru, Karnataka', status: 'Coming Soon (Preview)' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#DCE7F2] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onSelectTab('home')}
              className="flex items-center gap-2.5 text-left focus:outline-hidden group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2864A6] to-[#183B5B] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <Compass className="w-6 h-6 animate-pulse-slow text-[#C7E2FF]" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#183B5B] font-['Plus_Jakarta_Sans']">
                  City<span className="text-[#2864A6]">Loom</span>
                </span>
                <span className="hidden sm:block text-[11px] text-[#64748B] -mt-1 font-medium tracking-wide">
                  Explore the city. Find your own thread.
                </span>
              </div>
            </button>

            {/* City Selector Pill */}
            <div className="relative ml-2 sm:ml-4">
              <button
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#EAF4FF] hover:bg-[#C7E2FF]/70 text-[#183B5B] text-xs font-semibold border border-[#DCE7F2] transition-colors"
                title="Select exploration city"
              >
                <MapPin className="w-3.5 h-3.5 text-[#2864A6]" />
                <span className="max-w-[100px] sm:max-w-none truncate">{selectedCity.name.split(',')[0]}</span>
                <ChevronDown className="w-3 h-3 text-[#64748B]" />
              </button>

              {/* Dropdown */}
              {cityDropdownOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-[#DCE7F2] py-2 z-50 animate-fade-in">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-[#64748B] uppercase tracking-wider border-b border-slate-100">
                    City Selection
                  </div>
                  {cities.map((city) => (
                    <button
                      key={city.id}
                      onClick={() => {
                        onSelectCity(city);
                        setCityDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex flex-col hover:bg-[#EAF4FF] transition-colors ${
                        city.id === selectedCity.id ? 'bg-[#EAF4FF]/60 font-semibold text-[#183B5B]' : 'text-[#334155]'
                      }`}
                    >
                      <span className="text-[#183B5B]">{city.name}</span>
                      <span className={`text-[10px] ${city.id === 'pune' ? 'text-emerald-700' : 'text-[#64748B]'}`}>
                        {city.status}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`relative flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isActive 
                      ? 'bg-[#EAF4FF] text-[#2864A6] shadow-2xs' 
                      : 'text-[#64748B] hover:text-[#183B5B] hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#2864A6]' : 'text-[#64748B]'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold leading-none ${
                      isActive 
                        ? 'bg-[#2864A6] text-white' 
                        : 'bg-[#C7E2FF] text-[#183B5B]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Search Shortcut & Mobile Hamburger */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenQuickSearch}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm bg-[#EAF4FF] hover:bg-[#C7E2FF]/80 text-[#2864A6] border border-[#DCE7F2] transition-colors font-medium"
              title="Quick search (places, food, heritage)"
            >
              <Search className="w-4 h-4 text-[#2864A6]" />
              <span className="hidden sm:inline">Quick Search</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#183B5B] hover:bg-[#EAF4FF] transition-colors border border-transparent hover:border-[#DCE7F2]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#DCE7F2] px-4 pt-2 pb-4 space-y-1 shadow-lg animate-fade-in">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive 
                    ? 'bg-[#EAF4FF] text-[#2864A6]' 
                    : 'text-[#334155] hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#2864A6]' : 'text-[#64748B]'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-[#2864A6] text-white' : 'bg-[#C7E2FF] text-[#183B5B]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
