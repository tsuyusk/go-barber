import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface User {
  id: string;
  avatar_url: string;
  name: string;
}

interface AuthContextState {
  name: string;
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
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
  const [authData, setAuthData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber/token');

    const user = localStorage.getItem('@GoBarber/user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });
    const { token, user } = response.data;

    localStorage.setItem('@GoBarber/token', token);

    localStorage.setItem('@GoBarber/user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setAuthData({ token, user });
  }, []);
  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber/token');
    localStorage.removeItem('@GoBarber/user');

    setAuthData({} as AuthState);
  }, []);
  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@GoBarber/user', JSON.stringify(user));
      setAuthData({
        token: authData.token,
        user,
      });
    },
    [setAuthData, authData.token]
  );
  return (
    <AuthContext.Provider
      value={{
        name: 'diego',
        user: authData.user,
        signIn,
        signOut,
        updateUser,
      }}
    >
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
