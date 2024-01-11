import React, { useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import { Icon, IconProps } from '../../../../../shared/components/icons';
import { ListItem, ListItemProps } from '../../../../../shared/components/list';

export const BedList = ({
  selectedBeds,
  beds,
  bedTypes,
  onChangeBeds,
}: {
  selectedBeds: Record<number, number>;
  beds: ListItemProps[];
  bedTypes: ListItemProps[];
  onChangeBeds: (selectedBeds: Record<number, number>) => void;
}): JSX.Element => {
  const handleSelect = (indexBed: number, idBed: number) => {
    const newSelectedBeds = { ...selectedBeds };
    newSelectedBeds[indexBed] = idBed;
    onChangeBeds(newSelectedBeds);
  };

  const getIsActive = (indexBed: number): boolean =>
    Object.keys(selectedBeds).includes(String(indexBed));

  const getTitle = (indexBed: number) => {
    return bedTypes.find((type) => type.id === selectedBeds[indexBed])?.title;
  };

  const endEnhancer = useCallback(
    ({ size }: Partial<IconProps>) => <Icon name="edit" size={size} />,
    []
  );

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <ScrollView style={{ paddingHorizontal: 16 }}>
      {beds.map(({ icon, title }: Partial<ListItemProps>, index: number) => (
        // eslint-disable-next-line react/no-array-index-key
        <View key={index} style={{ marginBottom: 16 }}>
          <ListItem
            id={index}
            icon={icon}
            endEnhancer={endEnhancer}
            title={!getIsActive(index) ? title : getTitle(index)}
            value={selectedBeds[index]}
            isActive={getIsActive(index)}
            onPress={(currentId: number | string) => handleSelect(index, currentId as string)}
          >
            {bedTypes}
          </ListItem>
        </View>
      ))}
    </ScrollView>
  );
};

export default BedList;
