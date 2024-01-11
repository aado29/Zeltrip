import React, { ReactElement, useEffect } from 'react';
import { View, TouchableHighlight } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppNavigationProp } from 'config/navigation/type';
import { useSession } from '../../contexts/session-provider';
import { Text } from '../../shared/components/text';

const LogoutButton = ({ logout }: { logout: () => void }): ReactElement => {
  return (
    <TouchableHighlight onPress={() => logout()} style={{ paddingHorizontal: 16 }}>
      <Text variant="paragraph">Cerrar sesión</Text>
    </TouchableHighlight>
  );
};

const HomeScreen = ({ navigation }: { navigation: AppNavigationProp }): JSX.Element => {
  const { logout, user } = useSession();

  useEffect(() => {
    const headerRight = () => <LogoutButton logout={logout} />;

    navigation.setOptions({
      // headerLeft: null,
      title: null,
      headerRight,
    });
  }, [navigation, logout]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', padding: 16 }}>
      <View style={{ marginVertical: 20 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text variant="paragraph" style={{ fontWeight: 'bold', marginRight: 4 }}>
            Nombre:
          </Text>
          <Text variant="paragraph">
            {user?.firstName} {user?.lastName}
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text variant="paragraph" style={{ fontWeight: 'bold', marginRight: 4 }}>
            Email:
          </Text>
          <Text variant="paragraph">{user?.email}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text variant="paragraph" style={{ fontWeight: 'bold', marginRight: 4 }}>
            Fecha de creación:
          </Text>
          <Text variant="paragraph">{JSON.stringify(user?.createdAt)}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
