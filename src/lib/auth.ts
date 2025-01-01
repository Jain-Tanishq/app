import { supabase } from './supabase';

export const handleGoogleSignIn = async () => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        },
        redirectTo: window.location.origin
      }
    });
    
    if (error) throw error;
  } catch (error) {
    console.error('Google sign in error:', error);
    throw error;
  }
};

export const checkUserExists = async (email: string): Promise<boolean> => {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: 'dummy-password'
    });
    
    return error?.message?.includes('Invalid login credentials') ?? false;
  } catch {
    return false;
  }
};