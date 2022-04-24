import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { auth } from '../lib/firebase';
import { ROUTES } from '../router';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface IAuth {
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  loading: boolean;
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(
    () =>
      onAuthStateChanged(auth, user => {
        if (user) {
          setUser(user);
          setLoading(false);
        } else {
          setUser(null);
          setLoading(true);
        }

        setInitialLoading(false);
      }),
    []
  );

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    console.log('signup');
    await createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        console.log(userCredential);
        setUser(userCredential.user);
        setLoading(false);
        <Navigate to={ROUTES.main} />;
      })
      .catch(error => {
        setError(error);
        console.error(error.message);
      })
      .finally(() => setLoading(false));
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    console.log('signin');

    await signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        console.log(userCredential);

        setUser(userCredential.user);
        setLoading(false);
        <Navigate to={ROUTES.main} />;
      })
      .catch(error => {
        setError(error);
        console.error(error.message);
      })
      .finally(() => setLoading(false));
  };
  const logout = async () => {
    setLoading(true);

    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch(error => {
        setError(error);

        console.error(error.message);
      })
      .finally(() => setLoading(false));
  };

  const memoedValue = useMemo(
    () => ({
      user,
      signIn,
      signUp,
      loading,
      logout,
      error,
    }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}