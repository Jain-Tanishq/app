import React from 'react';

export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' }> = ({ size = 'sm' }) => (
  <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'}`} />
);