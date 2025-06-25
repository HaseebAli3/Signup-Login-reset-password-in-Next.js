'use client';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Register() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [apiResponse, setApiResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/signup/', {
        email,
        full_name: fullName,
        password,
      });

      console.log('API Success Response:', response.data);
      setMessage('✅ Registration Successful!');
      setApiResponse(response.data);

    } catch (error) {
      console.error('API Error:', error);

      if (error.response && error.response.data) {
        setMessage('❌ Error: ' + JSON.stringify(error.response.data));
        setApiResponse(error.response.data);
      } else if (error.request) {
        setMessage('❌ No response from server.');
        setApiResponse(null);
      } else {
        setMessage('❌ Unexpected Error: ' + error.message);
        setApiResponse(null);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">Register</h2>
        <p className="text-center text-gray-600 mb-6">Create your new account</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border border-gray-300 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-2 rounded shadow-md transition duration-200"
          >
            Register
          </button>
        </form>

        {message && (
          <div
            className={`mt-4 p-3 text-center text-sm rounded ${
              message.includes('Error') || message.includes('No response') || message.includes('Unexpected')
                ? 'bg-red-100 text-red-700'
                : 'bg-green-100 text-green-700'
            }`}
          >
            {message}
          </div>
        )}

        {apiResponse && (
          <div className="mt-4 bg-gray-900 text-green-300 p-3 rounded text-xs overflow-x-auto border border-gray-700">
            <h4 className="font-semibold mb-1 text-green-400">API Response:</h4>
            <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link href="/login">
            <button className="text-blue-600 hover:underline">Already have an account? Login here</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
