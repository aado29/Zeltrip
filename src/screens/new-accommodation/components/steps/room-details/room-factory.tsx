import React, { ReactElement, useEffect, useState } from 'react';
import { View, SafeAreaView, TouchableOpacity, Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { ListItemProps } from '../../../../../shared/components/list';
import { Button } from '../../../../../shared/components/button';
import { CounterField } from '../../../../../shared/components/counter-field';
import { Text } from '../../../../../shared/components/text';
import BedList from './bed-list';
import { useTheme } from '../../../../../theme';

export const RoomFactory = ({
  id,
  initialValue,
  bedTypes,
  onClose,
  onSave,
}: {
  id: number;
  initialValue?: number[];
  bedTypes: ListItemProps[];
  onClose: () => void;
  onSave: (beds: number[]) => void;
}): ReactElement => {
  const { colors } = useTheme();
  const [beds, setBeds] = useState<ListItemProps[]>([]);
  const [selectedBeds, setSelectedBeds] = useState<Record<number, number>>({});

  const addBedSlot = (): void => {
    setBeds(
      beds.concat({
        icon: 'bed',
        title: `Selecciona tipo de cama #${beds.length + 1}`,
      })
    );
  };

  const removeBedSlot = (): void => {
    const currentBeds = [...beds];
    const lastBedIndex = currentBeds.length - 1;
    if (Object.keys(selectedBeds).includes(String(lastBedIndex))) {
      const newSelectedBeds = { ...selectedBeds };
      delete newSelectedBeds[lastBedIndex];
      setSelectedBeds(newSelectedBeds);
    }

    currentBeds.pop();
    setBeds(currentBeds);
  };

  const handleUpdateBeds = (count: number): void => {
    if (beds.length < count) {
      addBedSlot();
    } else {
      removeBedSlot();
    }
  };

  const handleSave = (): void => onSave(Object.values(selectedBeds).filter((bedId) => bedId));

  useEffect(() => {
    if (!initialValue?.length) {
      return;
    }

    const slots: ListItemProps[] = Array.from({ length: initialValue.length }, (_, i) => ({
      icon: 'bed',
      title: `Selecciona tipo de cama #${i + 1}`,
    }));

    setBeds((_beds) => [..._beds, ...slots]);

    const newSelectedBeds = initialValue.reduce((acc, val, index) => {
      acc[index] = val;
      return acc;
    }, {} as Record<number, number>);

    setSelectedBeds(newSelectedBeds);
  }, [initialValue]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        paddingTop: Platform.OS !== 'ios' ? 24 : undefined,
        paddingBottom: Platform.OS !== 'ios' ? 16 : undefined,
      }}
    >
      <View style={{ flex: 1 }}>
        <View style={{ height: 44, justifyContent: 'center', paddingHorizontal: 16 }}>
          <TouchableOpacity onPress={() => onClose()}>
            <AntDesign name="close" size={24} color={colors.blue['500']} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            variant="subtile"
            style={{ fontWeight: '700', marginBottom: 24, marginTop: 16, paddingHorizontal: 16 }}
          >
            {`Habitación #${id}`}
          </Text>
          <View style={{ marginBottom: 16 }}>
            <CounterField
              title="Camas disponibles"
              value={beds.length}
              onChange={handleUpdateBeds}
            />
          </View>
          <BedList
            beds={beds}
            bedTypes={bedTypes}
            selectedBeds={selectedBeds}
            onChangeBeds={setSelectedBeds}
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row', paddingHorizontal: 16 }}>
        <Button kind="outline" onPress={(): void => onClose()}>
          Volver
        </Button>
        <View style={{ flexGrow: 1, marginLeft: 16 }}>
          <Button
            kind="primary"
            disabled={Object.values(selectedBeds).length < 1}
            onPress={handleSave}
          >
            Guardar
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RoomFactory;
