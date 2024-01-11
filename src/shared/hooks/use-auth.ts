import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import {
  AuthRequestPromptOptions,
  AuthSessionResult,
  makeRedirectUri,
  ResponseType,
  TokenResponse,
} from 'expo-auth-session';
import { useSession } from '../../contexts/session-provider';
import { Provider, User } from '../../interfaces/user';
import { useConnectUser } from '../../api-queries/queries/user.query';

interface UseAuth {
  isAuthenticating: boolean;
  signInWithGoogleAsync: (options?: AuthRequestPromptOptions) => Promise<AuthSessionResult>;
  signInWithFacebookAsync: (options?: AuthRequestPromptOptions) => Promise<AuthSessionResult>;
  signInWithAppleAsync: () => Promise<void>;
}

export const useAuth = (): UseAuth => {
  // const [isAuthenticating, setIsAuthenticating] = useState(false);
  // const { login } = useSession();
  // const isAndroid = Platform.OS === 'android';
  // const { mutate: connectUser } = useConnectUser();

  // const [, googleAuthResponse, signInWithGoogleAsync] = Google.useAuthRequest({
  //   androidClientId: '974792969719-gngc190hhr87jdu84eoeectem4autsbc.apps.googleusercontent.com',
  //   iosClientId: '974792969719-trkfh3357gk8bov5gtmld7rkbti5ipif.apps.googleusercontent.com',
  //   expoClientId: '974792969719-f2r9p6jjajansn2avr4mnjkrqhqa2unf.apps.googleusercontent.com',
  // });

  // const [, facebookAuthResponse, signInWithFacebookAsync] = Facebook.useAuthRequest(
  //   {
  //     clientId: '2456303117842398',
  //     responseType: ResponseType.Token,
  //     redirectUri: isAndroid ? makeRedirectUri({ useProxy: true }) : undefined,
  //   },
  //   { useProxy: isAndroid }
  // );

  // const appleAuthentication = async (): Promise<User> => {
  //   const credential = await AppleAuthentication.signInAsync({
  //     requestedScopes: [
  //       AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
  //       AppleAuthentication.AppleAuthenticationScope.EMAIL,
  //     ],
  //   });

  //   return {
  //     email: credential.email ?? '',
  //     firstName: credential?.fullName?.givenName ?? '',
  //     lastName: credential?.fullName?.familyName ?? '',
  //     createdAt: new Date().toString(),
  //     identities: [],
  //   };
  // };

  // const authUser = useCallback(
  //   (provider: Provider, tokenResponse: TokenResponse): void => {
  //     const { accessToken: authToken } = tokenResponse;

  //     setIsAuthenticating(true);

  //     console.log(provider, authToken);

  //     connectUser(
  //       {
  //         accessToken: authToken,
  //         provider,
  //       },
  //       {
  //         onSuccess: ({ user, accessToken }) => {
  //           login(user, accessToken);
  //         },
  //         onSettled: () => {
  //           setIsAuthenticating(false);
  //         },
  //       }
  //     );
  //   },
  //   [login, connectUser]
  // );

  // const signInWithAppleAsync = useCallback(async (): Promise<void> => {
  //   const user = await appleAuthentication();

  //   login(user, 'appleAccessToken');
  // }, [login]);

  // useEffect(() => {
  //   if (googleAuthResponse?.type === 'success') {
  //     const { authentication } = googleAuthResponse;

  //     if (authentication) {
  //       authUser('google', authentication);
  //     } else {
  //       console.error('no authentication response');
  //     }
  //   }
  // }, [googleAuthResponse, authUser]);

  // useEffect(() => {
  //   if (facebookAuthResponse?.type === 'success') {
  //     const { authentication } = facebookAuthResponse;

  //     if (authentication) {
  //       authUser('facebook', authentication);
  //     } else {
  //       console.error('no authentication response');
  //     }
  //   }
  // }, [facebookAuthResponse, authUser]);

  return {
    signInWithGoogleAsync: async () => {
      await Promise.resolve();

      return {} as AuthSessionResult;
    },
    signInWithFacebookAsync: async () => {
      await Promise.resolve();

      return {} as AuthSessionResult;
    },
    signInWithAppleAsync: async () => {
      await Promise.resolve();
    },
    isAuthenticating: false,
  };
};

export default useAuth;
