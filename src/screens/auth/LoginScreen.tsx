import React, { useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
// import * as WebBrowser from 'expo-web-browser';
import { AuthNavigationProp } from '@/config/navigation/type';
// import { Formik } from 'formik';
import { useAuth } from '@/shared/hooks/use-auth';
import { useSession } from '@/contexts/session-provider';
import { LoginFormValidation } from '@/shared/schemas';

import CButton from '@/shared/components/CButton';
import CInput from '@/shared/components/CInput';
import Divider from '@/shared/components/DividerV2';
import { colors } from '@/shared/styles';
import { google, fb, apple } from '@/shared/staticImgs';
import { useLoginUser } from '@/api-queries/queries/user.query';

// WebBrowser.maybeCompleteAuthSession();

interface LoginScreenProps {
  navigation: AuthNavigationProp;
}

interface FormScheme {
  email: string;
  password: string;
}

const styles = StyleSheet.create({
  btnGoogle: {
    backgroundColor: 'white',
    borderWidth: 0.6,
    borderColor: colors.light,
    marginBottom: 16,
  },
  btnGoogleText: { color: colors.accent },
  btnFB: { backgroundColor: colors.fb, marginBottom: 16 },
  btnFBText: { color: 'white' },
  btnApple: {
    backgroundColor: 'white',
    borderWidth: 0.6,
    borderColor: colors.light,
    marginBottom: 16,
  },
  btnAppleText: { color: colors.accent },
});

const MenuButtonLeft = ({ navigation }: LoginScreenProps): JSX.Element => (
  <TouchableOpacity
    onPress={() => navigation.goBack()}
    style={{ marginLeft: 8, height: 40, width: 40, justifyContent: 'center', alignItems: 'center' }}
  >
    <AntDesign name="close" size={24} color="black" />
  </TouchableOpacity>
);

const MenuButtonRight = ({ navigation }: LoginScreenProps): JSX.Element => (
  <CButton
    onPress={() => {
      navigation.navigate('RegisterEmail');
    }}
    style={{ justifyContent: 'flex-end', backgroundColor: 'transparent', marginRight: 20 }}
    textStyle={{ color: colors.accent }}
    title="Regístrate"
  />
);

const LoginScreen = ({ navigation }: LoginScreenProps): JSX.Element => {
  const { login } = useSession();
  const { signInWithGoogleAsync, signInWithFacebookAsync, signInWithAppleAsync } = useAuth();
  const loginUser = useLoginUser();

  const initialValues: FormScheme = {
    email: '',
    password: '',
  };

  const handleSubmitForm = (values: FormScheme): void => {
    loginUser.mutate(values, {
      onSuccess: (data) => {
        login(data.user, data.accessToken);
      },
      onError: (e) => {
        console.log(e);
      },
    });
  };

  useEffect(() => {
    navigation.setOptions({
      title: null,
      headerTransparent: false,
      headerLeft: (): JSX.Element => MenuButtonLeft({ navigation }),
      headerRight: (): JSX.Element => MenuButtonRight({ navigation }),
    });
  }, [navigation]);

  return (
    <KeyboardAvoidingView style={{ flex: 1, padding: 16, backgroundColor: 'white' }}>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          flexGrow: 1,
          alignItems: 'stretch',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* <Formik
          onSubmit={handleSubmitForm}
          initialValues={initialValues}
          validationSchema={LoginFormValidation}
          validateOnMount
        >
          {({ handleChange, handleSubmit, handleBlur, errors, values, isValid, touched }) => (
            <View style={{}}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    marginBottom: 24,
                    color: colors.accent,
                    textAlign: 'left',
                    width: '100%',
                  }}
                >
                  Iniciar sesión con correo electrónico
                </Text>
              </View>
              <View style={{ alignItems: 'stretch', justifyContent: 'flex-start' }}>
                <CInput
                  label="Correo electrónico"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  error={!!errors.email && touched.email}
                  message={errors.email && touched.email ? errors.email : ''}
                  style={{ marginBottom: 32 }}
                />
                <CInput
                  type="password"
                  label="Contraseña"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  error={!!errors.password && touched.password}
                  message={errors.password && touched.password ? errors.password : ''}
                  style={{ marginBottom: 32 }}
                />

                <View
                  style={{
                    alignSelf: 'flex-end',
                    paddingTop: 8,
                    paddingBottom: 8,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      height: 40,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => {
                      navigation.navigate('ForgotPassword');
                    }}
                  >
                    <Text style={{ fontWeight: 'bold', fontSize: 13 }}>
                      ¿Olvidaste tu contraseña?
                    </Text>
                  </TouchableOpacity>
                </View>

                <CButton
                  style={{ marginTop: 32 }}
                  onPress={handleSubmit}
                  title="Iniciar sesión"
                  disabled={!isValid || loginUser.isLoading}
                />
              </View>
            </View>
          )}
        </Formik> */}

        <View style={{ marginTop: 16 }}>
          <Divider title="O también" color={colors.accent} style={{ marginBottom: 16 }} />

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
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
