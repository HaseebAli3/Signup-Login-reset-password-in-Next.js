import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to the Auth App 🚀</h1>

      <p className="mb-6 text-gray-700">This app uses Django backend with Next.js frontend + Tailwind CSS for styling.</p>

      <div className="space-x-4">
        <Link href="/register">
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">Register</button>
        </Link>

        <Link href="/login">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Login</button>
        </Link>

        <Link href="/reset-password">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">Reset Password</button>
        </Link>
      </div>
    </div>
  );
}
