/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { ScrollView, View, ScrollViewProps } from 'react-native';
import { ListItem, ListItemProps } from './list-item';

interface ListProps {
  value?: number | string;
  options: Partial<ListItemProps>[];
  isDeep?: boolean;
  onChange: (id: string | number | undefined) => void;
  scrollViewProps?: ScrollViewProps;
}

export const List = ({
  value,
  options,
  isDeep = false,
  onChange,
  scrollViewProps,
}: ListProps): JSX.Element => {
  const getSubtitle = (
    _isDeep: boolean,
    subtitle?: string,
    children?: ListItemProps['children'],
  ) => {
    if (!_isDeep) {
      return subtitle;
    }

    return children?.find((c: ListItemProps): boolean => c.id === value)?.title;
  };

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <ScrollView {...scrollViewProps}>
      {options.map(({ id, icon, title, subtitle, children }: Partial<ListItemProps>) => (
        <View key={id} style={{ marginBottom: 16 }}>
          <ListItem
            id={id}
            icon={icon}
            title={title}
            subtitle={getSubtitle(isDeep, subtitle, children)}
            value={value}
            isActive={children?.some((c: ListItemProps) => c.id === value) || id === value}
            onPress={(currentId: number | string) =>
              value === id ? onChange(undefined) : onChange(currentId as number)
            }
          >
            {children}
          </ListItem>
        </View>
      ))}
    </ScrollView>
  );
};

export default List;
