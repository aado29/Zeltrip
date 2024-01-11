import React, { ReactElement, useState } from 'react';
import { View } from 'react-native';
import { Text } from '../../../../shared/components/text';
import { Button } from '../../../../shared/components/button';
import { CheckboxGroup, CheckboxItem } from '../../../../shared/components/checkbox';
import { StepComponentProps } from '../step';

export const FacilitiesInformation = ({
  onSelect,
  meta,
  payload,
  isLoading,
}: StepComponentProps): ReactElement => {
  const [facilities, setFacilities] = useState<number[]>(
    payload.facilities ? payload.facilities.map((f) => f.id) : []
  );

  const isDisabled = false;

  const handleSelect = (): void => {
    if (isDisabled) {
      return;
    }

    onSelect({
      facilities: facilities.map((id) => ({ id })),
    });
  };

  const options: CheckboxItem[] = (meta.facilities ?? []).map(({ icon, id, name }) => ({
    icon,
    id,
    label: name,
  }));

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 16 }}>
          <Text variant="subtile" style={{ fontWeight: '700', marginBottom: 24, marginTop: 16 }}>
            Instalaciones
          </Text>
        </View>
        <CheckboxGroup limit={5} value={facilities} options={options} onChange={setFacilities} />
      </View>
      <View style={{ paddingHorizontal: 16 }}>
        <Button onPress={handleSelect} disabled={isDisabled || isLoading}>
          {isLoading ? 'Cargando' : 'Siguiente'}
        </Button>
      </View>
    </View>
  );
};
