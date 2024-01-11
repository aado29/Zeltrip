import React, { ReactElement, useState } from 'react';
import { View } from 'react-native';
import { Text } from '../../../../shared/components/text';
import { Button } from '../../../../shared/components/button';
import { CheckboxGroup } from '../../../../shared/components/checkbox';
import { StepComponentProps } from '../step';

export const AirConditioningService = ({
  onSelect,
  meta,
  payload,
  isLoading,
}: StepComponentProps): ReactElement => {
  const [airConditioning, setAirConditioning] = useState<number[]>(
    payload.airConditioning ? payload.airConditioning.map((a) => a.id) : []
  );

  const isDisabled = false;

  const handleSelect = (): void => {
    if (isDisabled) {
      return;
    }

    onSelect({ air_conditioning: airConditioning.map((a) => ({ id: a })) });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 16 }}>
          <Text variant="subtile" style={{ fontWeight: '700', marginBottom: 24, marginTop: 16 }}>
            Climatización
          </Text>
        </View>
        <CheckboxGroup
          value={airConditioning}
          options={(meta.airConditioning ?? []).map((a) => ({
            id: a.id,
            label: a.name,
            icon: a.icon,
          }))}
          onChange={setAirConditioning}
        />
      </View>
      <View style={{ paddingHorizontal: 16 }}>
        <Button onPress={handleSelect} disabled={isDisabled || isLoading}>
          {isLoading ? 'Cargando' : 'Siguiente'}
        </Button>
      </View>
    </View>
  );
};
