import React, { ReactElement } from 'react';
import { View } from 'react-native';
import { AddressForm, AddressFormValues } from './components/address-form';
import { StepComponentProps } from '../../step';

export const Address = ({ onSelect, payload }: StepComponentProps): ReactElement => {
  const handleSave = ({
    street,
    streetNumber,
    placeType,
    region,
    commune,
    postalCode,
  }: AddressFormValues): void => {
    onSelect({
      street,
      number: streetNumber ?? null,
      unit: placeType,
      region,
      commune,
      country: 'chile',
      postalcode: postalCode ?? null,
      lat: '',
      lng: '',
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <AddressForm onSave={handleSave} accommodationFeatures={payload} />
    </View>
  );
};
