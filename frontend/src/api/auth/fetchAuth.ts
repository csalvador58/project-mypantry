import { ApiError } from 'src/error/error-classes';
import { MY_PANTRY } from 'src/utils/constants';

const STORAGE_KEY = MY_PANTRY.STORAGE_KEY;
const DOMAIN = MY_PANTRY.DOMAIN;

export const fetchAuthSignIn = async (
  username: string,
  password: string
): Promise<{ userId: string; username: string; accessToken: string }> => {
  const body = {
    username: username,
    password: password,
  };

  try {
    const token = window.sessionStorage.getItem(STORAGE_KEY);
    const url = `${DOMAIN}/auth/login`;
    const method = 'POST';
    const response = await fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(
        `${response.status}: ${response.statusText}, ${data.error}`
      );
    }

    const data = await response.json();

    return {
      userId: data.userId,
      username: data.username,
      accessToken: data.token,
    };
  } catch (error) {
    throw new ApiError('Error occurred during fetchAuthSignIn API call.');
  }
};

export const fetchAuthSignUp = async (
  username: string,
  password: string
): Promise<{ userId: string; username: string }> => {
  const body = {
    username: username,
    password: password,
  };

  try {
    const url = `${DOMAIN}/auth/register`;
    const method = 'POST';
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(
        `${response.status}: ${response.statusText}, ${data.error}`
      );
    }

    const data = await response.json();

    return { userId: data.user._id, username: data.user.username };
  } catch (error) {
    throw new ApiError('Error occurred during fetchAuthSignUp API call.');
  }
};
