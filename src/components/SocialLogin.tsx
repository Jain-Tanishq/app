import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import { Button } from './Button';
import { handleGoogleSignIn } from '../lib/auth';

export const SocialLogin: React.FC = () => {
  const [loading, setLoading] = useState<'google' | 'apple' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    try {
      setLoading('google');
      setError(null);
      await handleGoogleSignIn();
    } catch (error: any) {
      setError('Failed to sign in with Google. Please try again.');
      console.error('Google login error:', error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-2">
      {error && (
        <div className="p-2 bg-red-50 text-red-600 rounded text-xs animate-fade-in">
          {error}
        </div>
      )}
      <Button
        variant="outline"
        icon={<FcGoogle />}
        onClick={handleGoogleLogin}
        loading={loading === 'google'}
      >
        Continue with Google
      </Button>
      <Button
        variant="outline"
        icon={<FaApple />}
        disabled={true}
        onClick={() => {}}
      >
        Continue with Apple (Coming Soon)
      </Button>
    </div>
  );
};