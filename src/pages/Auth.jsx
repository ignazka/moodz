import React from 'react';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';

function Auth({ isLogin }) {
  const { handleLogin, handleSignup } = useAuth();
  // based on the isLogin prop the view chooses either the handleLogin or the handleSignup to be executed
  // in the onSubmit event of the form
  const onSubmit = isLogin ? handleLogin : handleSignup;
  const submitMessage = isLogin ? 'Login' : 'Signup';

  return (
    <div>
      <AuthForm submitMessage={submitMessage} onSubmit={onSubmit} />
    </div>
  );
}

export default Auth;
