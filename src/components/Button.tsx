import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  loading = false,
  icon,
  className = '',
  ...props
}) => {
  const baseStyles = "w-full flex items-center justify-center gap-2 py-1.5 px-4 rounded-md transition-all duration-200 text-sm disabled:opacity-50";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-black text-white hover:bg-gray-800",
    outline: "border border-gray-200 hover:bg-gray-50"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {icon && <span className="w-4 h-4 flex items-center justify-center">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};