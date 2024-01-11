import { UseMutationResult, useMutation } from 'react-query';
import {
  register,
  login,
  RegisterUserParams,
  LoginUserParams,
  ConnectUserParas,
  connect,
} from '../api/user/user';
import { AuthResponse } from '../../interfaces/user';

export const useRegisterUser = (): UseMutationResult<AuthResponse, string, RegisterUserParams> =>
  useMutation(register);

export const useLoginUser = (): UseMutationResult<AuthResponse, string, LoginUserParams> =>
  useMutation(login);

export const useConnectUser = (): UseMutationResult<AuthResponse, string, ConnectUserParas> =>
  useMutation(connect);

export default {};
