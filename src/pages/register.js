'use client';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Register() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/signup/', {
        email,
        full_name: fullName,
        password,
      });

      if (response && response.data) {
        setMessage('✅ Registration successful! You can now login.');
      } else {
        setMessage('❌ Registration failed. Empty response from server.');
      }

    } catch (error) {
      console.error('Registration Error:', error);

      if (error.response) {
        // If API returned a response with error status code
        const errorData = error.response.data;

        if (errorData.detail) {
          setMessage(`❌ ${errorData.detail}`);
        } else if (typeof errorData === 'string') {
          setMessage(`❌ ${errorData}`);
        } else if (typeof errorData === 'object') {
          // If backend sends field-wise errors like {email: ["Already exists"], password: ["Too short"]}
          const fieldErrors = Object.entries(errorData)
            .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
            .join(' | ');
          setMessage(`❌ ${fieldErrors}`);
        } else {
          setMessage('❌ Registration failed due to an unknown API error.');
        }

      } else if (error.request) {
        // API server not responding
        setMessage('❌ Server is not responding. Please try again later.');
      } else {
        // Unknown frontend error
        setMessage('❌ Something went wrong. Please check your internet connection and try again.');
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 p-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-green-700 mb-2">Create Your Nomadic Travel Account 🌿</h2>
        <p className="text-center text-gray-600 mb-6">Start your next adventure today!</p>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border border-gray-300 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className={`w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-2 rounded shadow-md transition duration-200 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        {/* User Message */}
        {message && (
          <div
            className={`mt-4 p-3 text-center text-sm rounded ${
              message.startsWith('✅')
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {message}
          </div>
        )}

        {/* Login Link */}
        <div className="mt-6 text-center">
          <Link href="/login">
            <button className="text-green-700 hover:underline">
              Already have an account? Login here
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
