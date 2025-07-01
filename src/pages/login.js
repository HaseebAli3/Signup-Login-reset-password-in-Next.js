import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/login/', {
        email,
        password,
      });

      const { access, refresh } = response.data;

      // Save tokens in cookies
      Cookies.set('accessToken', access, { expires: 7 });
      Cookies.set('refreshToken', refresh, { expires: 7 });

      setMessage('✅ Login successful! Redirecting...');
      router.push('/locations');  // Redirect to locations page

    } catch (error) {
      console.error(error);
      setMessage('❌ Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="space-y-4 border p-6 rounded w-80">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {message && <p className="text-center mt-2">{message}</p>}
      </form>
    </div>
  );
}
