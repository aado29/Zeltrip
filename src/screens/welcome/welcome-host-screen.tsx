import React, { ReactElement, useEffect } from 'react';
import { AppNavigationProp } from 'config/navigation/type';
import { ImageBackground, SafeAreaView, View } from 'react-native';
import { bg2 } from '../../shared/staticImgs';
import { Button } from '../../shared/components/button';
import { Text } from '../../shared/components/text';

export const WelcomeHostScreen = ({
  navigation,
}: {
  navigation: AppNavigationProp;
}): ReactElement => {
  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      title: '',
      headerLeft: null,
      headerRight: null,
    });
  }, [navigation]);

  return (
    <ImageBackground style={{ flex: 1 }} source={bg2}>
      <View style={{ flex: 1, justifyContent: 'space-between', padding: 16 }}>
        <View style={{ flex: 1, flexGrow: 1, paddingHorizontal: 32 }}>
          <Text
            variant="heading"
            color={['blue', '750']}
            style={{ marginBottom: 8, marginTop: 140, textAlign: 'center', fontWeight: 'bold' }}
          >
            ¡Felicidades!
          </Text>
          <Text variant="paragraph" color={['blue', '750']} style={{ textAlign: 'center' }}>
            Ahora puedes entregar tus servicios de alojamiento como anfitrión/a.
          </Text>
          <Text
            variant="paragraph"
            color={['blue', '750']}
            style={{ textAlign: 'center', fontWeight: 'bold' }}
          >
            ¿Quieres realizar tu primera publicación?
          </Text>
        </View>
        <SafeAreaView>
          <View style={{ alignItems: 'stretch' }}>
            <Button kind="secondary" onPress={() => navigation.navigate('NewAccommodation')}>
              Publicar
            </Button>
          </View>
          <View style={{ alignItems: 'stretch', marginTop: 16 }}>
            <Button kind="primary" onPress={() => navigation.navigate('MyAccommodations')}>
              Mis publicaciones
            </Button>
          </View>
          <View style={{ alignItems: 'stretch', marginTop: 16 }}>
            <Button kind="primary" onPress={() => navigation.navigate('Home')}>
              Mi perfil
            </Button>
          </View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};
