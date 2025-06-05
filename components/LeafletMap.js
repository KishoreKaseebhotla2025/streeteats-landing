// components/LeafletMap.js

import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LeafletMap = () => {
  useEffect(() => {
    const mockVendors = [
      {
        name: "Sharma's Chole Bhature",
        location: "Karol Bagh, Delhi",
        coordinates: [28.6508, 77.1901],
        rating: 4.8,
      },
      {
        name: "Mumbai Vada Pav King",
        location: "Andheri West, Mumbai",
        coordinates: [19.1352, 72.8264],
        rating: 4.6,
      },
      {
        name: "Hyderabadi Biryani Cart",
        location: "Charminar, Hyderabad",
        coordinates: [17.3616, 78.4747],
        rating: 4.9,
      },
      {
        name: "Bangalore Dosa Corner",
        location: "Koramangala, Bangalore",
        coordinates: [12.9352, 77.6245],
        rating: 4.7,
      },
      {
        name: "Delhi Chaat Wala",
        location: "Chandni Chowk, Delhi",
        coordinates: [28.6506, 77.2334],
        rating: 4.5,
      },
      {
        name: "Kolkata Kathi Roll",
        location: "Park Street, Kolkata",
        coordinates: [22.5448, 88.3426],
        rating: 4.4,
      },
    ];

    const map = L.map('vendor-map').setView([20.5937, 78.9629], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    mockVendors.forEach((vendor) => {
      const marker = L.marker(vendor.coordinates).addTo(map);
      marker.bindPopup(
        `<strong>${vendor.name}</strong><br>${vendor.location}<br>Rating: ${vendor.rating}`
      );
    });
  }, []);

  return <div id="vendor-map" style={{ height: '100%', width: '100%' }}></div>;
};

export default LeafletMap;
