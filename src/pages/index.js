import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 text-center p-6">
      
      {/* App Name */}
      <h1 className="text-5xl font-extrabold text-green-700 mb-4">
        Welcome to Nomadic Travel 🌿
      </h1>

      {/* Tagline */}
      <p className="mb-6 text-lg text-gray-700 max-w-xl">
        Discover new places, plan your adventures, and book your dream tours. Start your journey with Nomadic Travel today!
      </p>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <Link href="/login">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded text-lg shadow-md transition">
            Login
          </button>
        </Link>

        <Link href="/register">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded text-lg shadow-md transition">
            Create Account
          </button>
        </Link>
      </div>

     

    </div>
  );
}
