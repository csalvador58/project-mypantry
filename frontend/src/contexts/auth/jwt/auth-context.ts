import { createContext } from 'react';

import type { User } from 'src/types/user';
import { Issuer } from 'src/utils/auth';

export interface State {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: User | null;
}

export const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

export interface AuthContextType extends State {
  issuer: Issuer.JWT;
  signIn: (username: string, password: string) => Promise<void>;
  // signUp: (username: string, name: string, password: string) => Promise<void>;
  signUp: (username: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  ...initialState,
  issuer: Issuer.JWT,
  signIn: () => Promise.resolve(),
  signUp: () => Promise.resolve(false),
  signOut: () => Promise.resolve()
});
