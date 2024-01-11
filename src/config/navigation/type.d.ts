import { NavigationProp, ParamListBase } from '@react-navigation/native';

interface DefaultScreenProps {
  param: null;
}

export interface AppNavigation extends ParamListBase {
  Home?: DefaultScreenProps;
  WelcomeHost?: DefaultScreenProps;
  MyAccommodations?: DefaultScreenProps;
  NewAccommodation?: {
    id?: number;
  };
}

interface AuthNavigation extends ParamListBase {
  Wizard?: DefaultScreenProps;
  Login?: DefaultScreenProps;
  Register?: DefaultScreenProps;
  RegisterEmail?: DefaultScreenProps;
  Purpose?: DefaultScreenProps;
  ForgotPassword?: DefaultScreenProps;
}

export type AppNavigationProp = NavigationProp<AppNavigation>;

export type AuthNavigationProp = NavigationProp<AuthNavigation>;
