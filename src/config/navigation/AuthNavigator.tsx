import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WizardScreen from '../../screens/wizard/WizardScreen';
import RegisterScreen from '../../screens/auth/RegisterScreen';
import RegisterEmailScreen from '../../screens/auth/RegisterEmailScreen';
import LoginScreen from '../../screens/auth/LoginScreen';
import ForgotPassword from '../../screens/auth/ForgotPassword';
import PurposeScreen from '../../screens/auth/PurposeScreen';

const Stack = createStackNavigator();

/** Auth Navigator have all the routes with unauthenticated users. */
const AuthNavigator = () => (
  <Stack.Navigator initialRouteName="WizardScreen">
    <Stack.Screen name="Wizard" component={WizardScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="RegisterEmail" component={RegisterEmailScreen} />
    <Stack.Screen name="Purpose" component={PurposeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
  </Stack.Navigator>
);

export default AuthNavigator;
