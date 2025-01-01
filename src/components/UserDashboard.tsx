import React from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { Button } from './Button';

interface UserDashboardProps {
  user: User;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ user }) => {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back!</h1>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Account Details</h2>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Email: {user.email}</p>
                <p>Provider: {user.app_metadata?.provider || 'Email'}</p>
                <p>Last Sign In: {new Date(user.last_sign_in_at || '').toLocaleString()}</p>
              </div>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>
              <div className="space-y-2">
                <Button variant="outline" onClick={() => {}} className="w-full justify-start">
                  Edit Profile
                </Button>
                <Button variant="outline" onClick={() => {}} className="w-full justify-start">
                  Security Settings
                </Button>
                <Button variant="outline" onClick={() => {}} className="w-full justify-start">
                  Notification Preferences
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};