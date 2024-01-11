/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import React, { ReactElement, memo } from 'react';
// import { FormikProps } from 'formik';
import { Input } from './input';
import { InputProps } from './input.types';

interface InputContainerProps<T> extends Partial<InputProps> {
  name: keyof T;
  // context: FormikProps<T>;
}

export const InputContainer = <T extends unknown>({
  name,
  // context: { errors, handleBlur, handleChange, values, touched },
  ...props
}: InputContainerProps<T>): ReactElement => {
  return (
    <></>
    // <Input
    //   error={(!!errors[name] && touched[name]) as boolean}
    //   size="lg"
    //   value={values[name]}
    //   onChangeText={handleChange(name)}
    //   onBlur={handleBlur(name) as undefined}
    //   message={(errors[name] && touched[name] ? errors[name] : '') as undefined}
    //   overwriteStyles={{
    //     messageStyles: { textAlign: 'right', width: '100%' },
    //   }}
    //   {...props}
    // />
  );
};

export default InputContainer;
