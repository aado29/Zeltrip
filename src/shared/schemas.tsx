import * as Yup from 'yup';

const dateRegex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;

const LoginFormScheme = {
  email: Yup.string()
    .label('Email')
    .email('Correo electrónico inválido')
    .required('Falta llenar este campo'),
  password: Yup.string()
    .required('Falta llenar este campo')
    .min(8, 'La contraseña debe tener al menos 8 caracteres.'),
  // .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
};

const RegisterFormSchema = {
  email: Yup.string()
    .label('Email')
    .email('Correo electrónico inválido')
    .required('Falta llenar este campo'),
  name: Yup.string().label('Nombre').required('Falta llenar este campo'),
  lastname: Yup.string().label('Apellido').required('Falta llenar este campo'),
  dob: Yup.string()
    .label('Fecha de nacimiento')
    .required('Falta llenar este campo')
    .matches(dateRegex, 'Fecha invalida'),
  password: Yup.string()
    .required('Falta llenar este campo')
    .min(10, 'Tiene al menos 10 caracteres'),
  // .matches(new RegExp('(?=.*[a-z])(?=.*[A-Z])(.*[0-9].*)', 'Contraseña invalida'),
};

const ForgotPasswordScheme = {
  email: Yup.string()
    .label('Email')
    .email('Please enter a valid email')
    .required('Email address is required'),
};

const ResetPasswordScheme = {
  password: Yup.string()
    .required('Please create a new password')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
};

export const LoginFormValidation = Yup.object().shape(LoginFormScheme);
export const RegisterFormValidation = Yup.object().shape(RegisterFormSchema);
export const ForgotPasswordValidation = Yup.object().shape(ForgotPasswordScheme);
export const ResetPasswordValidation = Yup.object().shape(ResetPasswordScheme);
