import React, { ReactElement, useState } from 'react';
import { View } from 'react-native';
import { Text } from '../../../../shared/components/text';
import { List } from '../../../../shared/components/list';
import { ListItemProps } from '../../../../shared/components/list/list-item';
import { Button } from '../../../../shared/components/button';
import { StepComponentProps } from '../step';

export const ServiceCategory = ({
  onSelect,
  meta,
  payload,
  isLoading,
}: StepComponentProps): ReactElement => {
  const [selectedId, setSelectedId] = useState<number | undefined>(payload.category?.id);

  const handleSelect = (): void => {
    if (!selectedId) {
      return;
    }

    onSelect({
      category: {
        id: selectedId,
      },
    });
  };

  const options: ListItemProps[] = (meta.categories ?? []).map((category) => ({
    id: category.id,
    icon: category.icon,
    title: category.name,
    subtitle: category.description,
  }));

  // const options: ListItemProps[] = [
  //   { id: 1, icon: 'cabin', title: 'Cabaña', subtitle: 'Sitios y lugares para acampar.' },
  //   { id: 2, icon: 'dome', title: 'Domo', subtitle: 'Sitios para Motorhome, Autocaravanas, etc.' },
  //   { id: 3, icon: 'bungalow', title: 'Bungalow', subtitle: 'Cabañas, Glamping, Andohotel, etc.' },
  //   { id: 4, icon: 'tent', title: 'Tienda', subtitle: 'Cabañas, Glamping, Andohotel, etc.' },
  //   {
  //     id: 5,
  //     icon: 'andohotel',
  //     title: 'Ando hotel',
  //     subtitle: 'Cabañas, Glamping, Andohotel, etc.',
  //   },
  //   {
  //     id: 6,
  //     icon: 'exotic',
  //     title: 'Exóticos',
  //     subtitle: 'Cabañas, Glamping, Andohotel, etc.',
  //     children: [
  //       { id: 7, title: 'Barco', subtitle: 'Cabañas, Glamping, Andohotel, etc.' },
  //       { id: 8, title: 'Burbuja', subtitle: 'Cabañas, Glamping, Andohotel, etc.' },
  //       { id: 9, title: 'Carpa en Suspención', subtitle: 'Cabañas, Glamping, Andohotel, etc.' },
  //       { id: 10, title: 'Casa Árbol', subtitle: 'Cabañas, Glamping, Andohotel, etc.' },
  //       { id: 11, title: 'Casa Rondante Fija', subtitle: 'Cabañas, Glamping, Andohotel, etc.' },
  //       { id: 12, title: 'Contenedor', subtitle: 'Cabañas, Glamping, Andohotel, etc.' },
  //       { id: 13, title: 'Cueva', subtitle: 'Cabañas, Glamping, Andohotel, etc.' },
  //       { id: 14, title: 'Flotante sobre Agua', subtitle: 'Cabañas, Glamping, Andohotel, etc.' },
  //       { id: 15, title: 'Tiny House', subtitle: 'Cabañas, Glamping, Andohotel, etc.' },
  //       { id: 16, title: 'Otros', subtitle: 'Cabañas, Glamping, Andohotel, etc.' },
  //     ],
  //   },
  // ];

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text
          variant="subtile"
          style={{ fontWeight: '700', marginBottom: 24, marginTop: 16, paddingHorizontal: 16 }}
        >
          Selecciona la categoría
        </Text>
        <List
          isDeep
          options={options}
          value={selectedId}
          onChange={(id: number | string | undefined) => setSelectedId(id as number)}
          scrollViewProps={{ style: { paddingHorizontal: 16 } }}
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

export default ServiceCategory;
