/**
 * CityLoom LocalStorage Utility Module
 * Manages saved favourites, recently viewed, compare selections, and citizen reports.
 */

import { DEMO_INCIDENTS } from '../data/safetyData';

const KEYS = {
  SAVED_PLACES: 'cityloom_saved_places',
  RECENTLY_VIEWED: 'cityloom_recently_viewed',
  COMPARE_LIST: 'cityloom_compare_list',
  CITIZEN_REPORTS: 'cityloom_citizen_reports',
  RECENT_SEARCHES: 'cityloom_recent_searches'
};

// Safe JSON parser
function safeParse(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (err) {
    console.warn(`Error reading localStorage key "${key}":`, err);
    return fallback;
  }
}

// Safe JSON writer
function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Error writing localStorage key "${key}":`, err);
  }
}

/* ================= SAVED PLACES ================= */

export function getSavedPlaces() {
  return safeParse(KEYS.SAVED_PLACES, ['shaniwar-wada', 'vaishali-restaurant']);
}

export function isPlaceSaved(placeId) {
  const list = getSavedPlaces();
  return list.includes(placeId);
}

export function toggleSavedPlace(placeId) {
  const current = getSavedPlaces();
  let updated;
  let isSavedNow;
  if (current.includes(placeId)) {
    updated = current.filter(id => id !== placeId);
    isSavedNow = false;
  } else {
    updated = [placeId, ...current];
    isSavedNow = true;
  }
  safeSet(KEYS.SAVED_PLACES, updated);
  return { updated, isSavedNow };
}

/* ================= RECENTLY VIEWED ================= */

export function getRecentlyViewed() {
  return safeParse(KEYS.RECENTLY_VIEWED, ['shaniwar-wada', 'goodluck-cafe', 'pula-deshpande-garden']);
}

export function recordRecentlyViewed(placeId) {
  if (!placeId) return;
  const current = getRecentlyViewed().filter(id => id !== placeId);
  const updated = [placeId, ...current].slice(0, 8); // max 8
  safeSet(KEYS.RECENTLY_VIEWED, updated);
  return updated;
}

/* ================= COMPARE SELECTIONS ================= */

export function getCompareList() {
  return safeParse(KEYS.COMPARE_LIST, ['shaniwar-wada', 'aga-khan-palace']);
}

export function toggleComparePlace(placeId) {
  const current = getCompareList();
  if (current.includes(placeId)) {
    const updated = current.filter(id => id !== placeId);
    safeSet(KEYS.COMPARE_LIST, updated);
    return { list: updated, added: false, message: 'Removed from comparison' };
  } else {
    if (current.length >= 3) {
      return {
        list: current,
        added: false,
        error: 'Comparison limit reached (maximum 3 places). Remove one to add another.'
      };
    }
    const updated = [...current, placeId];
    safeSet(KEYS.COMPARE_LIST, updated);
    return { list: updated, added: true, message: 'Added to comparison list' };
  }
}

export function clearCompareList() {
  safeSet(KEYS.COMPARE_LIST, []);
  return [];
}

/* ================= CITIZEN REPORTS ================= */

export function getCitizenReports() {
  const userReports = safeParse(KEYS.CITIZEN_REPORTS, []);
  // Combine user reports (first) with demo incidents
  return [...userReports, ...DEMO_INCIDENTS];
}

export function addCitizenReport(reportData) {
  const current = safeParse(KEYS.CITIZEN_REPORTS, []);
  const newReport = {
    id: `user-rep-${Date.now()}`,
    ...reportData,
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    status: 'Citizen Report (Unverified)',
    isSample: false,
    verified: false,
    reportedBy: 'Local Citizen (You)'
  };
  const updated = [newReport, ...current];
  safeSet(KEYS.CITIZEN_REPORTS, updated);
  return newReport;
}

/* ================= RECENT SEARCHES ================= */

export function getRecentSearches() {
  return safeParse(KEYS.RECENT_SEARCHES, ['FC Road cafes', 'Historical forts', 'Gardens with parking']);
}

export function addRecentSearch(query) {
  if (!query || query.trim().length < 2) return;
  const trimmed = query.trim();
  const current = getRecentSearches().filter(q => q.toLowerCase() !== trimmed.toLowerCase());
  const updated = [trimmed, ...current].slice(0, 5);
  safeSet(KEYS.RECENT_SEARCHES, updated);
  return updated;
}
