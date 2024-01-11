/* eslint-disable react/style-prop-object */
import React from 'react';
import { PortalProvider } from '@gorhom/portal';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
// import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigator from '@/config/navigation/AppNavigator';
import AuthNavigator from '@/config/navigation/AuthNavigator';
import { useSession } from '@/contexts/session-provider';

const Root = (): JSX.Element => {
  const { isLoggedIn } = useSession();

  return (
    // <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <PortalProvider>{isLoggedIn ? <AppNavigator /> : <AuthNavigator />}</PortalProvider>
      </NavigationContainer>
    // </SafeAreaProvider>
  );
};

export default Root;
