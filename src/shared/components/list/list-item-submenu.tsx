import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { TouchableHighlight, View } from 'react-native';
import { SwipeablePanel } from '../swipeable-panel';
import { useTheme } from '../../../theme';
import { Button } from '../button';
import { Text } from '../text';
import { ListItemProps } from './list-item';

interface ListItemSubmenuProps {
  isActive: boolean;
  value?: number | string;
  title: string;
  items: ListItemProps[];
  onClose: () => void;
  onChange: (id: number | string) => void;
}

export const ListItemSubmenu = ({
  isActive,
  value,
  title,
  items,
  onChange,
  onClose,
}: ListItemSubmenuProps) => {
  const [selectedId, setSelectedId] = useState<number | string | undefined>(value);
  const { colors } = useTheme();

  useEffect(() => {
    if (isActive) {
      setSelectedId(value);
    }
  }, [isActive, value]);

  return (
    <SwipeablePanel isActive={isActive} title={title} onClose={onClose}>
      <View>
        {items.map(({ id, title: itemTitle }: Omit<ListItemProps, 'children'>) => {
          return (
            <TouchableHighlight
              key={id}
              onPress={id ? (): void => setSelectedId(id) : undefined}
              underlayColor="tranparent"
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: selectedId === id ? colors.blue[200] : undefined,
                  paddingHorizontal: 16,
                  paddingVertical: 6,
                }}
              >
                <Text
                  variant="paragraph"
                  color={selectedId === id ? colors.blue[700] : colors.blue[500]}
                >
                  {itemTitle}
                </Text>
                <MaterialIcons
                  name={selectedId === id ? 'radio-button-on' : 'radio-button-off'}
                  color={selectedId === id ? colors.pink[500] : colors.blue[700]}
                  size={24}
                />
              </View>
            </TouchableHighlight>
          );
        })}
      </View>
      <View style={{ padding: 16 }}>
        <Button
          disabled={!selectedId}
          onPress={selectedId ? () => onChange(selectedId) : undefined}
        >
          Guardar
        </Button>
      </View>
    </SwipeablePanel>
  );
};

export default ListItemSubmenu;
