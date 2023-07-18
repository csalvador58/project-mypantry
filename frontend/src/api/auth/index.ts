import type { User } from 'src/types/user';
import { fetchAuthSignIn, fetchAuthSignUp } from './fetchAuth';
import { ApiError } from 'src/error/error-classes';


type SignInRequest = {
  username: string;
  password: string;
};

type SignInResponse = {
  userId: string;
  username: string;
  accessToken: string;
};

type SignUpRequest = {
  username: string;
  password: string;
};

type SignUpResponse = {
  userId: string;
  username: string;
};

type MeRequest = {
  accessToken: string;
};

type MeResponse = Promise<User>;

class AuthApi {
  async signIn(request: SignInRequest): Promise<SignInResponse> {
    const { username, password } = request;

    return new Promise(async (resolve, reject) => {
      try {
        let response: SignInResponse = await fetchAuthSignIn(username, password);

        resolve(response);
      } catch (err) {
        reject(new ApiError(err));
      }
    });
  }

  async signUp(request: SignUpRequest): Promise<SignUpResponse> {
    const { username, password } = request;

    return new Promise(async (resolve, reject) => {
      try {
        let response: SignUpResponse =
          await fetchAuthSignUp(username, password);

        resolve(response);
      } catch (err) {
        reject(new ApiError(err));
      }
    });
  }
}

export const authApi = new AuthApi();
