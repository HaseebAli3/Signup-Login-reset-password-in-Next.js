'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export default function Locations() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const token = Cookies.get('accessToken');
        const res = await axios.get('http://127.0.0.1:8000/api/location/list/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLocations(res.data);
      } catch (err) {
        console.error('Error fetching locations:', err);
        setError('Failed to load locations. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  if (loading) return <p className="text-center mt-10 text-xl">Loading locations...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-green-700">🌍 Available Locations</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {locations.map((loc) => (
          <div
            key={loc.id}
            onClick={() =>
              router.push({ pathname: '/locations/detail', query: { data: JSON.stringify(loc) } })
            }
            className="bg-white rounded-2xl shadow-md hover:shadow-xl p-4 cursor-pointer transition duration-300"
          >
            {loc.images && loc.images.length > 0 && (
              <Image
                src={`http://127.0.0.1:8000${loc.images[0]}`}
                alt={loc.name}
                width={400}
                height={250}
                className="rounded mb-3 object-cover"
              />
            )}

            <h2 className="text-2xl font-bold text-gray-800 mb-2">{loc.name}</h2>
            <p className="text-green-700 font-semibold mb-1">Price: ${loc.price}</p>

            {loc.location_url && (
              <a
                href={loc.location_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                View on Map
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
