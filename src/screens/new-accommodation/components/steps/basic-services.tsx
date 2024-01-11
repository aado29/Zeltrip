import React, { ReactElement, useState } from 'react';
import { View } from 'react-native';
import { Text } from '../../../../shared/components/text';
import { Button } from '../../../../shared/components/button';
import { CheckboxGroup, CheckboxItem } from '../../../../shared/components/checkbox';
import { StepComponentProps } from '../step';

export const BasicServices = ({
  onSelect,
  payload,
  meta,
  isLoading,
}: StepComponentProps): ReactElement => {
  const [basicServices, setBasicServices] = useState<number[]>(
    payload?.basicServices ? payload?.basicServices.map((bs) => bs.id) : []
  );

  const isDisabled = false;

  const handleSelect = (): void => {
    if (isDisabled) {
      return;
    }

    onSelect({
      basic_services: basicServices.map((id) => ({
        id,
      })),
    });
  };

  const options: CheckboxItem[] = (meta.basicServices ?? []).map(({ id, name, icon }) => ({
    id,
    label: name,
    icon,
  }));

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 16 }}>
          <Text variant="subtile" style={{ fontWeight: '700', marginBottom: 24, marginTop: 16 }}>
            Servicios básicos
          </Text>
        </View>
        <CheckboxGroup
          limit={5}
          value={basicServices}
          options={options}
          onChange={setBasicServices}
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
