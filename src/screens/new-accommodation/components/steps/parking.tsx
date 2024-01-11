import React, { ReactElement, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { RadioGroup, RadioItem } from '../../../../shared/components/radio';
import { CounterField } from '../../../../shared/components/counter-field';
import { Button } from '../../../../shared/components/button';
import { Text } from '../../../../shared/components/text';
import { StepComponentProps } from '../step';

export const Parking = ({
  onSelect,
  meta,
  payload,
  isLoading,
}: StepComponentProps): ReactElement => {
  const [parkingCount, setParkingCount] = useState(payload.parkingCount ?? 0);
  const [parkingType, setParkingType] = useState(payload.parkingType?.id);

  const isDisabled = false;

  const options: RadioItem[] = (meta.parkingTypes ?? []).map(({ id, name }) => ({
    id,
    label: name,
  }));

  const handleSelect = () => {
    if (!parkingType) {
      return;
    }

    onSelect({
      parking_count: parkingCount,
      parking_type: {
        id: parkingType,
      },
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 16 }}>
          <Text variant="subtile" style={{ fontWeight: '700', marginBottom: 24, marginTop: 16 }}>
            Estacionamiento
          </Text>
        </View>

        <View style={{ marginBottom: 8 }}>
          <CounterField title="Estacionamientos" value={parkingCount} onChange={setParkingCount} />
        </View>

        <View style={{ marginBottom: 8 }}>
          <RadioGroup
            withScroll={false}
            title="Ubicación del estacionamiento"
            value={parkingType}
            options={options}
            onChange={setParkingType}
          />
        </View>
      </ScrollView>
      <View style={{ paddingHorizontal: 16 }}>
        <Button onPress={handleSelect} disabled={isDisabled || isLoading}>
          {isLoading ? 'Cargando' : 'Siguiente'}
        </Button>
      </View>
    </View>
  );
};
