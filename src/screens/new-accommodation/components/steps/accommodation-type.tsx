import React, { ReactElement, useState } from 'react';
import { View } from 'react-native';
import { useAccommodationTypes } from '../../../../api-queries/queries/accommodation.query';
import { Text } from '../../../../shared/components/text';
import { List } from '../../../../shared/components/list';
import { ListItemProps } from '../../../../shared/components/list/list-item';
import { Button } from '../../../../shared/components/button';

export interface AccommodationTypeProps {
  onSelect: (type: 'accommodation-type', payload: { id: number }) => void;
}

export const AccommodationType = ({ onSelect }: AccommodationTypeProps): ReactElement => {
  const [selectedId, setSelectedId] = useState<number | undefined>();

  const { data = [], isLoading } = useAccommodationTypes();

  const options = data.map<ListItemProps>(({ id, icon, name }) => ({
    id,
    icon,
    title: name,
    subtitle: 'Lorem Ipsum',
  }));

  const isDisabled = isLoading || !selectedId;

  const handleSelect = (): void => {
    if (selectedId) {
      onSelect('accommodation-type', { id: selectedId });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {!isLoading ? (
        <View style={{ flex: 1, paddingHorizontal: 16 }}>
          <Text variant="subtile" style={{ fontWeight: '700', marginBottom: 24, marginTop: 16 }}>
            Tipo de servicio
          </Text>
          <List
            options={options}
            value={selectedId}
            onChange={(id: number | string | undefined) => setSelectedId(id as number)}
          />
        </View>
      ) : null}
      {isLoading ? (
        <View
          style={{ flex: 1, paddingHorizontal: 16, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text variant="paragraph">Cargando...</Text>
        </View>
      ) : null}
      <View style={{ paddingHorizontal: 16 }}>
        <Button onPress={handleSelect} disabled={isDisabled} kind="primary">
          Siguiente
        </Button>
      </View>
    </View>
  );
};
