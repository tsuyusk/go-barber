import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface AuthContextState {
  name: string;
  user: User;
  loading: boolean;

  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut(): void;
  updateUser(user: User): Promise<void>;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthState {
  token: string;
  user: User;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

export const AuthContextProvider: React.FC = ({ children }) => {
  const [authData, setAuthData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const [[, token], [, user]] = await AsyncStorage.multiGet([
        '@GoBarber/token',
        '@GoBarber/user',
      ]);

      if (token && user) {
        api.defaults.headers.authorization = `Bearer ${token}`;
        setAuthData({ token, user: JSON.parse(user) });
      }
      setLoading(false);
    }
    loadStoragedData();
  }, []);

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });
    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ['@GoBarber/token', token],
      ['@GoBarber/user', JSON.stringify(user)],
    ]);

    api.defaults.headers.authorization = `Bearer ${token}`;
    setAuthData({ token, user });
  }, []);

  const updateUser = useCallback(
    async (user: User) => {
      await AsyncStorage.setItem('@GoBarber/user', JSON.stringify(user));
      setAuthData({
        token: authData.token,
        user,
      });
    },
    [setAuthData, authData.token],
  );

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber/token', '@GoBarber/user']);

    setAuthData({} as AuthState);
  }, []);
  return (
    <AuthContext.Provider
      value={{
        name: 'diego',
        user: authData.user,
        signIn,
        signOut,
        loading,
        updateUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextState {
  const authState = useContext(AuthContext);

  if (!authState) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return authState;
}
