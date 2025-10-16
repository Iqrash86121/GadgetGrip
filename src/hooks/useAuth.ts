// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { clearUser, setUser } from '../redux/slice/authSlice';

export const useAuth = () => {
  const [initializing, setInitializing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser({
          uid: user.uid,
          email: user.email,
        }));
      } else {
        dispatch(clearUser());
      }
      if (initializing) setInitializing(false);
      setError(null);
    }, );

    return subscriber;
  }, [dispatch, initializing]);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      setError(null);
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await auth().signOut();
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setError(null);
      await auth().sendPasswordResetEmail(email);
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  return {
    initializing,
    error,
    login,
    signup,
    logout,
    resetPassword,
  };
};