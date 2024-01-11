import React, { ReactElement, useState } from 'react';
import { View } from 'react-native';
import { Text } from '../../../../shared/components/text';
import { List } from '../../../../shared/components/list';
import { Button } from '../../../../shared/components/button';
import { StepComponentProps } from '../step';

export const HostingType = ({
  onSelect,
  meta,
  payload,
  isLoading,
}: StepComponentProps): ReactElement => {
  const [selectedId, setSelectedId] = useState<number | undefined>(payload.hostingType?.id);

  const handleSelect = (): void => {
    if (!selectedId) {
      return;
    }

    onSelect({ hosting_type: { id: selectedId } });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <Text variant="subtile" style={{ fontWeight: '700', marginBottom: 24, marginTop: 16 }}>
          Tipo de alojamiento
        </Text>
        <List
          options={(meta.hostingTypes ?? []).map(({ id, icon, name, description }) => ({
            id,
            icon,
            title: name,
            subtitle: description,
          }))}
          value={selectedId}
          onChange={(id: number | string | undefined) => setSelectedId(id as number)}
        />
      </View>
      <View style={{ paddingHorizontal: 16 }}>
        <Button onPress={handleSelect} disabled={!selectedId || isLoading}>
          {isLoading ? 'Cargando' : 'Siguiente'}
        </Button>
      </View>
    </View>
  );
};

export default HostingType;
