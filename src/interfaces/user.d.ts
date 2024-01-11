export type Provider = 'facebook' | 'google';

export interface Identity {
  provider: Provider;
  uid: string;
  linkedAt: Date;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  createdAt?: string;
  identities: Identity[];
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}
