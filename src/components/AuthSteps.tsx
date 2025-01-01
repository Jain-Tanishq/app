import { useState } from 'react';
import { EmailStep } from './EmailStep';
import { PasswordStep } from './PasswordStep';
import { SignUpStep } from './SignUpStep';
import { checkUserExists } from '../lib/auth';

export const AuthSteps = () => {
  const [email, setEmail] = useState('');
  const [mode, setMode] = useState<'check' | 'signin' | 'signup'>('check');

  const handleEmailSubmit = async (emailValue: string) => {
    const exists = await checkUserExists(emailValue);
    setEmail(emailValue);
    setMode(exists ? 'signin' : 'signup');
  };

  if (mode === 'check') {
    return (
      <EmailStep 
        email={email}
        setEmail={setEmail}
        onSubmit={handleEmailSubmit}
      />
    );
  }

  if (mode === 'signup') {
    return (
      <SignUpStep 
        email={email}
        onBack={() => setMode('check')}
        onSignIn={() => setMode('signin')}
      />
    );
  }

  return (
    <PasswordStep 
      email={email}
      onBack={() => setMode('check')}
    />
  );
};