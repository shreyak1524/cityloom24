/**
 * CityLoom Cultural & Historical Heritage Data (Pune)
 */

export const PUNE_CULTURE_STORIES = [
  {
    id: 'story-maratha-peshwa',
    title: 'The Seat of the Peshwas & Maratha Architecture',
    subtitle: 'From Chhatrapati Shivaji Maharaj to the Peshwa capital',
    category: 'maratha_history',
    categoryLabel: 'Maratha History',
    summary: 'Pune transformed into the military and administrative heart of the Maratha Empire during the 18th century under the Peshwas, creating distinctive wooden wada architecture, stone fortification gates, and historic civic aqueducts.',
    keyFacts: [
      'Peshwa Baji Rao I established Pune as the Peshwa capital in 1730.',
      'Distinctive "Wada" architecture features central chowks (courtyards), dark timber frames, and decorative cusped arches.',
      'The Katraj Aqueduct built in 1750 supplied clean spring water to Shaniwar Wada using gravity alone.'
    ],
    relatedPlaceId: 'shaniwar-wada',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=900&q=80',
    coordinates: { lat: 18.5196, lng: 73.8553 },
    period: '17th - 18th Century CE'
  },
  {
    id: 'story-rock-cut-heritage',
    title: 'Subterranean Basalt: The 8th Century Monoliths',
    subtitle: 'Rashtrakuta dynasty basalt craftsmanship',
    category: 'ancient_monuments',
    categoryLabel: 'Ancient Monuments',
    summary: 'Centuries before the Peshwas, craftsmen carved intricate monolithic sanctuaries out of Deccan volcanic basalt rock. The Pataleshwar Cave complex remains a peaceful subterranean sanctuary amidst modern university avenues.',
    keyFacts: [
      'Carved directly into a single outcrop of Deccan Trap basalt rock in the 8th century CE.',
      'Features a massive circular Nandi mandapa supported by 12 square pillars.',
      'The sanctum houses a Swayambhu Shiva lingam, cool even during peak summer afternoons.'
    ],
    relatedPlaceId: 'pataleshwar-cave',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80',
    coordinates: { lat: 18.5273, lng: 73.8507 },
    period: '8th Century CE'
  },
  {
    id: 'story-gandhian-freedom',
    title: 'Sanctuary of the Freedom Struggle',
    subtitle: 'The Quit India movement at Aga Khan Palace',
    category: 'freedom_movement',
    categoryLabel: 'Freedom Movement',
    summary: 'Built during the 1892 famine to provide employment, the Aga Khan Palace later became the historic internment site of Mahatma Gandhi, Kasturba Gandhi, and Mahadev Desai during the Quit India agitation.',
    keyFacts: [
      'Designed by architect Charles Mant blending Italian arches with Indian stone carving.',
      'Kasturba Gandhi and Mahadev Desai breathed their last here; their marble samadhis rest in the tranquil rear lawns.',
      'The palace houses personal artifacts including Gandhi\'s writing desk, charkha, and sandals.'
    ],
    relatedPlaceId: 'aga-khan-palace',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=900&q=80',
    coordinates: { lat: 18.5524, lng: 73.9015 },
    period: '1892 - 1947 CE'
  },
  {
    id: 'story-pune-culinary',
    title: 'Culinary Identity: Mastani, Misal & Irani Cafes',
    subtitle: 'Iconic street flavours and heritage dining traditions',
    category: 'culinary_heritage',
    categoryLabel: 'Culinary Heritage',
    summary: 'Pune\'s food culture marries fiery Western Maharashtra spices with Irani cafe traditions and royal dessert innovations like the Mastani milkshake, savoured across vibrant college roads and heritage peths.',
    keyFacts: [
      'The Mastani drink was invented in Pune, named after the legendary warrior princess Mastani.',
      'Puneri Misal features spicy sprout tarri (kat), crispy poha, farsan, and sliced onions, often enjoyed without pav by purists.',
      'Chitale Bandhu Bakharwadi and Goodluck Cafe\'s Bun Maska Chai have defined local morning rituals for decades.'
    ],
    relatedPlaceId: 'sujata-mastani',
    image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=900&q=80',
    coordinates: { lat: 18.5132, lng: 73.8524 },
    period: '19th Century - Present'
  },
  {
    id: 'story-ganeshotsav',
    title: 'Sarvajanik Ganeshotsav & The Manache Ganpati',
    subtitle: 'Lokmanya Tilak\'s community festival revolution',
    category: 'festivals_traditions',
    categoryLabel: 'Festivals & Traditions',
    summary: 'In 1893, nationalist leader Lokmanya Bal Gangadhar Tilak transformed the private household worship of Lord Ganesha into a public community festival (Sarvajanik Ganeshotsav) in Pune to unify citizens against colonial rule.',
    keyFacts: [
      'Pune honours five revered "Manache Ganpati" (revered in strict traditional order during immersion processions).',
      'The historic dhol-tasha pathaks (drum troupes) involve thousands of youth practicing disciplined traditional rhythms.',
      'Sarasbaug Ganpati ("Talyatla Ganpati") was consecrated in 1784 by Sawai Madhavrao Peshwa.'
    ],
    relatedPlaceId: 'sarasbaug-temple',
    image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=900&q=80',
    coordinates: { lat: 18.5015, lng: 73.8538 },
    period: '1784 - Present'
  },
  {
    id: 'story-sinhagad-valor',
    title: 'The Battle of Sinhagad & Fort Architecture',
    subtitle: 'The 1670 night assault by Tanaji Malusare',
    category: 'maratha_history',
    categoryLabel: 'Maratha History',
    summary: 'Sinhagad ("Lion\'s Fort") stands as an impregnable natural bastion in the Sahyadris. In 1670, Maratha subedar Tanaji Malusare scaled its near-vertical Donagiri cliff by night to recapture the fort from Mughal garrison commander Udaybhan Rathod.',
    keyFacts: [
      'Chhatrapati Shivaji Maharaj lamented upon Tanaji\'s heroic death: "Gad aala, pan sinha gela" (The fort is won, but the lion is lost).',
      'The fort preserves Tanaji\'s samadhi, Rajaram Maharaj\'s memorial, and historic Devtaki water cisterns with cold mountain springs.',
      'Visitors still enjoy village-cooked hot pithla bhakri, thecha, and fresh curd in earthen matkas atop the plateau.'
    ],
    relatedPlaceId: 'sinhagad-fort',
    image: 'https://images.unsplash.com/photo-1626014303757-657d425b045d?auto=format&fit=crop&w=900&q=80',
    coordinates: { lat: 18.3663, lng: 73.7558 },
    period: '14th - 17th Century CE'
  }
];

export const CULTURE_CATEGORIES = [
  { id: 'all', label: 'All Heritage Stories' },
  { id: 'maratha_history', label: 'Maratha History' },
  { id: 'ancient_monuments', label: 'Ancient Monuments' },
  { id: 'freedom_movement', label: 'Freedom Movement' },
  { id: 'culinary_heritage', label: 'Culinary Heritage' },
  { id: 'festivals_traditions', label: 'Festivals & Traditions' }
];
