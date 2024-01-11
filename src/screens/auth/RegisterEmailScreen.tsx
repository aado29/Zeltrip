import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { AuthNavigationProp } from '@/config/navigation/type';
import { AntDesign } from '@expo/vector-icons';
// import { Formik } from 'formik';
import { useSession } from '../../contexts/session-provider';
import { RegisterFormValidation } from '../../shared/schemas';
import CButton from '../../shared/components/CButton';
import CInput from '../../shared/components/CInput';
import Point from '../../shared/components/Point';
import { colors } from '../../shared/styles';
import { calendar } from '../../shared/staticImgs';
import { useRegisterUser } from '../../api-queries/queries/user.query';

interface FormScheme {
  email: string;
  name: string;
  lastname: string;
  dob: string;
  password: string;
}

const checkPassword = (password: string): boolean[] => [
  password.length >= 10,
  /.*[0-9]/g.test(password),
  /.*[A-Z]/g.test(password),
  /.*[a-z]/g.test(password),
];

const Constraints = ({ constraints }: { constraints: boolean[] }): JSX.Element => (
  <View style={{ marginBottom: 32 }}>
    <Point
      message="Tiene al menos 10 caracteres"
      color={constraints[0] ? 'green' : undefined}
      bold={constraints[0]}
    />
    <Point
      message="Incluye al menos un número"
      color={constraints[1] ? 'green' : undefined}
      bold={constraints[1]}
    />
    <Point
      message="Incluye al menos una letra en mayúscula"
      color={constraints[2] ? 'green' : undefined}
      bold={constraints[2]}
    />
    <Point
      message="Incluye al menos una letra minúscula"
      color={constraints[3] ? 'green' : undefined}
      bold={constraints[3]}
    />
  </View>
);

const MenuButtonLeft = ({ navigation }: { navigation: AuthNavigationProp }): JSX.Element => (
  <TouchableOpacity
    onPress={() => navigation.goBack()}
    style={{ marginLeft: 8, height: 40, width: 40, justifyContent: 'center', alignItems: 'center' }}
  >
    <AntDesign name="arrowleft" size={24} color="black" />
  </TouchableOpacity>
);

const RegisterEmailScreen = ({ navigation }: { navigation: AuthNavigationProp }): JSX.Element => {
  const { login } = useSession();
  const registerUser = useRegisterUser();

  const initialValues: FormScheme = {
    email: '',
    name: '',
    lastname: '',
    dob: '',
    password: '',
  };

  const onSubmit = (values: FormScheme) => {
    registerUser.mutate(
      {
        email: values.email,
        firstName: values.name,
        lastName: values.lastname,
        password: values.password,
      },
      {
        onSuccess: (data) => {
          login(data.user, data.accessToken);
        },
      }
    );
  };

  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerLeft: (): JSX.Element => MenuButtonLeft({ navigation }),
    });
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: 'white' }}>
        {/* <Formik
          onSubmit={onSubmit}
          initialValues={initialValues}
          validationSchema={RegisterFormValidation}
        >
          {({ handleChange, handleSubmit, handleBlur, errors, values, isValid, touched }) => (
            <View
              style={{
                padding: 16,
                flex: 1,
                justifyContent: 'space-between',
                flexDirection: 'column',
              }}
            >
              <View>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    marginBottom: 24,
                    color: colors.accent,
                    textAlign: 'left',
                  }}
                >
                  Crea tu cuenta
                </Text>
                <CInput
                  label="Correo electrónico"
                  placeholder="micorreo@correo.com"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  error={!!errors.email && touched.email}
                  message={errors.email && touched.email ? errors.email : ''}
                  style={{ marginBottom: 32 }}
                />
                <CInput
                  label="Nombre"
                  placeholder="Belén"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  error={!!errors.name && touched.name}
                  message={errors.name && touched.name ? errors.name : ''}
                  style={{ marginBottom: 32 }}
                />
                <CInput
                  label="Apellido"
                  placeholder="Fernández"
                  onChangeText={handleChange('lastname')}
                  onBlur={handleBlur('lastname')}
                  value={values.lastname}
                  error={!!errors.lastname && touched.lastname}
                  message={errors.lastname && touched.lastname ? errors.lastname : ''}
                  style={{ marginBottom: 32 }}
                />
                <CInput
                  label="Fecha de nacimiento"
                  placeholder="01/05/1989"
                  onChangeText={handleChange('dob')}
                  onBlur={handleBlur('dob')}
                  value={values.dob}
                  error={!!errors.dob && touched.dob}
                  message={errors.dob && touched.dob ? errors.dob : ''}
                  style={{ marginBottom: 32 }}
                  type="mask"
                  mask="99/99/9999"
                  keyboardType="decimal-pad"
                  leftIcon={calendar}
                />
                <CInput
                  label="Contraseña"
                  placeholder="****************"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  error={!!errors.password && touched.password}
                  message={errors.password && touched.password ? errors.password : ''}
                  type="password"
                  style={{ marginBottom: 32, alignSelf: 'center' }}
                />
                {!!values.password && <Constraints constraints={checkPassword(values.password)} />}
              </View>
              <View>
                <CButton
                  title="Enviar correo"
                  onPress={handleSubmit}
                  disabled={!isValid || registerUser.isLoading}
                />
              </View>
            </View>
          )}
        </Formik> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterEmailScreen;
