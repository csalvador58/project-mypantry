import type { User } from 'src/types/user';
import { createResourceId } from 'src/utils/create-resource-id';
import { decode, JWT_EXPIRES_IN, JWT_SECRET, sign } from 'src/utils/jwt';
import { wait } from 'src/utils/wait';

import { users } from './data';

const STORAGE_KEY = 'users';

// NOTE: We use sessionStorage since memory storage is lost after page reload.
//  This should be replaced with a server call that returns DB persisted data.

const getPersistedUsers = (): User[] => {
  try {
    const data = sessionStorage.getItem(STORAGE_KEY);

    if (!data) {
      return [];
    }

    return JSON.parse(data) as User[];
  } catch (err) {
    console.error(err);
    return [];
  }
};

const persistUser = (user: User): void => {
  try {
    const users = getPersistedUsers();
    const data = JSON.stringify([...users, user]);
    sessionStorage.setItem(STORAGE_KEY, data);
  } catch (err) {
    console.error(err);
  }
};

type SignInRequest = {
  username: string;
  password: string;
}

type SignInResponse = Promise<{
  accessToken: string;
}>;

type SignUpRequest = {
  username: string;
  password: string;
}

type SignUpResponse = Promise<{
  accessToken: string;
}>;

type MeRequest = {
  accessToken: string
};

type MeResponse = Promise<User>;

class AuthApi {
  async signIn(request: SignInRequest): SignInResponse {
    const { username, password } = request;

    console.log('Auth API')
    console.log(username, password)

    await wait(500);

    return new Promise((resolve, reject) => {
      try {
        // Merge static users (data file) with persisted users (browser storage)
        const mergedUsers = [
          ...users,
          ...getPersistedUsers()
        ];

        // Find the user
        const user = mergedUsers.find((user) => user.username === username);

        if (!user || (user.password !== password)) {
          reject(new Error('Please check your username and password'));
          return;
        }

        // Create the access token
        const accessToken = sign(
          { userId: user.id },
          JWT_SECRET,
          { expiresIn: JWT_EXPIRES_IN }
        );

        console.log('accessToken')
        console.log(accessToken)

        resolve({ accessToken });
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  async signUp(request: SignUpRequest): SignUpResponse {
    const { username, password } = request;

    await wait(1000);

    return new Promise((resolve, reject) => {
      try {
        // Merge static users (data file) with persisted users (browser storage)
        const mergedUsers = [
          ...users,
          ...getPersistedUsers()
        ];

        // Check if a user already exists
        let user = mergedUsers.find((user) => user.username === username);

        if (user) {
          reject(new Error('User already exists'));
          return;
        }

        user = {
          id: createResourceId(),
          avatar: undefined,
          username,
          password,
          plan: 'Standard'
        };

        persistUser(user);

        const accessToken = sign(
          { userId: user.id },
          JWT_SECRET,
          { expiresIn: JWT_EXPIRES_IN }
        );

        resolve({ accessToken });
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  me(request: MeRequest): MeResponse {
    const { accessToken } = request;

    return new Promise((resolve, reject) => {
      try {
        // Decode access token
        const decodedToken = decode(accessToken) as any;

        // Merge static users (data file) with persisted users (browser storage)
        const mergedUsers = [
          ...users,
          ...getPersistedUsers()
        ];

        // Find the user
        const { userId } = decodedToken;
        const user = mergedUsers.find((user) => user.id === userId);

        if (!user) {
          reject(new Error('Invalid authorization token'));
          return;
        }

        resolve({
          id: user.id,
          avatar: user.avatar,
          username: user.username,
          name: user.name,
          plan: user.plan
        });
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }
}

export const authApi = new AuthApi();
