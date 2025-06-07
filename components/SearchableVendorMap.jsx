// components/SearchableVendorMap.jsx
import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const allVendors = [
  { name: "Sharma's Chole Bhature", location: "Karol Bagh, Delhi", cuisine: "North Indian", tags: ["Vegetarian", "Chole Bhature"], coordinates: [28.6508, 77.1901], rating: 4.8 },
  { name: "Mumbai Vada Pav King", location: "Andheri West, Mumbai", cuisine: "Maharashtrian", tags: ["Vada Pav", "Snacks"], coordinates: [19.1352, 72.8264], rating: 4.6 },
  { name: "Hyderabadi Biryani Cart", location: "Charminar, Hyderabad", cuisine: "Hyderabadi", tags: ["Biryani", "Mutton"], coordinates: [17.3616, 78.4747], rating: 4.9 },
  { name: "Bangalore Dosa Corner", location: "Koramangala, Bangalore", cuisine: "South Indian", tags: ["Dosa", "Vegetarian"], coordinates: [12.9352, 77.6245], rating: 4.7 },
  { name: "Delhi Chaat Wala", location: "Chandni Chowk, Delhi", cuisine: "Chaat", tags: ["Dahi Puri", "Snacks"], coordinates: [28.6506, 77.2334], rating: 4.5 },
  { name: "Kolkata Kathi Roll", location: "Park Street, Kolkata", cuisine: "Bengali", tags: ["Rolls", "Kathi"], coordinates: [22.5448, 88.3426], rating: 4.4 },
  { name: "Tandoori Nights", location: "Sector 29, Gurugram", cuisine: "Punjabi", tags: ["Tandoori", "Chicken"], coordinates: [28.4595, 77.0266], rating: 4.6 },
  { name: "Amritsari Kulcha Hub", location: "Ranjit Avenue, Amritsar", cuisine: "North Indian", tags: ["Kulcha", "Punjabi"], coordinates: [31.6339, 74.8723], rating: 4.7 },
  { name: "Indori Poha Point", location: "Sarafa Bazaar, Indore", cuisine: "MP Cuisine", tags: ["Poha", "Breakfast"], coordinates: [22.7196, 75.8577], rating: 4.5 },
  { name: "Bhopali Kebabs", location: "Chatori Gali, Bhopal", cuisine: "Mughlai", tags: ["Kebabs", "Non-Vegetarian"], coordinates: [23.2599, 77.4126], rating: 4.6 },
  { name: "Amdavadi Farsan", location: "Manek Chowk, Ahmedabad", cuisine: "Gujarati", tags: ["Farsan", "Snacks"], coordinates: [23.0225, 72.5714], rating: 4.3 },
  { name: "Jaipur Kachori House", location: "MI Road, Jaipur", cuisine: "Rajasthani", tags: ["Kachori", "Breakfast"], coordinates: [26.9124, 75.7873], rating: 4.4 },
  { name: "Chennai Idli Dosa", location: "T Nagar, Chennai", cuisine: "South Indian", tags: ["Idli", "Dosa"], coordinates: [13.0405, 80.2337], rating: 4.6 },
  { name: "Lucknowi Tunday Kababi", location: "Aminabad, Lucknow", cuisine: "Awadhi", tags: ["Kebabs", "Tunday"], coordinates: [26.8467, 80.9462], rating: 4.9 },
  { name: "Nagpur Tarri Poha", location: "Sitabuldi, Nagpur", cuisine: "Maharashtrian", tags: ["Poha", "Spicy"], coordinates: [21.1458, 79.0882], rating: 4.2 },
  { name: "Patna Litti Chokha", location: "Kankarbagh, Patna", cuisine: "Bihari", tags: ["Litti", "Chokha"], coordinates: [25.5941, 85.1376], rating: 4.5 }
];

const SearchableVendorMap = () => {
  const [map, setMap] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [vendors, setVendors] = useState(allVendors);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!map) {
      const instance = L.map('vendor-map').setView([20.5937, 78.9629], 5);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(instance);
      setMap(instance);
    }
  }, [map]);

  useEffect(() => {
    if (!map) return;
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) map.removeLayer(layer);
    });
    vendors.forEach((vendor) => {
      const marker = L.marker(vendor.coordinates).addTo(map);
      marker.bindPopup(`<strong>${vendor.name}</strong><br>${vendor.location}<br>Rating: ${vendor.rating}`);
    });
  }, [vendors, map]);

  useEffect(() => {
    if (!searchInput.trim()) {
      setVendors(allVendors);
    }
  }, [searchInput]);

  const handleSearch = async () => {
    if (!searchInput.trim()) {
      setVendors(allVendors);
      return;
    }

    setIsLoading(true);
    try {
      console.log("🔍 Searching for:", searchInput);
      
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchInput }),
      });
      
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      
      const data = await res.json();
      console.log("📊 Search response:", data);
      
      // Handle both old and new response formats
      const keywords = data.keywords || data.choices?.[0]?.message?.content;
      
      let parsed = keywords;
      if (typeof keywords === 'string') {
        // Handle old OpenAI string response format
        const jsonMatch = keywords.match(/{[\s\S]*}/);
        if (!jsonMatch) throw new Error('Invalid response format');
        parsed = JSON.parse(jsonMatch[0]);
      }

      console.log("🎯 Parsed keywords:", parsed);

      // Enhanced filtering logic
      const filtered = allVendors.filter((vendor) => {
        const foodMatch = !parsed.food || 
          vendor.tags.some(tag => tag.toLowerCase().includes(parsed.food.toLowerCase())) ||
          vendor.name.toLowerCase().includes(parsed.food.toLowerCase());
          
        const locationMatch = !parsed.location || 
          vendor.location.toLowerCase().includes(parsed.location.toLowerCase());
          
        const cuisineMatch = !parsed.cuisine || 
          vendor.cuisine.toLowerCase().includes(parsed.cuisine.toLowerCase()) ||
          (parsed.cuisine.includes('indian') && vendor.cuisine.toLowerCase().includes('indian'));

        return foodMatch && locationMatch && cuisineMatch;
      });

      console.log(`✅ Found ${filtered.length} matching vendors`);
      setVendors(filtered);
      
      // Show message if no results
      if (filtered.length === 0) {
        console.log("⚠️ No vendors found for search criteria");
      }
      
    } catch (err) {
      console.error('❌ Search failed:', err);
      alert('Search failed. Please try again.');
      setVendors([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '1rem' }}>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Try: 'idly in bangalore', 'dosa near chennai', 'biryani hyderabad'..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{ 
            flex: 1, 
            padding: '0.75rem', 
            border: '1px solid #ccc', 
            borderRadius: 6,
            fontSize: '14px'
          }}
        />
        <button
          onClick={handleSearch}
          disabled={isLoading}
          style={{ 
            padding: '0.75rem 1.2rem', 
            backgroundColor: isLoading ? '#ccc' : '#ff7a00', 
            color: 'white', 
            border: 'none', 
            borderRadius: 6,
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
      
      {vendors.length === 0 && !isLoading && searchInput.trim() && (
        <div style={{ 
          padding: '1rem', 
          backgroundColor: '#fff3cd', 
          border: '1px solid #ffeaa7', 
          borderRadius: 6, 
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          No vendors found matching your search. Try different keywords!
        </div>
      )}
      
      <div style={{ 
        marginBottom: '0.5rem', 
        color: '#666', 
        fontSize: '14px' 
      }}>
        Showing {vendors.length} vendor{vendors.length !== 1 ? 's' : ''}
      </div>
      
      <div id="vendor-map" style={{ height: 500, borderRadius: 6 }}></div>
    </div>
  );
};

export default SearchableVendorMap;
