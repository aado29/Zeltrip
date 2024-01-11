import React, { ReactElement, useState } from 'react';
import { View } from 'react-native';
import { Text } from '../../../../shared/components/text';
import { List } from '../../../../shared/components/list';
import { ListItemProps } from '../../../../shared/components/list/list-item';
import { Button } from '../../../../shared/components/button';
import { StepComponentProps } from '../step';

export const PrivacyType = ({
  onSelect,
  meta,
  payload,
  isLoading,
}: StepComponentProps): ReactElement => {
  const [selectedId, setSelectedId] = useState<number | undefined>(payload.privacyType?.id);

  const handleSelect = (): void => {
    if (!selectedId) {
      return;
    }

    onSelect({ privacy_type: { id: selectedId } });
  };

  const options: ListItemProps[] = (meta.privacyTypes ?? []).map(({ id, icon, name }) => ({
    id,
    icon,
    title: name,
  }));

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <Text variant="subtile" style={{ fontWeight: '700', marginBottom: 24, marginTop: 16 }}>
          Tipo de alojamiento
        </Text>
        <List
          options={options}
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

export default PrivacyType;
