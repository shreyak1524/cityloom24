import React from 'react';
import { Compass, Shield, Sparkles } from 'lucide-react';
import DataBadge from './DataBadge';

export default function Footer({ onSelectTab }) {
  return (
    <footer className="bg-white border-t border-[#DCE7F2] mt-16 text-[#334155]">
      {/* Emergency Notice Strip */}
      <div className="bg-[#183B5B] text-white py-2.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#78B8F5]" />
            <span className="font-semibold text-sky-100">Official Emergency Helplines (Pune & India):</span>
            <span className="text-sky-200">National Emergency: <strong>112</strong> • Ambulance: <strong>108</strong> • Women Helpline: <strong>1091</strong></span>
          </div>
          <span className="text-sky-300 text-[11px]">CityLoom is for urban discovery & community reports; not an emergency responder.</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#2864A6] flex items-center justify-center text-white">
                <Compass className="w-5 h-5 text-[#C7E2FF]" />
              </div>
              <span className="text-xl font-bold text-[#183B5B] font-['Plus_Jakarta_Sans']">
                City<span className="text-[#2864A6]">Loom</span>
              </span>
            </div>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Explore the city. Find your own thread.
            </p>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Smart discovery, side-by-side place comparisons, cultural heritage archives, and community-powered safety awareness.
            </p>
            <div className="pt-1">
              <DataBadge type="sample" label="Seeded Demo Edition" size="xs" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-[#183B5B] uppercase tracking-wider text-[11px]">Explore & Compare</h4>
            <ul className="space-y-1.5 text-[#64748B]">
              <li><button onClick={() => onSelectTab('home')} className="hover:text-[#2864A6] transition-colors">Home Dashboard</button></li>
              <li><button onClick={() => onSelectTab('explore')} className="hover:text-[#2864A6] transition-colors">Discover Places</button></li>
              <li><button onClick={() => onSelectTab('map')} className="hover:text-[#2864A6] transition-colors">Interactive OpenStreetMap</button></li>
              <li><button onClick={() => onSelectTab('compare')} className="hover:text-[#2864A6] transition-colors">Place Comparison Matrix</button></li>
            </ul>
          </div>

          {/* Community & Safety */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-[#183B5B] uppercase tracking-wider text-[11px]">Safety & Culture</h4>
            <ul className="space-y-1.5 text-[#64748B]">
              <li><button onClick={() => onSelectTab('safety')} className="hover:text-[#2864A6] transition-colors">Safety Insights & Incidents</button></li>
              <li><button onClick={() => onSelectTab('safety')} className="hover:text-[#2864A6] transition-colors">Submit Citizen Report</button></li>
              <li><button onClick={() => onSelectTab('culture')} className="hover:text-[#2864A6] transition-colors">History & Heritage Stories</button></li>
              <li><button onClick={() => onSelectTab('saved')} className="hover:text-[#2864A6] transition-colors">My Saved Favourites</button></li>
            </ul>
          </div>

          {/* Data Honesty Disclosure */}
          <div className="space-y-2 text-xs bg-[#EAF4FF] p-4 rounded-xl border border-[#DCE7F2]">
            <h4 className="font-bold text-[#183B5B] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#2864A6]" />
              <span>Data Provenance Statement</span>
            </h4>
            <p className="text-[11px] text-[#334155] leading-relaxed">
              CityLoom champions transparent urban data. Pune locations, prices, and monuments represent real landmarks. Numerical ratings, cleanliness scores, and hazard reports are seeded demo entries. User-submitted reports stay in your local browser storage.
            </p>
            <div className="text-[10px] text-[#64748B] pt-1">
              Zero paid API keys required. Vercel deployment ready.
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-8 pt-6 border-t border-[#DCE7F2] flex flex-wrap items-center justify-between text-xs text-[#64748B] gap-2">
          <div>
            © 2026 CityLoom. Crafted with care for Pune explorers.
          </div>
          <div className="flex items-center gap-4">
            <span>Client-side LocalStorage Persistence</span>
            <span>Leaflet + OpenStreetMap</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
