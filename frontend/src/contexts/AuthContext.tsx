import React, { createContext, useState, ReactNode } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { api } from '../services/api';

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInCredentials) => Promise<void>;
}

type Role = 'admin' | 'user';

type UserProps = {
  id: string;
  name: string;
  email: string;
  cpf: string;
  token: string;
  role: Role;
}

type AuthProviderProps = {
  children: ReactNode;
}

type SignInCredentials = {
  cpf: string;
  password: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps);

  const [loadingAuth, setLoadingAuth] = useState(false);

  const isAuthenticated = !!user.token;

  async function signIn({ cpf, password }: SignInCredentials) {
    setLoadingAuth(true);

    try {
      const response = await api.post('/login', {
        cpf,
        password
      });

      const { id, name, email, token, role } = response.data;

      const data = {
        ...response.data
      }

      await AsyncStorage.setItem('@tcc', JSON.stringify(data));

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setUser({
        id,
        name,
        email,
        cpf,
        token,
        role
      })

      setLoadingAuth(false);
    } catch(err) {
      console.log('Erro ao logar: ', err);
      setLoadingAuth(false);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}