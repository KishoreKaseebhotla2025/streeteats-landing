// utils/foodVariations.js
export const foodVariations = {
  // South Indian
  'idli': ['idly', 'idli', 'steamed rice cake', 'idlies'],
  'dosa': ['dosai', 'dosa', 'crepe', 'dhosa', 'dhoosai'],
  'vada': ['vadai', 'vada', 'donut', 'medu vada'],
  'uttapam': ['uttapam', 'uthappam', 'oothapam'],
  'sambar': ['sambar', 'sambhar', 'lentil curry'],
  'rasam': ['rasam', 'rasaam', 'tamarind soup'],
  'curd rice': ['curd rice', 'thayir sadam', 'yogurt rice'],
  'pongal': ['pongal', 'khichdi', 'ven pongal'],
  
  // North Indian
  'roti': ['roti', 'chapati', 'phulka', 'bread'],
  'naan': ['naan', 'nan', 'garlic naan'],
  'dal': ['dal', 'daal', 'lentils', 'dhal'],
  'rajma': ['rajma', 'kidney beans', 'red beans'],
  'chole': ['chole', 'chana', 'chickpeas', 'garbanzo'],
  'paneer': ['paneer', 'cottage cheese', 'indian cheese'],
  
  // Rice dishes
  'biryani': ['biriyani', 'biryani', 'dum biryani', 'hyderabadi biryani'],
  'pulao': ['pulao', 'pilaf', 'pulav', 'rice pilaf'],
  'fried rice': ['fried rice', 'friedrice', 'chinese rice'],
  
  // Chinese
  'noodles': ['noodles', 'noodle', 'chow mein', 'lo mein', 'hakka noodles'],
  'manchurian': ['manchurian', 'gobi manchurian', 'chicken manchurian'],
  'momos': ['momos', 'dumplings', 'steamed dumplings'],
  
  // Street food
  'samosa': ['samosa', 'sambosa', 'samosas'],
  'pani puri': ['pani puri', 'gol gappa', 'puchka', 'water balls'],
  'bhel puri': ['bhel puri', 'bhel', 'puffed rice snack'],
  'vada pav': ['vada pav', 'wada pav', 'potato burger'],
  'dahi puri': ['dahi puri', 'yogurt puri'],
  
  // Western
  'pizza': ['pizza', 'pizzas', 'margherita', 'cheese pizza'],
  'burger': ['burger', 'hamburger', 'cheeseburger'],
  'pasta': ['pasta', 'spaghetti', 'penne', 'macaroni'],
  'sandwich': ['sandwich', 'sandwiches', 'club sandwich'],
  
  // Proteins
  'chicken': ['chicken', 'chiken', 'poultry'],
  'mutton': ['mutton', 'goat', 'lamb', 'goat meat'],
  'fish': ['fish', 'seafood', 'machli'],
  'egg': ['egg', 'eggs', 'omelette', 'scrambled'],
  
  // Sweets
  'gulab jamun': ['gulab jamun', 'gulabjamun', 'sweet balls'],
  'rasmalai': ['rasmalai', 'ras malai', 'cheese dessert'],
  'kheer': ['kheer', 'rice pudding', 'payasam'],
  'laddu': ['laddu', 'laddoo', 'sweet balls'],
  
  // Beverages
  'chai': ['chai', 'tea', 'masala chai', 'indian tea'],
  'coffee': ['coffee', 'filter coffee', 'south indian coffee'],
  'lassi': ['lassi', 'yogurt drink', 'mango lassi'],
  'juice': ['juice', 'fresh juice', 'fruit juice']
};

export const cuisineVariations = {
  'indian': ['indian', 'desi', 'hindi', 'tamil', 'bengali', 'punjabi', 'gujarati'],
  'south indian': ['south indian', 'tamil', 'kerala', 'karnataka', 'andhra'],
  'north indian': ['north indian', 'punjabi', 'delhi', 'rajasthani'],
  'chinese': ['chinese', 'indo chinese', 'hakka', 'cantonese'],
  'italian': ['italian', 'continental', 'european'],
  'mexican': ['mexican', 'tex mex'],
  'thai': ['thai', 'southeast asian'],
  'continental': ['continental', 'western', 'english']
};

export const locationVariations = {
  'bangalore': ['bangalore', 'bengaluru', 'blr'],
  'chennai': ['chennai', 'madras'],
  'mumbai': ['mumbai', 'bombay'],
  'delhi': ['delhi', 'new delhi', 'ncr'],
  'hyderabad': ['hyderabad', 'hyd', 'secunderabad'],
  'pune': ['pune', 'poona'],
  'kolkata': ['kolkata', 'calcutta']
};

// Enhanced extraction function
export function extractFoodKeywords(query) {
  const queryLower = query.toLowerCase();
  const keywords = {
    food: '',
    cuisine: '',
    location: ''
  };

  // Extract food
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
