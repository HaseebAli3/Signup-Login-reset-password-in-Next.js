'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Cookies from 'js-cookie';

export default function LocationDetail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locationData = searchParams.get('data') ? JSON.parse(searchParams.get('data')) : null;
  const [bookingDate, setBookingDate] = useState('');
  const [message, setMessage] = useState('');

  const handleBooking = async () => {
    try {
      const token = Cookies.get('accessToken');

      if (!bookingDate) {
        setMessage('❌ Please select a booking date!');
        return;
      }

      await axios.post(
        'http://127.0.0.1:8000/api/booking/',
        {
          location: locationData.id,
          booking_date: bookingDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage('✅ Booking Successful!');
    } catch (error) {
      console.error('Booking error:', error);
      setMessage('❌ Failed to book. Please try again.');
    }
  };

  if (!locationData) {
    return <p className="text-center mt-10 text-xl text-red-600">No location data found!</p>;
  }

  return (
    <div className="min-h-screen bg-yellow-50 p-8">
      <h1 className="text-4xl font-extrabold text-center mb-4 text-green-800">{locationData.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Images */}
        <div>
          {locationData.images && locationData.images.map((img, idx) => (
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

        {/* Details and Booking */}
        <div>
          <p className="mb-4 text-gray-700">{locationData.description}</p>
          <p className="mb-2 text-green-700 font-bold">Price: ${locationData.price}</p>

          {locationData.location_url && (
            <a
              href={locationData.location_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline mb-4 block"
            >
              📍 View Location on Map
            </a>
          )}

          {/* Booking Form */}
          <div className="mt-4">
            <label className="block mb-2 font-semibold text-gray-800">Select Booking Date:</label>
            <input
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              className="border-2 border-green-500 rounded px-4 py-2 w-full text-gray-800 mb-4"
            />

            <button
              onClick={handleBooking}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow transition duration-300"
            >
              ✅ Book Now
            </button>

            {message && (
              <p className={`mt-3 text-lg ${message.startsWith('✅') ? 'text-green-700' : 'text-red-600'}`}>
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
