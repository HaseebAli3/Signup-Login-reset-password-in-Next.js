'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';

export default function ResetPasswordConfirm() {
  const router = useRouter();
  const { uidb64, token } = router.query;

  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  const [tokenValid, setTokenValid] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Check token validity on first load
  useEffect(() => {
    const checkTokenValidity = async () => {
      if (uidb64 && token) {
        try {
          await axios.get(`http://127.0.0.1:8000/api/auth/password-reset-confirm/${uidb64}/${token}/`);
          setTokenValid(true);
        } catch (error) {
          console.error('Token Validation Error:', error);
          if (error.response && error.response.data) {
            setMessage('❌ Token Error: ' + JSON.stringify(error.response.data));
          } else if (error.request) {
            setMessage('❌ No response from server.');
          } else {
            setMessage('❌ Unexpected Error: ' + error.message);
          }
          setTokenValid(false);
        } finally {
          setLoading(false);
        }
      }
    };

    checkTokenValidity();
  }, [uidb64, token]);

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/auth/password-reset-confirm/${uidb64}/${token}/`,
        { password: newPassword }
      );

      setMessage('✅ Password reset successful!');
      setApiResponse(response.data);
    } catch (error) {
      console.error('Password Reset Error:', error);
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
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">Set New Password</h2>

        {loading ? (
          <p className="text-center text-gray-600">Checking reset link...</p>
        ) : tokenValid ? (
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full px-4 py-2 border border-gray-300 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-2 rounded shadow-md transition duration-200"
            >
              Reset Password
            </button>
          </form>
        ) : (
          <div className="text-center text-red-600">{message}</div>
        )}

        {message && tokenValid && (
          <div
            className={`mt-4 p-3 text-center text-sm rounded ${
              message.includes('Error') || message.includes('Unexpected') || message.includes('No response')
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
            <button className="text-blue-600 hover:underline">Back to Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
