import React from 'react';
import { isLoggedIn, logout, login, signup } from '../../api';

// check if we have a user store in session memory
// if we found one then we parse the string and return the user object
// if not we return null
function getSessionUser() {
  const rawUser = sessionStorage.getItem('user');
  if (rawUser) {
    return JSON.parse(rawUser);
  }
  return null;
}

// remove the user stored in session memory
function removeUser() {
  sessionStorage.removeItem('user');
}

// save the user in session memory
function saveSessionUser(user: any | null) {
  sessionStorage.setItem('user', JSON.stringify(user));
}

// create an auth context object
// this object contains the Provider component and the value prop as data
export const AuthCtx = React.createContext({});

function AuthProvider({ children }: any) {
  // the auth state that we are going to share
  const [auth, setAuth] = React.useState({ user: getSessionUser() });

  const handleLogin = async (credentials: any) => {
    try {
      // send the api call with the credentials of the user
      const { data } = await login(credentials);
      // save the return user in session
      saveSessionUser(data);
      // update the state with the logged in user
      setAuth({ user: data });
    } catch (err) {
      // if there is an error update the state with null
      setAuth({ user: null });
      // return error for error handling
      return { error: err };
    }
  };

  // same logic as the login
  const handleSignup = async (credentials: any) => {
    try {
      const { data } = await signup(credentials);
      saveSessionUser(data);
      setAuth({ user: data });
    } catch (err) {
      setAuth({ user: null });
      return { error: err };
    }
  };

  const handleLogout = async () => {
    try {
      // destroy the session in the server
      await logout();
      // remove the user from the browser session memory
      removeUser();
    } catch (err) {
    } finally {
      // update the state with no user
      setAuth({ user: null });
    }
  };

  const handleIsLoggedIn = async () => {
    try {
      // check if there is a user in the session of the server
      const { data } = await isLoggedIn();
      console.log('user', data);
      // update the state with the user
      setAuth({ user: data });
      // save the user in browser session memory
      saveSessionUser(data);
    } catch (err) {
      // if there is an error then update the state with no user
      setAuth({ user: null });
      removeUser();
    }
  };

  // when we mount the page at a refresh check if there is a user in the server session
  React.useEffect(() => {
    handleIsLoggedIn();
  }, []);

  return (
    // The authctx object has a Provider component in charge of sharing data with its children
    // everything that is pass to the prop value is going to be expose to the children
    <AuthCtx.Provider
      value={{ ...auth, handleLogin, handleLogout, handleSignup }}
    >
      {children}
    </AuthCtx.Provider>
  );
}

// to consume context, you call React.useContext and pass the context object as an argument
export function useAuth() {
  // this function returns the value that we pass to the <AuthCtx.Provider /> in the prop value
  // in this case the user object, handleLogin, handleLogout, handleSignup
  return React.useContext(AuthCtx);
}

export default AuthProvider;
