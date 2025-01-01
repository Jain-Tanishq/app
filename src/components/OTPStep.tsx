import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Button } from './Button';
import { FiArrowLeft } from 'react-icons/fi';

interface OTPStepProps {
  email: string;
  onBack: () => void;
}

export const OTPStep: React.FC<OTPStepProps> = ({ email, onBack }) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const sendOTP = async () => {
    setLoading(true);
    setError(null);
    try {
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: true }
      });
      if (otpError) throw otpError;
      setSent(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'signup'
      });
      if (verifyError) throw verifyError;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    sendOTP();
  }, []);

  return (
    <div className="space-y-4">
      <button
        onClick={onBack}
        className="flex items-center text-sm text-gray-500 hover:text-gray-700"
      >
        <FiArrowLeft className="mr-1" /> {email}
      </button>
      
      {sent && (
        <>
          <p className="text-sm text-gray-600">
            We've sent a magic link to your email. Click the link to sign in, or enter the verification code below.
          </p>
          <form onSubmit={verifyOTP} className="space-y-4">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter verification code..."
              className="w-full px-3 py-1.5 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm transition-shadow duration-200"
              required
              autoFocus
            />
            {error && (
              <div className="p-2 bg-red-50 text-red-600 rounded text-xs animate-fade-in">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Button type="submit" loading={loading}>
                Continue
              </Button>
              <button
                type="button"
                onClick={sendOTP}
                disabled={loading}
                className="w-full text-xs text-gray-500 hover:text-gray-700"
              >
                Resend verification code
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};