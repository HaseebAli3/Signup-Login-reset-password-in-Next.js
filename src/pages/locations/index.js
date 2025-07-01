'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export default function Locations() {
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const token = Cookies.get('accessToken');
        const res = await axios.get('http://127.0.0.1:8000/api/location/list/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLocations(res.data);
        setFilteredLocations(res.data);
      } catch (err) {
        console.error('Error fetching locations:', err);
        setError('Failed to load locations. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  // 🔎 Live search filtering as user types
  useEffect(() => {
    const filtered = locations.filter((loc) =>
      loc.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLocations(filtered);
  }, [searchTerm, locations]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700 text-xl">
        Loading locations...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 p-6">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-green-800 shadow-sm">🌍 Explore Beautiful Locations</h1>

      {/* 🔎 Auto-search Input */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type to search locations by name..."
          className="w-full max-w-md px-5 py-3 text-lg text-gray-900 placeholder-gray-500 border-2 border-green-500 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Locations Grid */}
      {filteredLocations.length === 0 ? (
        <p className="text-center text-red-600 text-lg font-semibold">❌ No locations found for "<strong>{searchTerm}</strong>"</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredLocations.map((loc) => (
            <div
              key={loc.id}
              onClick={() => router.push({ pathname: '/locations/detail', query: { data: JSON.stringify(loc) } })}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl p-4 cursor-pointer transition duration-300"
            >
              {loc.images && loc.images.length > 0 && (
                <Image
                  src={`http://127.0.0.1:8000${loc.images[0]}`}
                  alt={loc.name}
                  width={400}
                  height={250}
                  className="rounded-xl object-cover mb-4"
                />
              )}

              <h2 className="text-2xl font-bold text-gray-800 mb-2">{loc.name}</h2>
              <p className="text-green-700 font-semibold mb-1">💰 Price: ${loc.price}</p>
              {loc.location_url && (
                <a
                  href={loc.location_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  📍 View on Map
                </a>
              )}
              <p className="text-gray-600 text-sm mt-2">{loc.description.substring(0, 80)}...</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
