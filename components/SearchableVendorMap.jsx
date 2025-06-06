// components/SearchableVendorMap.jsx
import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const OPENAI_API_KEY = 'sk-REDACTED'; // Use NEXT_PUBLIC_ env var in production

const allVendors = [
  // 16 vendors total: 6 original + 10 new
  {
    name: "Sharma's Chole Bhature", location: "Karol Bagh, Delhi", cuisine: "North Indian", tags: ["Vegetarian", "Chole Bhature"], coordinates: [28.6508, 77.1901], rating: 4.8 },
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

  const handleSearch = async () => {
    if (!searchInput.trim()) {
      setVendors(allVendors);
      return;
    }
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: `Extract keywords like food, city, or cuisine from this: "${searchInput}" and return as JSON.`
            }
          ]
        })
      });
      const data = await res.json();
      const text = data.choices[0].message.content;
      const parsed = JSON.parse(text);

      const filtered = allVendors.filter((v) => {
        return (
          (!parsed.food || v.tags.join(' ').toLowerCase().includes(parsed.food.toLowerCase())) &&
          (!parsed.location || v.location.toLowerCase().includes(parsed.location.toLowerCase())) &&
          (!parsed.cuisine || v.cuisine.toLowerCase().includes(parsed.cuisine.toLowerCase()))
        );
      });
      setVendors(filtered);
    } catch (err) {
      console.error('Search failed:', err);
      setVendors([]);
    }
  };

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '1rem' }}>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search vendors by food, location, or cuisine..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          style={{ flex: 1, padding: '0.75rem', border: '1px solid #ccc', borderRadius: 6 }}
        />
        <button
          onClick={handleSearch}
          style={{ padding: '0.75rem 1.2rem', backgroundColor: '#ff7a00', color: 'white', border: 'none', borderRadius: 6 }}
        >
          Search
        </button>
      </div>
      <div id="vendor-map" style={{ height: 500 }}></div>
    </div>
  );
};

export default SearchableVendorMap;
