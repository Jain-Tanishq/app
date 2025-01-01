import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';

interface AuthButtonProps {
  icon: 'google' | 'apple';
  onClick: () => void;
  children: React.ReactNode;
}

export const AuthButton: React.FC<AuthButtonProps> = ({ icon, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors mb-2"
    >
      {icon === 'google' ? (
        <FcGoogle className="w-5 h-5" />
      ) : (
        <FaApple className="w-5 h-5" />
      )}
      {children}
    </button>
  );
};