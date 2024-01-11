import React, { ReactElement } from 'react';
import { View } from 'react-native';
import { AccommodationStepName } from 'interfaces/accommodation';
import { Text } from '../../../../shared/components/text';
import { Button } from '../../../../shared/components/button';
import { StepComponentProps } from '../step';

export const NoDefined = ({
  onSelect,
  payload,
  meta,
  name,
}: StepComponentProps & { name: AccommodationStepName }): ReactElement => {
  const handleSelect = (): void => {
    const mapPayload: Record<AccommodationStepName, any> = {
      accommodation_type: {
        accommodation_type: undefined,
      },
      address: {
        street: null,
        number: null,
        unit: null,
        region: null,
        commune: null,
        country: null,
        postalcode: null,
        lat: null,
        lng: null,
      },
      plot_size: {
        size_in_square_meters: 0,
      },
      sanitary_service: {
        bathrooms: 0,
        shower: 0,
        bathrooms_type: { id: 3 },
        shower_type: { id: 5 },
        shower_type_other: { id: 7 },
        shower_type_water: { id: 9 },
      },
    };

    onSelect(mapPayload[name], name);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text
          variant="subtile"
          style={{ fontWeight: '700', marginBottom: 24, marginTop: 16, paddingHorizontal: 16 }}
        >
          No definido - {name}
        </Text>
        <Text
          variant="smallparagraph"
          style={{ marginBottom: 20, marginTop: 20, paddingHorizontal: 16 }}
        >
          PAYLOAD:
          {JSON.stringify(payload)}
          {'\n\n'}
          META:
          {JSON.stringify(meta)}
        </Text>
      </View>
      <View style={{ paddingHorizontal: 16 }}>
        <Button onPress={handleSelect}>Siguiente</Button>
      </View>
    </View>
  );
};

export default NoDefined;
