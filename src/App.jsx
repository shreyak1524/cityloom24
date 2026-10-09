import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PlaceDetailModal from './components/PlaceDetailModal';
import QuickSearchModal from './components/QuickSearchModal';
import Toast from './components/Toast';

import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import MapPage from './pages/MapPage';
import ComparePage from './pages/ComparePage';
import SafetyPage from './pages/SafetyPage';
import CulturePage from './pages/CulturePage';
import SavedPage from './pages/SavedPage';

import { 
  getSavedPlaces, 
  toggleSavedPlace, 
  getCompareList, 
  toggleComparePlace, 
  clearCompareList,
  getRecentlyViewed, 
  recordRecentlyViewed, 
  getCitizenReports 
} from './utils/storage';

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState('home');
  const [exploreParams, setExploreParams] = useState({ search: '', category: 'all' });

  // City selection state (Pune default)
  const [selectedCity, setSelectedCity] = useState({
    id: 'pune',
    name: 'Pune, Maharashtra',
    status: 'Active Demo City (Full Dataset)'
  });

  // LocalStorage-backed state (lazy initializer for instant hydration)
  const [savedPlaceIds, setSavedPlaceIds] = useState(() => getSavedPlaces());
  const [comparePlaceIds, setComparePlaceIds] = useState(() => getCompareList());
  const [recentlyViewedIds, setRecentlyViewedIds] = useState(() => getRecentlyViewed());
  const [citizenReports, setCitizenReports] = useState(() => getCitizenReports());

  // Modals & Overlays
  const [selectedPlaceForModal, setSelectedPlaceForModal] = useState(null);
  const [mapFocusedPlace, setMapFocusedPlace] = useState(null);
  const [quickSearchOpen, setQuickSearchOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Show Toast Helper
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  // Toggle Save Place
  const handleToggleSave = (placeId) => {
    const { updated, isSavedNow } = toggleSavedPlace(placeId);
    setSavedPlaceIds(updated);
    showToast(
      isSavedNow ? 'Added to Saved Places' : 'Removed from Saved Places',
      isSavedNow ? 'success' : 'info'
    );
  };

  // Toggle Compare Place
  const handleToggleCompare = (placeId) => {
    const result = toggleComparePlace(placeId);
    if (result.error) {
      showToast(result.error, 'error');
      return;
    }
    setComparePlaceIds(result.list);
    showToast(result.message, result.added ? 'success' : 'info');
  };

  // Clear Compare
  const handleClearCompare = () => {
    const empty = clearCompareList();
    setComparePlaceIds(empty);
    showToast('Comparison matrix cleared', 'info');
  };

  // View Place Details
  const handleViewPlaceDetails = (place) => {
    if (!place) return;
    const updatedRecents = recordRecentlyViewed(place.id);
    if (updatedRecents) {
      setRecentlyViewedIds(updatedRecents);
    }
    setSelectedPlaceForModal(place);
  };

  // Navigate to Map focusing on place
  const handleNavigateToMap = (place) => {
    setMapFocusedPlace(place);
    setCurrentTab('map');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Tab Selection
  const handleSelectTab = (tab, params = {}) => {
    setCurrentTab(tab);
    if (tab === 'explore') {
      setExploreParams({
        search: params.search || '',
        category: params.category || 'all'
      });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Citizen Report Submitted
  const handleReportSubmitted = (newReport) => {
    setCitizenReports(prev => [newReport, ...prev]);
  };

  // Quick Search Handlers
  const handleQuickSearchExplore = (query) => {
    handleSelectTab('explore', { search: query });
  };

  return (
    <div className="min-h-screen bg-[#EAF4FF] text-[#334155] flex flex-col font-['Inter'] selection:bg-[#C7E2FF] selection:text-[#183B5B]">
      
      {/* Top Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        savedCount={savedPlaceIds.length}
        compareCount={comparePlaceIds.length}
        onOpenQuickSearch={() => setQuickSearchOpen(true)}
        selectedCity={selectedCity}
        onSelectCity={(city) => {
          setSelectedCity(city);
          if (city.id !== 'pune') {
            showToast(`${city.name} preview dataset is coming soon. Showing Pune demonstration dataset.`, 'info');
          }
        }}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 w-full">
        {currentTab === 'home' && (
          <HomePage
            onSelectTab={handleSelectTab}
            onViewPlaceDetails={handleViewPlaceDetails}
            savedPlaceIds={savedPlaceIds}
            onToggleSave={handleToggleSave}
            comparePlaceIds={comparePlaceIds}
            onToggleCompare={handleToggleCompare}
            recentlyViewedIds={recentlyViewedIds}
          />
        )}

        {currentTab === 'explore' && (
          <ExplorePage
            key={`${exploreParams.search}-${exploreParams.category}`}
            initialSearch={exploreParams.search}
            initialCategory={exploreParams.category}
            onViewPlaceDetails={handleViewPlaceDetails}
            savedPlaceIds={savedPlaceIds}
            onToggleSave={handleToggleSave}
            comparePlaceIds={comparePlaceIds}
            onToggleCompare={handleToggleCompare}
          />
        )}

        {currentTab === 'map' && (
          <MapPage
            focusedPlace={mapFocusedPlace}
            onViewPlaceDetails={handleViewPlaceDetails}
            savedPlaceIds={savedPlaceIds}
            onToggleSave={handleToggleSave}
            comparePlaceIds={comparePlaceIds}
            onToggleCompare={handleToggleCompare}
          />
        )}

        {currentTab === 'compare' && (
          <ComparePage
            comparePlaceIds={comparePlaceIds}
            onToggleCompare={handleToggleCompare}
            onClearCompare={handleClearCompare}
            onViewPlaceDetails={handleViewPlaceDetails}
            onSelectTab={handleSelectTab}
          />
        )}

        {currentTab === 'safety' && (
          <SafetyPage
            citizenReports={citizenReports}
            onReportSubmitted={handleReportSubmitted}
            showToast={showToast}
          />
        )}

        {currentTab === 'culture' && (
          <CulturePage
            onViewPlaceDetails={handleViewPlaceDetails}
            onSelectTab={handleSelectTab}
          />
        )}

        {currentTab === 'saved' && (
          <SavedPage
            savedPlaceIds={savedPlaceIds}
            onToggleSave={handleToggleSave}
            onViewPlaceDetails={handleViewPlaceDetails}
            comparePlaceIds={comparePlaceIds}
            onToggleCompare={handleToggleCompare}
            onSelectTab={handleSelectTab}
          />
        )}
      </main>

      {/* Global Place Details Modal */}
      <PlaceDetailModal
        place={selectedPlaceForModal}
        isOpen={Boolean(selectedPlaceForModal)}
        onClose={() => setSelectedPlaceForModal(null)}
        isSaved={selectedPlaceForModal ? savedPlaceIds.includes(selectedPlaceForModal.id) : false}
        onToggleSave={handleToggleSave}
        isInCompare={selectedPlaceForModal ? comparePlaceIds.includes(selectedPlaceForModal.id) : false}
        onToggleCompare={handleToggleCompare}
        onNavigateToMap={handleNavigateToMap}
      />

      {/* Global Quick Search Modal */}
      <QuickSearchModal
        isOpen={quickSearchOpen}
        onClose={() => setQuickSearchOpen(false)}
        onSelectPlace={handleViewPlaceDetails}
        onExploreSearch={handleQuickSearchExplore}
      />

      {/* Feedback Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Global Brand Footer */}
      <Footer onSelectTab={handleSelectTab} />

    </div>
  );
}
