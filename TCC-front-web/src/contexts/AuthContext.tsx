import { createContext, ReactNode, useState } from "react";
import { destroyCookie, setCookie, parseCookies } from "nookies"
import { api } from "../services/apiClient";

type AuthContextData = {
  user?: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
}

type Role = 'admin' | 'user';

type UserProps = {
  id: string;
  name: string;
  email: string;
  token: string;
  role: Role;
}

type SignInProps = {
  cpf: string;
  password: string;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  try {
    destroyCookie(undefined, 'nextauth.token')
  } catch {
    console.log('Não foi possível fazer o logout')
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const isAuthenticated = !!user;

  const signIn = async ({ cpf, password }: SignInProps) => {
    try {
      const response = await api.post('/login', {
        cpf,
        password
      })

      const { id, name, email, token, role } = response.data

      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      })

      setUser({
        id: id,
        name: name,
        email: email,
        token: token,
        role: role
      })

      api.defaults.headers['Authorization'] = `Bearer ${token}`

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}