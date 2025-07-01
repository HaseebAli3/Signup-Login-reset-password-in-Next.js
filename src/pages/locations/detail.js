'use client';

import { useRouter } from 'next/router';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function LocationDetail() {
  const router = useRouter();
  const { data } = router.query;
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (data) {
      setLocation(JSON.parse(data));
    }
  }, [data]);

  if (!location) return <p className="text-center mt-10 text-xl">Loading location details...</p>;

  return (
    <div className="min-h-screen bg-yellow-50 p-8">
      <h1 className="text-4xl font-extrabold text-green-800 text-center mb-6">{location.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Images */}
        <div>
          {location.images.map((img, idx) => (
            <Image
              key={idx}
              src={`http://127.0.0.1:8000${img}`}
              alt={`Image ${idx + 1}`}
              width={600}
              height={400}
              className="rounded mb-4 object-cover"
            />
          ))}
        </div>

        {/* Details */}
        <div>
          <p className="mb-4 text-lg text-gray-800 leading-relaxed">{location.description}</p>
          <p className="mb-2 text-xl text-green-700 font-bold">Price: ${location.price}</p>

          {location.location_url && (
            <a
              href={location.location_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline text-lg"
            >
              📍 View Location on Google Maps
            </a>
          )}

          {/* Booking Button */}
          <div className="mt-6">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded text-lg">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
