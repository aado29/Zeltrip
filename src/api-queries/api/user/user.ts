import axios from 'axios';
import { AuthResponse, Provider } from '../../../interfaces/user';
import { transformAuthResponse } from './user.transforms';

export interface LoginUserParams {
  email: string;
  password: string;
}

export interface RegisterUserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ConnectUserParas {
  provider: Provider;
  accessToken: string;
}

const baseUrl = 'http://64.225.62.178:3000';

export const login = async ({ email, password }: LoginUserParams): Promise<AuthResponse> => {
  const { data } = await axios.post(`${baseUrl}/api/v1/signin`, {
    email,
    password,
  });

  return transformAuthResponse(data);
};

export const register = async ({
  firstName,
  lastName,
  email,
  password,
}: RegisterUserParams): Promise<AuthResponse> => {
  const { data } = await axios.post<AuthResponse>(`${baseUrl}/api/v1/signup`, {
    firstname: firstName,
    lastname: lastName,
    email,
    password,
    password_confirmation: password,
  });

  return transformAuthResponse(data);
};

export const connect = async ({
  provider,
  accessToken,
}: ConnectUserParas): Promise<AuthResponse> => {
  const { data } = await axios.post<AuthResponse>(`${baseUrl}/api/v1/signup`, {
    access_token: accessToken,
    provider,
  });

  return transformAuthResponse(data);
};

export default {};
