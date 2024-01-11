import React, { ReactElement, ReactNode, useCallback, useMemo, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { IconName } from '../icons';
import { Text } from '../text';
import { Checkbox } from './checkbox';

interface RadioItem {
  id: number | string;
  label: string;
}

export interface CheckboxItem extends RadioItem {
  icon: IconName;
}

export const CheckboxGroup = ({
  limit,
  withScroll = true,
  title,
  value,
  options,
  onChange,
}: {
  limit?: number;
  withScroll?: boolean;
  title?: string;
  value: (string | number)[];
  options: CheckboxItem[];
  onChange: (value: (string | number)[]) => void;
}): ReactElement => {
  const [isFiltered, setIsFiltered] = useState(false);

  const onPressItem = useCallback(
    (id: number | string): void => {
      if (!value.includes(id)) {
        onChange(value.concat(id));
      } else {
        onChange(value.filter((i) => i !== id));
      }
    },
    [value, onChange]
  );

  const list = useMemo(() => {
    const showFilter = limit && limit < options.length;

    const o = !showFilter || isFiltered ? options : options.filter((_, i) => i < (limit ?? 0));

    return o
      .map(({ id, icon, label }) => (
        <Checkbox
          key={id}
          label={label}
          value={id}
          icon={icon}
          isSelected={value.includes(id)}
          onChange={() => onPressItem(id)}
          hintText={title}
        />
      ))
      .concat(
        showFilter ? (
          <TouchableOpacity
            key="filter-button"
            onPress={() => setIsFiltered((v) => !v)}
            style={{
              height: 48,
              flexDirection: 'row',
              paddingHorizontal: 16,
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <Text
              variant="paragraph"
              style={{
                fontWeight: '700',
                textDecorationStyle: 'double',
                textDecorationLine: 'underline',
              }}
            >
              {!isFiltered ? 'Ver más' : 'Ver menos'}
            </Text>
            <AntDesign name={isFiltered ? 'minus' : 'plus'} size={20} />
          </TouchableOpacity>
        ) : (
          []
        )
      );
  }, [title, options, value, limit, onPressItem, setIsFiltered, isFiltered]);

  const heading: ReactNode = title ? (
    <View style={{ paddingHorizontal: 16, height: 56, alignItems: 'center', flexDirection: 'row' }}>
      <Text variant="paragraph" style={{ fontWeight: '700' }}>
        {title}
      </Text>
    </View>
  ) : null;

  return !withScroll ? (
    <View style={{ flex: 1 }}>
      {heading}
      {list}
    </View>
  ) : (
    <ScrollView style={{ flex: 1 }}>
      {heading}
      {list}
    </ScrollView>
  );
};
