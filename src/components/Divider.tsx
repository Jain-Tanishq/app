import React from 'react';

export const Divider: React.FC = () => (
  <div className="relative my-6">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full border-t border-gray-200"></div>
    </div>
    <div className="relative flex justify-center text-xs">
      <span className="px-2 bg-white text-gray-400">or</span>
    </div>
  </div>
);