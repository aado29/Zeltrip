import React, { useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { AuthNavigationProp } from '../../config/navigation/type';
import { useAuth } from '../../shared/hooks/use-auth';
import { bg1, google, fb, apple, email, logoWhite } from '../../shared/staticImgs';
import CButton from '../../shared/components/CButton';
import Divider from '../../shared/components/DividerV2';
import { colors } from '../../shared/styles';

const styles = StyleSheet.create({
  btnGoogle: { backgroundColor: '#FFFFFF', marginBottom: 16 },
  btnGoogleText: { color: colors.accent },
  btnFB: { backgroundColor: colors.fb, marginBottom: 16 },
  btnFBText: { color: '#FFFFFF' },
  btnApple: { backgroundColor: '#FFFFFF', marginBottom: 16 },
  btnAppleText: { color: colors.accent },
  divider: { marginBottom: 16 },
  btnEmail: { backgroundColor: '#FFFFFF', marginBottom: 32 },
  btnEmailText: { color: colors.accent },
});

const MenuButtonRight = ({ navigation }: { navigation: AuthNavigationProp }): JSX.Element => (
  <CButton
    onPress={(): void => navigation.navigate('Login')}
    style={{ width: '30%', backgroundColor: 'transparent', marginRight: 16 }}
    title="Saltar"
  />
);

const RegisterScreen = ({ navigation }: { navigation: AuthNavigationProp }): JSX.Element => {
  const { signInWithGoogleAsync, signInWithFacebookAsync, signInWithAppleAsync } = useAuth();

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerLeft: null,
      title: null,
      headerRight: (): JSX.Element => MenuButtonRight({ navigation }),
    });
  }, [navigation]);

  return (
    <ImageBackground style={{ flex: 1 }} source={bg1}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'flex-end',
        }}
      >
        <View
          style={{
            flexGrow: 1,
            justifyContent: 'flex-end',
            paddingBottom: 16,
            alignItems: 'center',
          }}
        >
          <Image source={logoWhite} style={{ height: 144 }} resizeMode="contain" />
        </View>
        <View style={{ flex: 1, padding: 16, paddingBottom: 48 }}>
          <CButton
            title="Continuar con Google"
            onPress={() => {
              signInWithGoogleAsync();
            }}
            leftIcon={google}
            style={styles.btnGoogle}
            textStyle={styles.btnGoogleText}
          />
          <CButton
            title="Continuar con Facebook"
            onPress={() => {
              signInWithFacebookAsync();
            }}
            leftIcon={fb}
            style={styles.btnFB}
            textStyle={styles.btnFBText}
          />
          {Platform.OS === 'ios' ? (
            <CButton
              title="Continuar con Apple"
              onPress={signInWithAppleAsync}
              leftIcon={apple}
              style={styles.btnApple}
              textStyle={styles.btnAppleText}
            />
          ) : null}
          <Divider title="O también" style={styles.divider} />
          <CButton
            title="Continuar con correo electrónico"
            onPress={(): void => {
              navigation.navigate('Login');
            }}
            leftIcon={email}
            style={styles.btnEmail}
            textStyle={styles.btnEmailText}
          />
          <View style={{ alignItems: 'center', paddingLeft: 50, paddingRight: 50 }}>
            <TouchableOpacity>
              <Text style={{ color: 'white', textAlign: 'center' }}>
                Al iniciar sesión en Zeltrip, aceptas{' '}
                <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>
                  nuestros términos y condiciones
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default RegisterScreen;
