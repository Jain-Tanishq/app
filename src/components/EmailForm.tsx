import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Button } from './Button';

export const EmailForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'signin' | 'signup'>('signup');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: authError } = mode === 'signup'
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });

      if (authError) throw authError;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email..."
          className="w-full px-3 py-1.5 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm transition-shadow duration-200"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-3 py-1.5 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm transition-shadow duration-200"
          required
          minLength={6}
        />
      </div>

      {error && (
        <div className="p-2 bg-red-50 text-red-600 rounded text-xs animate-fade-in">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Button type="submit" loading={loading}>
          {mode === 'signup' ? 'Sign up' : 'Sign in'}
        </Button>

        <button
          type="button"
          onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')}
          className="w-full text-xs text-gray-500 hover:text-gray-700"
        >
          {mode === 'signup' ? 'Already have an account?' : 'Need an account?'}
        </button>
      </div>
    </form>
  );
};