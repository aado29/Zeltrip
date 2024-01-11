/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthResponse, Identity, User } from '../../../interfaces/user';

const transformsIdentity = (rawIdentity: any): Identity => ({
  provider: rawIdentity.provider,
  linkedAt: rawIdentity.created_at,
  uid: rawIdentity.uid,
});

export const transformsUser = (rawUser: any): User => ({
  firstName: rawUser.firstname,
  lastName: rawUser.lastname,
  createdAt: new Date(rawUser?.created_at).toString(),
  email: rawUser.email,
  identities: (rawUser.identities ?? []).map(transformsIdentity),
});

export const transformAuthResponse = (dataResponse: any): AuthResponse => ({
  accessToken: dataResponse.auth_token,
  user: transformsUser(dataResponse),
});

export default {};
