import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Button } from './Button';
import { FiArrowLeft } from 'react-icons/fi';

interface PasswordStepProps {
  email: string;
  onBack: () => void;
}

export const PasswordStep: React.FC<PasswordStepProps> = ({ email, onBack }) => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (authError) {
        if (authError.message.includes('Invalid login credentials')) {
          setError('Incorrect password. Please try again.');
        } else {
          setError(authError.message);
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setLoading(true);
    setError(null);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email);
      if (resetError) throw resetError;
      setShowForgotPassword(true);
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

      {showForgotPassword ? (
        <div className="p-4 bg-blue-50 rounded-md text-sm text-blue-600">
          Password reset instructions have been sent to your email.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm text-gray-700">
              Enter your password
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
            </div>
          )}

          <div className="space-y-2">
            <Button type="submit" loading={loading}>
              Sign in
            </Button>
            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={loading}
              className="w-full text-xs text-gray-500 hover:text-gray-700"
            >
              Forgot password?
            </button>
          </div>
        </form>
      )}
    </div>
  );
};