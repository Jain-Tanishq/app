import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Button } from './Button';
import { FiArrowLeft } from 'react-icons/fi';

interface SignUpStepProps {
  email: string;
  onBack: () => void;
  onSignIn: () => void;
}

export const SignUpStep: React.FC<SignUpStepProps> = ({ email, onBack, onSignIn }) => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (signUpError) {
        if (signUpError.message.includes('User already registered')) {
          setError('Account already exists. Please sign in instead.');
          return;
        }
        throw signUpError;
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={onBack}
        className="flex items-center text-sm text-gray-500 hover:text-gray-700"
      >
        <FiArrowLeft className="mr-1" /> {email}
      </button>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm text-gray-700">
            Create a password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password..."
            className="w-full px-3 py-1.5 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm transition-shadow duration-200"
            required
            minLength={6}
            autoFocus
          />
        </div>
        {error && (
          <div className="p-2 bg-red-50 text-red-600 rounded text-xs animate-fade-in">
            {error}
            {error.includes('already exists') && (
              <button
                onClick={onSignIn}
                className="ml-2 text-blue-600 hover:text-blue-700"
              >
                Sign in
              </button>
            )}
          </div>
        )}
        <Button type="submit" loading={loading}>
          Create account
        </Button>
      </form>
    </div>
  );
};