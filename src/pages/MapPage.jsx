import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  MapPin, Navigation, Scale, 
  Heart, Compass, ArrowRight, CornerDownRight 
} from 'lucide-react';
import DataBadge from '../components/DataBadge';
import { PUNE_PLACES, CATEGORIES } from '../data/punePlaces';

// Fix default Leaflet icon paths in Vite/Webpack environments
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Category color configurations for custom map pins
const CATEGORY_COLORS = {
  heritage: '#b45309', // Amber / Fort
  food: '#e11d48',     // Rose / Cafe
  attractions: '#2563eb', // Blue
  parks: '#059669',    // Green
  hotels: '#4f46e5'    // Indigo
};

function createCustomPin(color) {
  return L.divIcon({
    className: 'custom-map-pin',
    html: `
      <div style="
        background-color: ${color};
        width: 30px;
        height: 30px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #ffffff;
        box-shadow: 0 4px 10px rgba(0,0,0,0.25);
        cursor: pointer;
      ">
        <div style="
          width: 10px;
          height: 10px;
          background: #ffffff;
          border-radius: 50%;
          transform: rotate(45deg);
        "></div>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  });
}

export default function MapPage({ 
  onViewPlaceDetails, 
  savedPlaceIds, 
  onToggleSave, 
  onToggleCompare,
  focusedPlace = null 
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);
  const demoRouteLayerRef = useRef(null);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPlaceId, setSelectedPlaceId] = useState(focusedPlace?.id || null);
  const [showDemoRoute, setShowDemoRoute] = useState(false);
  const [geoNotice, setGeoNotice] = useState(null);

  // Filter places based on category selection
  const filteredPlaces = selectedCategory === 'all'
    ? PUNE_PLACES
    : selectedCategory === 'budget'
      ? PUNE_PLACES.filter(p => p.isBudgetFriendly)
      : PUNE_PLACES.filter(p => p.category === selectedCategory);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Center on Pune: lat: 18.5204, lng: 73.8567
    const defaultCenter = [18.5204, 73.8567];
    const defaultZoom = 12;

    const map = L.map(mapContainerRef.current, {
      center: defaultCenter,
      zoom: defaultZoom,
      zoomControl: true,
      attributionControl: true
    });

    // OpenStreetMap standard tile layer
    const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
    });
    tileLayer.addTo(map);

    // Layer group for place markers
    const markersGroup = L.layerGroup().addTo(map);
    markersLayerRef.current = markersGroup;

    mapInstanceRef.current = map;

    // Invalidate size after mount to prevent grey tiles
    setTimeout(() => {
      map.invalidateSize();
    }, 250);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Center on focused place if supplied
  useEffect(() => {
    if (!focusedPlace || !mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo(
      [focusedPlace.coordinates.lat, focusedPlace.coordinates.lng],
      15,
      { duration: 1 }
    );
    setSelectedPlaceId(focusedPlace.id);
  }, [focusedPlace]);

  // Update Markers when filtered places change
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersLayerRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    filteredPlaces.forEach((place) => {
      const pinColor = CATEGORY_COLORS[place.category] || '#2864A6';
      const customIcon = createCustomPin(pinColor);

      const marker = L.marker([place.coordinates.lat, place.coordinates.lng], {
        icon: customIcon,
        title: place.name
      });

      // Custom styled HTML popup content
      const popupHtml = `
        <div style="font-family: 'Inter', sans-serif; min-width: 190px; max-width: 240px;">
          <div style="font-size: 10px; font-weight: 700; color: #2864A6; text-transform: uppercase; margin-bottom: 2px;">
            ${place.category} • ${place.neighbourhood}
          </div>
          <div style="font-size: 14px; font-weight: 700; color: #183B5B; margin-bottom: 4px; font-family: 'Plus Jakarta Sans', sans-serif;">
            ${place.name}
          </div>
          <div style="font-size: 11px; color: #64748B; margin-bottom: 8px; line-height: 1.3;">
            ${place.description.slice(0, 75)}...
          </div>
          <div style="display: flex; align-items: center; justify-content: space-between; font-size: 11px; padding-top: 6px; border-top: 1px solid #E2E8F0;">
            <span style="font-weight: 700; color: #183B5B;">
              ${place.indicativePrice === 0 ? 'Free' : `₹${place.indicativePrice}`}
            </span>
            <span style="color: #b45309; font-weight: 600;">★ ${place.rating} (Sample)</span>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on('click', () => {
        setSelectedPlaceId(place.id);
      });

      markersGroup.addLayer(marker);

      // Auto-open popup if this is the focused place
      if (focusedPlace && place.id === focusedPlace.id) {
        marker.openPopup();
      }
    });
  }, [filteredPlaces, focusedPlace]);

  // Handle Demo Route Toggle
  const toggleDemoRoute = () => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (showDemoRoute) {
      if (demoRouteLayerRef.current) {
        map.removeLayer(demoRouteLayerRef.current);
        demoRouteLayerRef.current = null;
      }
      setShowDemoRoute(false);
    } else {
      // Demo heritage walking route: Shaniwar Wada -> Pataleshwar -> FC Road
      const routeCoordinates = [
        [18.5196, 73.8553], // Shaniwar Wada
        [18.5225, 73.8520], // Mutha river bridge transition
        [18.5273, 73.8507], // Pataleshwar Cave Temple
        [18.5255, 73.8428], // Deccan / FC Road junction
        [18.5236, 73.8415]  // Vaishali Cafe
      ];

      const polyline = L.polyline(routeCoordinates, {
        color: '#2864A6',
        weight: 5,
        opacity: 0.85,
        dashArray: '8, 8',
        lineCap: 'round'
      });

      polyline.bindPopup(`
        <div style="font-family: 'Inter', sans-serif;">
          <strong style="color: #183B5B;">Demonstration Heritage Walk (Sample)</strong><br/>
          <span style="font-size: 11px; color: #64748B;">Shaniwar Wada ➔ Pataleshwar ➔ FC Road</span><br/>
          <em style="font-size: 10px; color: #b45309;">Simulated itinerary — not live navigation.</em>
        </div>
      `);

      polyline.addTo(map);
      demoRouteLayerRef.current = polyline;
      map.fitBounds(polyline.getBounds(), { padding: [40, 40] });
      setShowDemoRoute(true);
    }
  };

  // Center map on specific place from list
  const handleSelectPlaceFromList = (place) => {
    setSelectedPlaceId(place.id);
    const map = mapInstanceRef.current;
    if (map) {
      map.flyTo([place.coordinates.lat, place.coordinates.lng], 15, { duration: 1 });
    }
  };

  // Request user geolocation safely
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      setGeoNotice('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const map = mapInstanceRef.current;
        if (map) {
          map.flyTo([latitude, longitude], 14);
          L.circleMarker([latitude, longitude], {
            radius: 8,
            fillColor: '#2864A6',
            color: '#ffffff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.9
          }).addTo(map).bindPopup('You are here (Browser Geolocation)').openPopup();
        }
        setGeoNotice(null);
      },
      () => {
        // Graceful handle if denied
        setGeoNotice('Location permission not granted. Map remains centered on Pune landmarks.');
        setTimeout(() => setGeoNotice(null), 5000);
      },
      { timeout: 7000 }
    );
  };

  const selectedPlace = PUNE_PLACES.find(p => p.id === selectedPlaceId) || filteredPlaces[0];

  return (
    <div className="space-y-4 pb-12">
      
      {/* Map Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DCE7F2] pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#183B5B] font-['Plus_Jakarta_Sans']">
            Pune Interactive Map
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Explore geocoded landmarks, cafes, and parks with category-coded pins
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <DataBadge type="sample" label="OpenStreetMap • Seeded Pins" size="sm" />
          
          <button
            onClick={toggleDemoRoute}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              showDemoRoute 
                ? 'bg-[#2864A6] text-white border-[#2864A6]' 
                : 'bg-white text-[#183B5B] border-[#DCE7F2] hover:bg-[#EAF4FF]'
            }`}
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>{showDemoRoute ? 'Hide Sample Route' : 'Show Demo Heritage Route'}</span>
          </button>

          <button
            onClick={handleLocateMe}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white text-[#2864A6] border border-[#DCE7F2] hover:bg-[#EAF4FF] transition-all"
            title="Center on current location"
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">My Location</span>
          </button>
        </div>
      </div>

      {/* Geolocation Notice (if user denied or unavailable) */}
      {geoNotice && (
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between animate-fade-in">
          <span>{geoNotice}</span>
          <button onClick={() => setGeoNotice(null)} className="text-amber-700 font-bold hover:underline">Dismiss</button>
        </div>
      )}

      {/* Category Filter Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
              selectedCategory === cat.id
                ? 'bg-[#2864A6] text-white border-[#2864A6] shadow-2xs'
                : 'bg-white text-[#334155] border-[#DCE7F2] hover:bg-[#EAF4FF]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Map & Sidebar Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Leaflet Map Frame (col-span-8) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#DCE7F2] shadow-xs overflow-hidden relative">
          <div 
            ref={mapContainerRef} 
            className="w-full h-[450px] sm:h-[560px] z-10"
            style={{ background: '#EAF4FF' }}
          />

          {/* Map Legend Overlay */}
          <div className="absolute bottom-3 left-3 z-20 bg-white/95 backdrop-blur-xs p-2.5 rounded-xl border border-[#DCE7F2] shadow-md text-[11px] space-y-1 hidden sm:block">
            <span className="font-bold text-[#183B5B] block mb-1">Pin Legend</span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#b45309]" />
              <span className="text-[#334155]">Heritage Forts & Wadas</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#e11d48]" />
              <span className="text-[#334155]">Food & Cafes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#059669]" />
              <span className="text-[#334155]">Parks & Tekdis</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2563eb]" />
              <span className="text-[#334155]">City Attractions</span>
            </div>
          </div>

          {/* Demo Route Label Banner if visible */}
          {showDemoRoute && (
            <div className="absolute top-3 left-3 z-20 bg-[#183B5B]/90 text-white px-3 py-1.5 rounded-xl shadow-md text-xs flex items-center gap-2">
              <Navigation className="w-3.5 h-3.5 text-[#78B8F5]" />
              <span>Demonstration Scenic Loop (Illustrative walk; not live turn-by-turn)</span>
            </div>
          )}
        </div>

        {/* Linked Places Side Panel (col-span-4) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Active Place Spotlight */}
          {selectedPlace && (
            <div className="bg-white rounded-2xl border-2 border-[#78B8F5] p-4 shadow-sm space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[11px] font-semibold text-[#2864A6] bg-[#EAF4FF] px-2 py-0.5 rounded-md uppercase tracking-wider">
                  Selected on Map
                </span>
                <span className="text-xs font-bold text-amber-600">
                  ★ {selectedPlace.rating} <span className="text-[10px] text-[#64748B] font-normal">(Sample)</span>
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#183B5B] font-['Plus_Jakarta_Sans']">
                  {selectedPlace.name}
                </h3>
                <p className="text-xs text-[#64748B] flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-[#2864A6]" />
                  <span>{selectedPlace.neighbourhood}</span>
                </p>
                <p className="text-xs text-[#334155] mt-1.5 line-clamp-2">
                  {selectedPlace.description}
                </p>
              </div>

              <div className="pt-2 border-t border-[#DCE7F2] flex items-center justify-between text-xs">
                <span className="font-bold text-[#183B5B]">
                  {selectedPlace.indicativePrice === 0 ? 'Free Entry' : `₹${selectedPlace.indicativePrice}`}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onToggleCompare(selectedPlace.id)}
                    className="p-1.5 rounded-lg border border-[#DCE7F2] hover:bg-[#EAF4FF] text-[#2864A6]"
                    title="Add to comparison"
                  >
                    <Scale className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onToggleSave(selectedPlace.id)}
                    className="p-1.5 rounded-lg border border-[#DCE7F2] hover:bg-[#EAF4FF] text-rose-600"
                    title="Save place"
                  >
                    <Heart className={`w-3.5 h-3.5 ${savedPlaceIds.includes(selectedPlace.id) ? 'fill-rose-600' : ''}`} />
                  </button>
                  <button
                    onClick={() => onViewPlaceDetails(selectedPlace)}
                    className="bg-[#2864A6] hover:bg-[#1e5088] text-white px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* List of all filtered places */}
          <div className="bg-white rounded-2xl border border-[#DCE7F2] p-4 shadow-xs">
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-[#183B5B] uppercase tracking-wider">
                Places in View ({filteredPlaces.length})
              </span>
              <span className="text-[11px] text-[#64748B]">Click to locate</span>
            </div>

            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {filteredPlaces.map((place) => {
                const isSelected = selectedPlace?.id === place.id;
                return (
                  <div
                    key={place.id}
                    onClick={() => handleSelectPlaceFromList(place)}
                    className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between gap-2 ${
                      isSelected 
                        ? 'bg-[#EAF4FF] border-[#2864A6] shadow-2xs' 
                        : 'bg-white border-[#DCE7F2] hover:bg-slate-50'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="font-semibold text-[#183B5B] truncate">
                        {place.name}
                      </div>
                      <div className="text-[11px] text-[#64748B] truncate">
                        {place.neighbourhood} • {place.indicativePrice === 0 ? 'Free' : `₹${place.indicativePrice}`}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0">
                      <span className="text-[10px] text-amber-600 font-semibold">★ {place.rating}</span>
                      <CornerDownRight className="w-3.5 h-3.5 text-[#2864A6]" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
