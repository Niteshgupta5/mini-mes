import { useState, type FormEvent } from 'react';

import { useNavigate } from 'react-router-dom';

import { login } from '../api/auth.api';
import { getApiError } from '../api/client';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [error, setError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setError(null);
    setLoading(true);

    try {
      const result = await login({
        email,
        password,
      });

      localStorage.setItem('mes_token', result.accessToken);

      navigate('/');
    } catch (error) {
      setError(getApiError(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-xl bg-white p-8 shadow">
        <h1 className="text-2xl font-bold">Mini MES</h1>

        <p className="mt-1 text-sm text-slate-500">Manufacturing Execution System</p>

        {error && <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>}

        <div className="mt-6">
          <label className="text-sm font-medium">Email</label>

          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2"
            required
          />
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium">Password</label>

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2"
            required
          />
        </div>

        <button
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
