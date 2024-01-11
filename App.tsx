import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider, defaultTheme } from '@/theme';
import SplashScreen from '@/screens/splash/SplashScreen';
import Root from '@/config/navigation/Root';

import syncStorage from '@/config/sync-storage';
import { SessionProvider } from '@/contexts/session-provider';
import { Text, View } from 'react-native';

const queryClient = new QueryClient();

const App = (): JSX.Element => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    syncStorage.init();
  }, []);

  if (showSplash) {
    return <SplashScreen onSplashFinished={() => setShowSplash(false)} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <ThemeProvider theme={defaultTheme}>
          <Root />
          {/* <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Ejo</Text>
          </View> */}
        </ThemeProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default App;
