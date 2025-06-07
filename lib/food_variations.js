// lib/food_Variations.js

export const foodVariations = {
  // South Indian - Your specific examples
  'idli': ['idly', 'idli', 'steamed rice cake', 'idlies'],
  'dosa': ['dosai', 'dosa', 'crepe', 'dhosa', 'dhoosai'],
  'vada': ['vadai', 'vada', 'donut', 'medu vada'],
  'uttapam': ['uttapam', 'uthappam', 'oothapam'],
  'sambar': ['sambar', 'sambhar', 'lentil curry'],
  'rasam': ['rasam', 'rasaam', 'tamarind soup'],
  
  // North Indian
  'chole bhature': ['chole bhature', 'chhole bhature', 'chole bature'],
  'kulcha': ['kulcha', 'amritsari kulcha'],
  'kachori': ['kachori', 'kachauri', 'dal kachori'],
  'poha': ['poha', 'pauwa', 'flattened rice'],
  'litti chokha': ['litti chokha', 'litti', 'chokha'],
  
  // Street Food
  'vada pav': ['vada pav', 'wada pav', 'potato burger'],
  'pani puri': ['pani puri', 'gol gappa', 'puchka', 'water balls'],
  'bhel puri': ['bhel puri', 'bhel', 'puffed rice snack'],
  'dahi puri': ['dahi puri', 'yogurt puri'],
  'kathi roll': ['kathi roll', 'roll', 'wrap'],
  
  // Rice dishes
  'biryani': ['biriyani', 'biryani', 'dum biryani', 'hyderabadi biryani'],
  'pulao': ['pulao', 'pilaf', 'pulav'],
  
  // Snacks & Others
  'samosa': ['samosa', 'sambosa', 'samosas'],
  'kebab': ['kebab', 'kabab', 'seekh kebab', 'tunday kebab'],
  'tandoori': ['tandoori', 'tandoori chicken'],
  'farsan': ['farsan', 'gujarati snacks'],
  'chaat': ['chaat', 'street snacks'],
  
  // Generic terms
  'chicken': ['chicken', 'chiken', 'poultry'],
  'mutton': ['mutton', 'goat', 'lamb'],
  'vegetarian': ['veg', 'vegetarian', 'veggie'],
  'non-vegetarian': ['non-veg', 'non vegetarian', 'meat']
};

export const cuisineVariations = {
  'north indian': ['north indian', 'punjabi', 'delhi food', 'rajasthani'],
  'south indian': ['south indian', 'tamil', 'kerala', 'karnataka', 'andhra'],
  'maharashtrian': ['maharashtrian', 'mumbai food', 'marathi'],
  'gujarati': ['gujarati', 'ahmedabad food'],
  'bengali': ['bengali', 'kolkata food', 'west bengal'],
  'hyderabadi': ['hyderabadi', 'telangana', 'andhra'],
  'bihari': ['bihari', 'patna food'],
  'mp cuisine': ['mp cuisine', 'madhya pradesh', 'indore food'],
  'mughlai': ['mughlai', 'lucknowi', 'awadhi'],
  'chaat': ['chaat', 'street food', 'snacks'],
  'indian': ['indian', 'desi']
};

export const locationVariations = {
  'delhi': ['delhi', 'new delhi', 'ncr', 'karol bagh', 'chandni chowk'],
  'mumbai': ['mumbai', 'bombay', 'andheri', 'bandra'],
  'bangalore': ['bangalore', 'bengaluru', 'koramangala', 'whitefield'],
  'hyderabad': ['hyderabad', 'secunderabad', 'charminar'],
  'chennai': ['chennai', 'madras', 't nagar'],
  'kolkata': ['kolkata', 'calcutta', 'park street'],
  'pune': ['pune', 'poona'],
  'ahmedabad': ['ahmedabad', 'amdavad', 'manek chowk'],
  'jaipur': ['jaipur', 'pink city', 'mi road'],
  'lucknow': ['lucknow', 'aminabad'],
  'indore': ['indore', 'sarafa bazaar'],
  'bhopal': ['bhopal', 'chatori gali'],
  'nagpur': ['nagpur', 'sitabuldi'],
  'patna': ['patna', 'kankarbagh'],
  'amritsar': ['amritsar', 'ranjit avenue'],
  'gurugram': ['gurugram', 'gurgaon', 'sector 29']
};

export function extractFoodKeywords(query) {
  const queryLower = query.toLowerCase();
  const keywords = {
    food: '',
    cuisine: '',
    location: ''
  };

  // Extract food items
  for (const [standardName, variations] of Object.entries(foodVariations)) {
    if (variations.some(variation => queryLower.includes(variation.toLowerCase()))) {
      keywords.food = standardName;
      break;
    }
  }

  // Extract cuisine
  for (const [standardName, variations] of Object.entries(cuisineVariations)) {
    if (variations.some(variation => queryLower.includes(variation.toLowerCase()))) {
      keywords.cuisine = standardName;
      break;
    }
  }

  // Extract location
  for (const [standardName, variations] of Object.entries(locationVariations)) {
    if (variations.some(variation => queryLower.includes(variation.toLowerCase()))) {
      keywords.location = standardName;
      break;
    }
  }

  return keywords;
}
