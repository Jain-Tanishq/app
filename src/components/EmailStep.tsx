import React, { useState } from 'react';
import { Button } from './Button';

interface EmailStepProps {
  email: string;
  setEmail: (email: string) => void;
  onSubmit: (email: string) => Promise<void>;
}

export const EmailStep: React.FC<EmailStepProps> = ({ email, setEmail, onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await onSubmit(email);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email..."
        className="w-full px-3 py-1.5 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm transition-shadow duration-200"
        required
      />
      {error && (
        <div className="p-2 bg-red-50 text-red-600 rounded text-xs animate-fade-in">
          {error}
        </div>
      )}
      <Button type="submit" loading={loading}>
        Continue
      </Button>
    </form>
  );
};