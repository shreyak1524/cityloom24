/**
 * CityLoom Seed Data: Pune, Maharashtra
 * 
 * Note: Ratings, cleanliness notes, and safety insights are seeded demonstration data.
 * All entries are clearly labeled as sample data in the UI.
 */

export const PUNE_PLACES = [
  {
    id: 'shaniwar-wada',
    name: 'Shaniwar Wada',
    category: 'heritage',
    neighbourhood: 'Shaniwar Peth',
    description: 'The historic 18th-century seat of the Peshwa rulers of the Maratha Empire. Famous for its imposing Dilli Darwaza, stone ramparts, and expansive landscaped inner gardens.',
    indicativePrice: 25,
    priceRangeLabel: '₹25 for Indians, ₹300 for foreigners',
    isBudgetFriendly: true,
    rating: 4.5,
    ratingCount: 3840,
    ratingStatus: 'Demonstration Sample',
    cleanliness: {
      level: 'Moderate',
      description: 'Lawn grounds are clean and well-tended; perimeter walls have occasional dust due to ongoing heritage conservation.'
    },
    accessibility: {
      wheelchairAccess: false,
      publicTransitNearby: true,
      parkingAvailable: true,
      notes: 'Main ground garden paths are flat stone; rampart upper bastions require climbing steep historic stone steps.'
    },
    safety: {
      lighting: 'Well-lit',
      crowdLevel: 'Active & Family-friendly',
      bestTimeToVisit: 'Early morning (8:00 AM - 11:00 AM) or sunset',
      dataStatus: 'Sample Demonstration Data',
      safetyNotes: 'Ticketed archaeological premises with security personnel at entry gates and bag screening.'
    },
    coordinates: { lat: 18.5196, lng: 73.8553 },
    tags: ['Historical Fort', 'Maratha Empire', 'Architecture', 'Landmark', 'Photography'],
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=900&q=80',
    culturalHighlights: 'Built in 1732 by Peshwa Baji Rao I. The fort had seven storeys before the great fire of 1828. Its massive Dilli Darwaza has iron spikes designed to repel war elephants.',
    openingHours: '8:00 AM – 6:30 PM (Daily)'
  },
  {
    id: 'aga-khan-palace',
    name: 'Aga Khan Palace',
    category: 'heritage',
    neighbourhood: 'Yerwada / Kalyani Nagar',
    description: 'A majestic Italian-arched palace with tranquil lawns, serving as a pivotal monument of India\'s freedom movement where Mahatma Gandhi and Kasturba Gandhi were interned in 1942.',
    indicativePrice: 25,
    priceRangeLabel: '₹25 entry fee',
    isBudgetFriendly: true,
    rating: 4.6,
    ratingCount: 2910,
    ratingStatus: 'Demonstration Sample',
    cleanliness: {
      level: 'High',
      description: 'Maintained by the Archaeological Survey of India with immaculate lawns and clean memorial galleries.'
    },
    accessibility: {
      wheelchairAccess: true,
      publicTransitNearby: true,
      parkingAvailable: true,
      notes: 'Paved ramps facilitate entrance to ground-floor memorial rooms and serene tree-lined walkways.'
    },
    safety: {
      lighting: 'Well-lit',
      crowdLevel: 'Calm & Contemplative',
      bestTimeToVisit: 'Morning (9:00 AM - 12:00 PM)',
      dataStatus: 'Sample Demonstration Data',
      safetyNotes: 'Peaceful fenced perimeter with strict bag checks and calm campus security.'
    },
    coordinates: { lat: 18.5524, lng: 73.9015 },
    tags: ['Freedom Movement', 'Memorial', 'Architecture', 'Gardens', 'Museum'],
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=900&q=80',
    culturalHighlights: 'Constructed in 1892 by Sultan Muhammad Shah Aga Khan III to aid famine-hit villagers. Houses Kasturba Gandhi\'s memorial (samadhi) and Gandhi\'s ashes.',
    openingHours: '9:00 AM – 5:30 PM (Daily)'
  },
  {
    id: 'sinhagad-fort',
    name: 'Sinhagad Fort',
    category: 'heritage',
    neighbourhood: 'Sinhagad Ghat / Haveli',
    description: 'Perched on an isolated cliff 1,312 meters above sea level in the Sahyadri ranges. Renowned for Tanaji Malusare\'s legendary battle of 1670 and sizzling hot kanda bhaji and pitla bhakri.',
    indicativePrice: 50,
    priceRangeLabel: '₹50 vehicle forest entry fee',
    isBudgetFriendly: true,
    rating: 4.7,
    ratingCount: 6120,
    ratingStatus: 'Demonstration Sample',
    cleanliness: {
      level: 'Moderate',
      description: 'Natural mountain plateau; forest department clean-up drives keep major paths clear of plastic.'
    },
    accessibility: {
      wheelchairAccess: false,
      publicTransitNearby: false,
      parkingAvailable: true,
      notes: 'Rugged mountain terrain; requires sturdy footwear and moderate uphill trekking.'
    },
    safety: {
      lighting: 'Low',
      crowdLevel: 'Very Active on Weekends',
      bestTimeToVisit: 'Early morning (6:30 AM - 10:00 AM) or monsoon drizzle',
      dataStatus: 'Sample Demonstration Data',
      safetyNotes: 'Ghat roads have sharp hairpin turns; fog lowers visibility in monsoons. Caution advised near unfenced cliff edges.'
    },
    coordinates: { lat: 18.3663, lng: 73.7558 },
    tags: ['Mountain Trek', 'Maratha History', 'Scenic Views', 'Street Food', 'Nature'],
    image: 'https://images.unsplash.com/photo-1626014303757-657d425b045d?auto=format&fit=crop&w=900&q=80',
    culturalHighlights: 'Formerly called Kondhana, renamed Sinhagad ("Lion\'s Fort") by Chhatrapati Shivaji Maharaj in tribute to his valorous commander Tanaji Malusare.',
    openingHours: '5:00 AM – 6:00 PM (Entry shuts at sunset)'
  },
  {
    id: 'pataleshwar-cave',
    name: 'Pataleshwar Cave Temple',
    category: 'heritage',
    neighbourhood: 'Shivajinagar',
    description: 'An ancient 8th-century monolithic rock-cut cave temple carved out of a single basalt rock during the Rashtrakuta period, dedicated to Lord Shiva in the bustling heart of the city.',
    indicativePrice: 0,
    priceRangeLabel: 'Free entry',
    isBudgetFriendly: true,
    rating: 4.4,
    ratingCount: 1850,
    ratingStatus: 'Demonstration Sample',
    cleanliness: {
      level: 'High',
      description: 'Shaded courtyard and stone shrine are systematically swept by heritage caretakers.'
    },
    accessibility: {
      wheelchairAccess: false,
      publicTransitNearby: true,
      parkingAvailable: false,
      notes: 'Carved subterranean complex accessed via short stone stairs; metro and bus stops within 200m.'
    },
    safety: {
      lighting: 'Well-lit',
      crowdLevel: 'Quiet & Serene',
      bestTimeToVisit: 'Afternoon (cool basalt retreat) or morning',
      dataStatus: 'Sample Demonstration Data',
      safetyNotes: 'Centrally situated on Jungli Maharaj Road with active street foot traffic and nearby police kiosk.'
    },
    coordinates: { lat: 18.5273, lng: 73.8507 },
    tags: ['Rock Cut Caves', 'Ancient Temple', 'Monolithic', 'Shivajinagar', 'Quiet Retreat'],
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80',
    culturalHighlights: 'Features a massive circular Nandi mandapa (pavilion) supported by twelve massive square pillars, reminiscent of the Elephanta Caves.',
    openingHours: '8:30 AM – 5:30 PM (Daily)'
  },
  {
    id: 'vaishali-restaurant',
    name: 'Vaishali Restaurant',
    category: 'food',
    neighbourhood: 'Fergusson College Road',
    description: 'An iconic culinary institution on FC Road serving piping-hot Mysore Masala Dosas, SPDP (Sev Potato Dahi Puri), and South Indian filter coffee to generations of college students and writers.',
    indicativePrice: 200,
    priceRangeLabel: '₹150 - ₹300 per person',
    isBudgetFriendly: true,
    rating: 4.6,
    ratingCount: 8400,
    ratingStatus: 'Demonstration Sample',
    cleanliness: {
      level: 'High',
      description: 'Fastidious hygiene standards with open visible counters and rapid sanitization between patrons.'
    },
    accessibility: {
      wheelchairAccess: true,
      publicTransitNearby: true,
      parkingAvailable: false,
      notes: 'Level entrance from main pavement; street parking is limited on FC Road so walking or metro is advised.'
    },
    safety: {
      lighting: 'Well-lit',
      crowdLevel: 'High Footfall & Bustling',
      bestTimeToVisit: 'Morning breakfast (7:30 AM - 9:30 AM) to avoid peak queues',
      dataStatus: 'Sample Demonstration Data',
      safetyNotes: 'High-visibility commercial arterial corridor with active municipal patrols.'
    },
    coordinates: { lat: 18.5236, lng: 73.8415 },
    tags: ['South Indian', 'FC Road Icon', 'Filter Coffee', 'Student Culture', 'Breakfast'],
    image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=900&q=80',
    culturalHighlights: 'Opened in the 1950s under the name Madras Cafe, it evolved into Vaishali and became the de facto discussion salon for Pune\'s intellectuals and Fergusson alumni.',
    openingHours: '7:00 AM – 11:00 PM (Daily)'
  },
  {
    id: 'goodluck-cafe',
    name: 'Cafe Goodluck',
    category: 'food',
    neighbourhood: 'Deccan Gymkhana',
    description: 'Founded in 1935, this legendary Irani cafe is celebrated for its warm toasted Bun Maska dipped in sweet Irani chai, savory mutton keema pav, and nostalgic marble-topped tables.',
    indicativePrice: 180,
    priceRangeLabel: '₹120 - ₹250 per person',
    isBudgetFriendly: true,
    rating: 4.5,
    ratingCount: 7200,
    ratingStatus: 'Demonstration Sample',
    cleanliness: {
      level: 'Moderate',
      description: 'Fast-paced traditional cafe environment; tables wiped immediately after service.'
    },
    accessibility: {
      wheelchairAccess: true,
      publicTransitNearby: true,
      parkingAvailable: false,
      notes: 'Ground level access on Goodluck Chowk; easy walking distance to Deccan PMPML bus terminals.'
    },
    safety: {
      lighting: 'Well-lit',
      crowdLevel: 'Very Active',
      bestTimeToVisit: 'Early morning (7:00 AM - 9:00 AM)',
      dataStatus: 'Sample Demonstration Data',
      safetyNotes: 'Located at a major traffic chowk; exercise pedestrian care while crossing the intersection.'
    },
    coordinates: { lat: 18.5173, lng: 73.8414 },
    tags: ['Irani Cafe', 'Bun Maska', 'Keema Pav', 'Heritage Cafe', 'Breakfast Spot'],
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80',
    culturalHighlights: 'One of Pune\'s oldest functioning Irani establishments, historically patronized by actors from the nearby Film and Television Institute of India (FTII).',
    openingHours: '7:30 AM – 11:30 PM (Daily)'
  },
  {
    id: 'shabree-restaurant',
    name: 'Shabree Maharashtrian Thali',
    category: 'food',
    neighbourhood: 'FC Road / Shivajinagar',
    description: 'Renowned destination for authentic traditional Maharashtrian thalis, featuring piping hot jowar and bajra bhakris, puran poli, bharli vangi, and fresh kothimbir vadi.',
    indicativePrice: 450,
    priceRangeLabel: '₹350 - ₹550 per person',
    isBudgetFriendly: false,
    rating: 4.5,
    ratingCount: 3120,
    ratingStatus: 'Demonstration Sample',
    cleanliness: {
      level: 'High',
      description: 'Polished family dining ambiance with pristine traditional copper tableware and clean restroom facilities.'
    },
    accessibility: {
      wheelchairAccess: true,
      publicTransitNearby: true,
      parkingAvailable: true,
      notes: 'Elevator access available from the building ground entrance; valet parking offered during peak hours.'
    },
    safety: {
      lighting: 'Well-lit',
      crowdLevel: 'Family Dining',
      bestTimeToVisit: 'Lunch (12:30 PM - 2:30 PM)',
      dataStatus: 'Sample Demonstration Data',
      safetyNotes: 'Situated in a secure commercial complex with dedicated building watchmen.'
    },
    coordinates: { lat: 18.5255, lng: 73.8428 },
    tags: ['Maharashtrian Cuisine', 'Traditional Thali', 'Puran Poli', 'Cultural Dining', 'Vegetarian'],
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=900&q=80',
    culturalHighlights: 'Showcases native festive flavors from Vidarbha, Khandesh, and Western Maharashtra under one roof.',
    openingHours: '11:30 AM – 3:30 PM, 7:00 PM – 11:00 PM'
  },
  {
    id: 'sujata-mastani',
    name: 'Sujata Mastani',
    category: 'food',
    neighbourhood: 'Sadashiv Peth',
    description: 'The birthplace of Pune\'s signature dessert drink: a velvety, thick mango and dry fruit milk shake topped with rich handcrafted ice cream scoops and sliced pistachios.',
    indicativePrice: 110,
    priceRangeLabel: '₹80 - ₹160 per glass',
    isBudgetFriendly: true,
    rating: 4.7,
    ratingCount: 5200,
    ratingStatus: 'Demonstration Sample',
    cleanliness: {
      level: 'High',
      description: 'Strict cold-chain hygiene with stainless steel dairy dispensing equipment.'
    },
    accessibility: {
      wheelchairAccess: true,
      publicTransitNearby: true,
      parkingAvailable: false,
      notes: 'Storefront counter accessible directly from the sidewalk.'
    },
    safety: {
      lighting: 'Well-lit',
      crowdLevel: 'Evening Footfall',
      bestTimeToVisit: 'Post-dinner (8:00 PM - 10:30 PM)',
      dataStatus: 'Sample Demonstration Data',
      safetyNotes: 'Lively traditional Peth neighbourhood with constant local pedestrian presence.'
    },
    coordinates: { lat: 18.5132, lng: 73.8524 },
    tags: ['Mastani Drink', 'Dessert', 'Pune Speciality', 'Mango Shake', 'Late Night Sweet'],
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80',
    culturalHighlights: 'Invented in Pune and named in honor of warrior princess Mastani, consort of Peshwa Baji Rao I.',
    openingHours: '11:00 AM – 11:00 PM (Daily)'
  },
  {
    id: 'pula-deshpande-garden',
    name: 'Pune-Okayama Friendship Garden',
    category: 'parks',
    neighbourhood: 'Sinhagad Road / Dattawadi',
    description: 'Also known as Pu La Deshpande Garden, this 10-acre serene landscape is modelled after Japan\'s famous 300-year-old Kōraku-en Garden, featuring tranquil ponds, wooden bridges, and manicured lawns.',
    indicativePrice: 20,
    priceRangeLabel: '₹20 entry ticket',
    isBudgetFriendly: true,
    rating: 4.6,
    ratingCount: 4100,
    ratingStatus: 'Demonstration Sample',
    cleanliness: {
      level: 'High',
      description: 'Strict no-plastic policy and dedicated gardeners maintain pristine gravel paths and water bodies.'
    },
    accessibility: {
      wheelchairAccess: true,
      publicTransitNearby: true,
      parkingAvailable: true,
      notes: 'Paved perimeter paths suitable for strollers and wheelchairs; some elevated pavilions have small steps.'
    },
    safety: {
      lighting: 'Moderate',
      crowdLevel: 'Family & Walkers',
      bestTimeToVisit: 'Morning (6:30 AM - 9:30 AM) or sunset (4:30 PM - 6:30 PM)',
      dataStatus: 'Sample Demonstration Data',
      safetyNotes: 'Ticketed municipal park with security guards stationed along the water perimeters.'
    },
    coordinates: { lat: 18.4925, lng: 73.8344 },
    tags: ['Japanese Garden', 'Water Streams', 'Peaceful Walk', 'Botanical', 'Pu La Deshpande'],
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=900&q=80',
    culturalHighlights: 'Symbolizes the friendship pact between the twin cities of Pune and Okayama, honoring revered Marathi humorist & playwright P. L. Deshpande.',
    openingHours: '6:00 AM – 10:30 AM, 4:00 PM – 8:00 PM'
  },
  {
    id: 'vetal-tekdi',
    name: 'Vetal Tekdi (ARAI Hill)',
    category: 'parks',
    neighbourhood: 'Kothrud / Paud Road',
    description: 'The highest natural summit within Pune municipal limits at 2,600 feet, providing panoramic skyline views, lush birdwatching habitats, and morning fitness trails beloved by locals.',
    indicativePrice: 0,
    priceRangeLabel: 'Free public hill reserve',
    isBudgetFriendly: true,
    rating: 4.8,
    ratingCount: 5400,
    ratingStatus: 'Demonstration Sample',
    cleanliness: {
      level: 'Moderate',
      description: 'Natural forest hillock maintained by citizens\' volunteer environmental groups.'
    },
    accessibility: {
      wheelchairAccess: false,
      publicTransitNearby: false,
      parkingAvailable: true,
      notes: 'Earthen jogging trails with natural rocky inclines; parking available near ARAI gate.'
    },
    safety: {
      lighting: 'Low',
      crowdLevel: 'Popular Morning / Secluded at Twilight',
      bestTimeToVisit: 'Dawn (6:00 AM - 8:30 AM) for sunrise and fresh breeze',
      dataStatus: 'Sample Demonstration Data',
      safetyNotes: 'Unlit wooded paths after dark; visitors are advised to finish excursions before sunset and avoid walking alone after dark.'
    },
    coordinates: { lat: 18.5192, lng: 73.8169 },
    tags: ['Hill Trail', 'Sunrise Viewpoint', 'Birdwatching', 'Green Lung', 'Free Exercise'],
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
    culturalHighlights: 'Hosts the historic Vetala shrine atop the ridge. Crucial ecological buffer preventing urban heat islanding in western Pune.',
    openingHours: 'Open 24 hours (Recommended: 5:30 AM – 6:30 PM)'
  },
  {
    id: 'sarasbaug-temple',
    name: 'Sarasbaug & Ganpati Temple',
    category: 'attractions',
    neighbourhood: 'Sadashiv Peth / Swargate',
    description: 'A picturesque garden park surrounding a sacred island temple dedicated to Lord Ganesha (Talyatla Ganpati), built amidst what was once a scenic lake by Peshwa Sawai Madhavrao.',
    indicativePrice: 0,
    priceRangeLabel: 'Free entry',
    isBudgetFriendly: true,
    rating: 4.6,
    ratingCount: 3950,
    ratingStatus: 'Demonstration Sample',
    cleanliness: {
      level: 'Moderate',
      description: 'Lush green lawns and clean temple precinct; evening food stalls outside the gate require mindful litter disposal.'
    },
    accessibility: {
      wheelchairAccess: true,
      publicTransitNearby: true,
      parkingAvailable: true,
      notes: 'Paved ramps connect the garden entrance to the temple bridge; 5-minute walk from Swargate bus hub.'
    },
    safety: {
      lighting: 'Well-lit',
      crowdLevel: 'Family & Devotees',
      bestTimeToVisit: 'Early morning (7:00 AM - 10:00 AM) or sunset',
      dataStatus: 'Sample Demonstration Data',
      safetyNotes: 'Well-illuminated premises with municipal guards and high pedestrian density.'
    },
    coordinates: { lat: 18.5015, lng: 73.8538 },
    tags: ['Island Temple', 'Ganesh Temple', 'Garden Park', 'Swargate', 'Family Outing'],
    image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=900&q=80',
    culturalHighlights: 'Commissioned in 1784. The idol is fondly hailed as "Talyatla Ganpati" (Ganpati in the lake) as the original shrine stood on a dry island.',
    openingHours: '6:00 AM – 9:00 PM (Daily)'
  },
  {
    id: 'raja-kelkar-museum',
    name: 'Raja Dinkar Kelkar Museum',
    category: 'heritage',
    neighbourhood: 'Shukrawar Peth',
    description: 'A fascinating repository of over 20,000 Indian handicrafts, musical instruments, Mughal miniature paintings, and carved wooden doors collected by Dr. D.G. Kelkar in memory of his son.',
    indicativePrice: 100,
    priceRangeLabel: '₹100 for adults, ₹30 for children',
    isBudgetFriendly: true,
    rating: 4.5,
    ratingCount: 2200,
    ratingStatus: 'Demonstration Sample',
    cleanliness: {
      level: 'High',
      description: 'Climate-controlled glass cases and well-maintained museum galleries across three storeys.'
    },
    accessibility: {
      wheelchairAccess: false,
      publicTransitNearby: true,
      parkingAvailable: false,
      notes: 'Multi-level traditional Rajasthani-style brick building with internal stairs; no elevator.'
    },
    safety: {
      lighting: 'Well-lit',
      crowdLevel: 'Moderate & Cultural',
      bestTimeToVisit: 'Midday (11:00 AM - 2:00 PM)',
      dataStatus: 'Sample Demonstration Data',
      safetyNotes: 'Staff-monitored heritage institution with CCTV surveillance.'
    },
    coordinates: { lat: 18.5108, lng: 73.8542 },
    tags: ['Folk Art', 'Musical Instruments', 'Peshwa Artifacts', 'Antiques', 'Cultural Heritage'],
    image: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&w=900&q=80',
    culturalHighlights: 'Features the reconstructed "Mastani Mahal", an ornate wooden palace hall brought piece by piece from Kothrud to preserve its intricate carvings.',
    openingHours: '10:00 AM – 5:30 PM (Daily)'
  },
  {
    id: 'ritz-carlton-pune',
    name: 'The Ritz-Carlton, Pune',
    category: 'hotels',
    neighbourhood: 'Yerwada / Golf Course Road',
    description: 'Ultra-luxury urban sanctuary overlooking the Poona Club Golf Course, blending classical neoclassical grandeur with modern Indian hospitality, signature spas, and rooftop dining.',
    indicativePrice: 16500,
    priceRangeLabel: '₹14,000 - ₹22,000 / night',
    isBudgetFriendly: false,
    rating: 4.8,
    ratingCount: 1640,
    ratingStatus: 'Demonstration Sample',
    cleanliness: {
      level: 'High',
      description: 'Luxury five-star sanitization protocols, pristine marble concourses, and private air purification.'
    },
    accessibility: {
      wheelchairAccess: true,
      publicTransitNearby: true,
      parkingAvailable: true,
      notes: 'Full ADA compliance, step-free access, wide elevators, and dedicated accessible suites.'
    },
    safety: {
      lighting: 'Well-lit',
      crowdLevel: 'Private & Secure',
      bestTimeToVisit: 'Staycation / Dinner at rooftop Aasmana',
      dataStatus: 'Sample Demonstration Data',
      safetyNotes: '24/7 private concierge, vehicle undercarriage scanners, and electronic room access.'
    },
    coordinates: { lat: 18.5492, lng: 73.8947 },
    tags: ['Luxury Hotel', 'Golf Course View', 'Fine Dining', 'Spa', 'Executive Stay'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
    culturalHighlights: 'Showcases curated modern Indian art installations and architectural motifs paying homage to Maratha royalty.',
    openingHours: '24 Hours'
  },
  {
    id: 'zostel-pune',
    name: 'Zostel Pune',
    category: 'hotels',
    neighbourhood: 'Viman Nagar',
    description: 'Vibrant, budget-friendly backpacker hostel located near the airport, offering cozy dorm bunks, private rooms, high-speed WiFi, communal rooftop lounges, and community city walks.',
    indicativePrice: 750,
    priceRangeLabel: '₹700 - ₹2,200 / night',
    isBudgetFriendly: true,
    rating: 4.4,
    ratingCount: 980,
    ratingStatus: 'Demonstration Sample',
    cleanliness: {
      level: 'Moderate',
      description: 'Daily housekeeping in dorms and common spaces; tidy community kitchen.'
    },
    accessibility: {
      wheelchairAccess: false,
      publicTransitNearby: true,
      parkingAvailable: false,
      notes: 'Stairs to rooftop common area; auto-rickshaws and bus connections right outside.'
    },
    safety: {
      lighting: 'Well-lit',
      crowdLevel: 'Youth & Solo Travelers',
      bestTimeToVisit: 'Budget city explorer stay',
      dataStatus: 'Sample Demonstration Data',
      safetyNotes: 'Keycard access, personal secure lockers in dorms, 24/7 front desk.'
    },
    coordinates: { lat: 18.5678, lng: 73.9142 },
    tags: ['Hostel', 'Backpacker', 'Budget Stay', 'Solo Travelers', 'Viman Nagar'],
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=900&q=80',
    culturalHighlights: 'Hub for young creative nomads exploring Pune\'s IT corridors and cafe culture in Koregaon Park.',
    openingHours: '24 Hours Front Desk'
  },
  {
    id: 'khadakwasla-dam',
    name: 'Khadakwasla Dam Promenade',
    category: 'attractions',
    neighbourhood: 'Khadakwasla / NDA Road',
    description: 'Scenic reservoir on the Mutha River, offering breezy water vistas, sunset vantage points, and a buzzing open-air row of street stalls serving roasted corn (bhutta) and pakoras.',
    indicativePrice: 0,
    priceRangeLabel: 'Free public promenade',
    isBudgetFriendly: true,
    rating: 4.4,
    ratingCount: 4800,
    ratingStatus: 'Demonstration Sample',
    cleanliness: {
      level: 'Basic',
      description: 'Open water front; periodic civic clean-ups along the bund.'
    },
    accessibility: {
      wheelchairAccess: true,
      publicTransitNearby: true,
      parkingAvailable: true,
      notes: 'Flat promenade road along the dam bund; roadside parking available on Sinhagad road.'
    },
    safety: {
      lighting: 'Moderate',
      crowdLevel: 'Heavy Evening Crowds',
      bestTimeToVisit: 'Late afternoon (4:30 PM - 6:30 PM)',
      dataStatus: 'Sample Demonstration Data',
      safetyNotes: 'Water is deep and currents are unpredictable; swimming is strictly prohibited and barriers are installed.'
    },
    coordinates: { lat: 18.4285, lng: 73.7668 },
    tags: ['Lake View', 'Sunset Promenade', 'Roasted Bhutta', 'Weekend Drive', 'Free Admission'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
    culturalHighlights: 'The primary reservoir feeding drinking water to Pune; located adjacent to the prestigious National Defence Academy (NDA).',
    openingHours: 'Open during daylight hours'
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'All Categories', icon: 'Compass' },
  { id: 'heritage', label: 'Heritage & History', icon: 'Landmark' },
  { id: 'food', label: 'Food & Cafes', icon: 'Utensils' },
  { id: 'attractions', label: 'City Attractions', icon: 'Camera' },
  { id: 'parks', label: 'Parks & Trails', icon: 'Trees' },
  { id: 'hotels', label: 'Hotels & Stays', icon: 'Hotel' },
  { id: 'budget', label: 'Budget-Friendly', icon: 'BadgeIndianRupee' }
];

export const NEIGHBOURHOODS = [
  'All Neighbourhoods',
  'Shaniwar Peth',
  'Shivajinagar',
  'Fergusson College Road',
  'Deccan Gymkhana',
  'Yerwada / Kalyani Nagar',
  'Sadashiv Peth',
  'Sinhagad Ghat / Haveli',
  'Kothrud / Paud Road',
  'Viman Nagar',
  'Khadakwasla / NDA Road'
];
