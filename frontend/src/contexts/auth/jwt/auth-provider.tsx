import type { FC, ReactNode } from 'react';
import { useCallback, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

import { authApi } from 'src/api/auth';
import type { User } from 'src/types/user';
import { Issuer } from 'src/utils/auth';

import type { State } from './auth-context';
import { AuthContext, initialState } from './auth-context';
import { MY_PANTRY } from 'src/utils/constants';

const STORAGE_KEY = MY_PANTRY.STORAGE_KEY;
const STORAGE_USER = MY_PANTRY.STORAGE_USER;
const STORAGE_USER_ID = MY_PANTRY.STORAGE_USER_ID;

enum ActionType {
  INITIALIZE = 'INITIALIZE',
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',
  SIGN_OUT = 'SIGN_OUT',
}

type InitializeAction = {
  type: ActionType.INITIALIZE;
  payload: {
    isAuthenticated: boolean;
    user: User | null;
  };
};

type SignInAction = {
  type: ActionType.SIGN_IN;
  payload: {
    user: User;
  };
};

type SignUpAction = {
  type: ActionType.SIGN_UP;
  payload: {
    user: User;
  };
};

type SignOutAction = {
  type: ActionType.SIGN_OUT;
};

type Action = InitializeAction | SignInAction | SignUpAction | SignOutAction;

type Handler = (state: State, action: any) => State;

const handlers: Record<ActionType, Handler> = {
  INITIALIZE: (state: State, action: InitializeAction): State => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  SIGN_IN: (state: State, action: SignInAction): State => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  SIGN_UP: (state: State, action: SignUpAction): State => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  SIGN_OUT: (state: State): State => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
};

const reducer = (state: State, action: Action): State =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async (): Promise<void> => {
    try {
      const accessToken = window.sessionStorage.getItem(STORAGE_KEY);
      const userId = window.sessionStorage.getItem(STORAGE_USER_ID);
      const username = window.sessionStorage.getItem(STORAGE_USER);

      if (accessToken && userId && username) {
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: true,
            user:
              userId && username
                ? {
                    id: userId,
                    username,
                  }
                : null,
          },
        });
      } else {
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (err) {
      // console.error(err);
      dispatch({
        type: ActionType.INITIALIZE,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [dispatch]);

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const signIn = useCallback(
    async (username: string, password: string): Promise<void> => {
      const {
        accessToken,
        userId,
        username: user,
      } = await authApi.signIn({ username, password });

      // console.log('AuthProvider - signIn - accessToken')
      // console.log(accessToken, userId, user)

      sessionStorage.setItem(STORAGE_KEY, accessToken);
      sessionStorage.setItem(STORAGE_USER, user);
      sessionStorage.setItem(STORAGE_USER_ID, userId);

      dispatch({
        type: ActionType.SIGN_IN,
        payload: {
          user: {
            id: userId,
            username: user,
          },
        },
      });
    },
    [dispatch]
  );

  const signUp = useCallback(
    async (username: string, password: string): Promise<void> => {

      const { userId, username: user } = await authApi.signUp({
        username,
        password,
      });

      const { accessToken } = await authApi.signIn({ username, password });

      sessionStorage.setItem(STORAGE_KEY, accessToken);
      sessionStorage.setItem(STORAGE_USER, user);
      sessionStorage.setItem(STORAGE_USER_ID, userId);

      dispatch({
        type: ActionType.SIGN_UP,
        payload: {
          user: {
            id: userId,
            username: user,
          },
        },
      });
    },
    [dispatch]
  );

  const signOut = useCallback(async (): Promise<void> => {
    sessionStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_USER);
    sessionStorage.removeItem(STORAGE_USER_ID);
    dispatch({ type: ActionType.SIGN_OUT });
  }, [dispatch]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        issuer: Issuer.JWT,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
