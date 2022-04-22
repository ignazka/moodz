import React from 'react';
import useAuth from '../context/authContext';

function Main() {
  const { user, logout } = useAuth();
  return (
    <div>
      <h2>Welcome</h2>
      <p>{user?.email}</p>
      <button onClick={logout}>logout</button>
    </div>
  );
}

export default Main;
