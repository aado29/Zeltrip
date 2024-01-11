import React, { ReactElement } from 'react';
// import * as yup from 'yup';
// import { Formik, FormikProps } from 'formik';
import { View } from 'react-native';
// import { Input } from '../../../../../../shared/components/input';
import { AccommodationFeatures } from '@/interfaces/accommodation';
import { Button } from '@/shared/components/button';
import CInput from '@/shared/components/CInput';

export interface AddressFormValues {
  street: string;
  streetNumber?: number;
  placeType: string;
  region: string;
  commune: string;
  postalCode?: number;
}

// const addressValidationSchema = yup.object().shape({
//   street: yup.string().label('Calle').required('Es obligatorio'),
// });

export const AddressForm = ({
  accommodationFeatures: { street, streetNumber, unit, postalCode },
  onSave,
}: {
  accommodationFeatures: AccommodationFeatures;
  onSave: (value: AddressFormValues) => void;
}): ReactElement => {
  const initialValues: AddressFormValues = {
    street: street || '',
    streetNumber: streetNumber ? Number(streetNumber) : undefined,
    placeType: unit || '',
    region: '',
    commune: '',
    postalCode: Number(postalCode) || undefined,
  };

  const handleSubmitForm = (values: AddressFormValues): void => {
    onSave(values);
  };

  return (
    <></>
    // <Formik
    //   onSubmit={handleSubmitForm}
    //   initialValues={initialValues}
    //   validationSchema={addressValidationSchema}
    // >
    //   {({
    //     errors,
    //     handleChange,
    //     handleSubmit,
    //     values,
    //     touched,
    //     isValid,
    //   }: FormikProps<AddressFormValues>) => (
    //     <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 16, paddingVertical: 32 }}>
    //       <CInput
    //         label="Calle"
    //         onChangeText={handleChange('street')}
    //         value={values.street}
    //         error={!!errors.street && touched.street}
    //         message={errors.street && touched.street ? errors.street : ''}
    //         style={{ marginBottom: 32 }}
    //       />

    //       <CInput
    //         label="Numero de calle"
    //         onChangeText={handleChange('streetNumber')}
    //         value={String(values.streetNumber ?? '')}
    //         error={!!errors.streetNumber && touched.streetNumber}
    //         message={errors.streetNumber && touched.streetNumber ? errors.streetNumber : ''}
    //         style={{ marginBottom: 32 }}
    //       />

    //       <CInput
    //         label="Dpto / Casa / Oficina / Condominio *"
    //         onChangeText={handleChange('placeType')}
    //         value={values.placeType}
    //         error={!!errors.placeType && touched.placeType}
    //         message={errors.placeType && touched.placeType ? errors.placeType : ''}
    //       />

    //       <CInput
    //         label="Código postal"
    //         onChangeText={handleChange('postalCode')}
    //         value={String(values.postalCode ?? '')}
    //         error={!!errors.postalCode && touched.postalCode}
    //         message={errors.postalCode && touched.postalCode ? errors.postalCode : ''}
    //       />

    //       <Button
    //         rootStyle={{ width: '100%', marginTop: 32 }}
    //         disabled={!isValid}
    //         onPress={handleSubmit}
    //       >
    //         Guardar
    //       </Button>
    //     </View>
    //   )}
    // </Formik>
  );
};
