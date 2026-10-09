/**
 * CityLoom Safety Seed & Simulation Data
 * 
 * IMPORTANT DISCLAIMER:
 * CityLoom is a community exploration platform. Data below includes simulated demonstration
 * incident reports and caution zones. This is NOT an emergency dispatch service or live police feed.
 * Citizen reports are unverified until officially validated.
 */

export const DEMO_SAFETY_SNAPSHOT = {
  city: 'Pune, Maharashtra',
  status: 'Simulated Demonstration Feed',
  lastUpdated: 'Today, 10:45 AM (Sample)',
  weather: {
    temp: '27°C',
    condition: 'Pleasant & Partly Sunny',
    humidity: '48%',
    aqi: 82,
    aqiLabel: 'Moderate (Sample Data)',
    wind: '11 km/h WNW'
  },
  traffic: {
    condition: 'Normal city circulation',
    summary: 'Steady flow along JM Road & FC Road; moderate bottleneck expected near Swargate Junction during evening transit (5:30 - 7:30 PM).',
    advisories: [
      'Ongoing metro girder maintenance along Karve Road — lane narrows near Nal Stop.',
      'Chandani Chowk multi-level flyover operational; exercise caution on high-speed bypass ramps.'
    ]
  },
  safetyAdvisory: {
    level: 'Normal Awareness',
    statement: 'Standard urban awareness advised. Use well-lit arterial thoroughfares after dark and verify local terrain when venturing on hills before sunset.',
    emergencyContacts: [
      { label: 'Police Control Room', number: '112 / 100' },
      { label: 'Ambulance Emergency', number: '108' },
      { label: 'Women Helpline', number: '1091' },
      { label: 'Pune Municipal Emergency Cell', number: '020-25501000' }
    ]
  }
};

export const DEMO_INCIDENTS = [
  {
    id: 'inc-001',
    category: 'road_hazard',
    title: 'Uneven Paver Blocks & Exposed Cable Trench',
    location: 'JM Road, near Balgandharva Rangmandir',
    neighbourhood: 'Shivajinagar',
    coordinates: { lat: 18.5248, lng: 73.8491 },
    date: '2026-10-07',
    time: '14:20',
    severity: 'Medium',
    status: 'Demonstration Report',
    isSample: true,
    description: 'Utility trench backfilling settled unevenly along pedestrian walkway; two-wheeler riders and walkers advised to avoid the road shoulder edge.',
    verified: false,
    reportedBy: 'Demo Community Watch'
  },
  {
    id: 'inc-002',
    category: 'poor_lighting',
    title: 'Flickering Street Lamps on Hill Approach Road',
    location: 'ARAI Access Road, approaching Vetal Tekdi base',
    neighbourhood: 'Kothrud',
    coordinates: { lat: 18.5175, lng: 73.8180 },
    date: '2026-10-06',
    time: '19:45',
    severity: 'Medium',
    status: 'Demonstration Report',
    isSample: true,
    description: 'A 200-meter stretch of the tree-covered approach road has four consecutive non-functional street fixtures, creating dark pockets at night.',
    verified: false,
    reportedBy: 'Demo Walker Association'
  },
  {
    id: 'inc-003',
    category: 'accident',
    title: 'Blind Curve Two-Wheeler Collision Spot',
    location: 'Sinhagad Ghat, Hairpin Turn 4 (Khadakwasla road)',
    neighbourhood: 'Haveli',
    coordinates: { lat: 18.3810, lng: 73.7620 },
    date: '2026-10-05',
    time: '11:15',
    severity: 'High',
    status: 'Demonstration Report',
    isSample: true,
    description: 'Narrow descending bend with poor mirror angle. Vehicles frequently cross center lane when descending. Speed bump recommendation submitted.',
    verified: false,
    reportedBy: 'Demo Commuter Post'
  },
  {
    id: 'inc-004',
    category: 'other_concern',
    title: 'Submerged Pothole After Rain Spurt',
    location: 'Swargate Flyover Underpass, Jedhe Chowk',
    neighbourhood: 'Swargate',
    coordinates: { lat: 18.5020, lng: 73.8580 },
    date: '2026-10-04',
    time: '17:00',
    severity: 'Medium',
    status: 'Demonstration Report',
    isSample: true,
    description: 'Water ponding conceals a 4-inch deep pothole in the leftmost lane heading towards Sarasbaug.',
    verified: false,
    reportedBy: 'Demo Urban Alert'
  }
];

export const CAUTION_ZONES = [
  {
    id: 'zone-01',
    zoneName: 'Swargate Multi-Transit Hub (Jedhe Chowk)',
    type: 'High Pedestrian & Bus Density',
    severity: 'Caution',
    description: 'One of Maharashtra\'s busiest transit junctions with merging ST buses, city buses, and metro commuters. Heavy mixed traffic requires alert road crossing.',
    recommendation: 'Use designated subway/metro pedestrian underpasses instead of crossing across multi-lane surface bus bays.'
  },
  {
    id: 'zone-02',
    zoneName: 'Sinhagad Ghat Road Section',
    type: 'Steep Incline & Hairpin Turns',
    severity: 'Caution',
    description: 'Mountain road characterized by sharp ascending corners, mist during wet weather, and weekend congestion.',
    recommendation: 'Ensure vehicle brakes are in order, honk before blind curves, and descend in low gear.'
  },
  {
    id: 'zone-03',
    zoneName: 'Vetal Tekdi Hilltop Trails after Sunset',
    type: 'Low Night Illumination',
    severity: 'Moderate',
    description: 'Ecologically preserved wooded hill with minimal artificial lighting to preserve nocturnal wildlife.',
    recommendation: 'Complete hiking and walking activities before twilight (6:30 PM); carry a flashlight if delayed.'
  },
  {
    id: 'zone-04',
    zoneName: 'Khadakwasla Dam Spillway Road',
    type: 'Deep Water & Slippery Bund',
    severity: 'High Warning',
    description: 'Swift water currents during dam releases and slippery moss on stone embankments.',
    recommendation: 'Stay strictly on paved viewing promenade behind metal safety barriers; do not enter reservoir water.'
  }
];

export const REPORT_CATEGORIES = [
  { value: 'road_hazard', label: 'Road Hazard / Pothole' },
  { value: 'poor_lighting', label: 'Poor Lighting / Dark Street' },
  { value: 'accident', label: 'Accident Prone Spot / Collision' },
  { value: 'other_concern', label: 'Other Citizen Concern' }
];
