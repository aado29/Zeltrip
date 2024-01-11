import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../screens/home/home-screen';
import { WelcomeHostScreen } from '../../screens/welcome/welcome-host-screen';
import { NewAccommodationScreen } from '../../screens/new-accommodation';
import { MyAccommodations } from '../../screens/my-accommodations';

const Stack = createStackNavigator();

/** App Navigator have all the routes with authenticated users. */
const AppNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator initialRouteName="WelcomeHost">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="WelcomeHost" component={WelcomeHostScreen} />
      <Stack.Screen name="NewAccommodation" component={NewAccommodationScreen} />
      <Stack.Screen name="MyAccommodations" component={MyAccommodations} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
