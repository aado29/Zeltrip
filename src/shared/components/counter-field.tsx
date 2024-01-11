import React, { ReactElement } from 'react';
import { View } from 'react-native';
import { Button } from './button';
import { Icon } from './icons';
import { Text } from './text';

interface CounterFieldProps {
  title: string;
  subtitle?: string;
  value: number;
  onChange: (count: number) => void;
}

export const CounterField = ({
  title,
  subtitle,
  value,
  onChange,
}: CounterFieldProps): ReactElement => {
  return (
    <View style={{ flexDirection: 'row', height: 60, alignItems: 'center', paddingHorizontal: 16 }}>
      <View style={{ flexGrow: 1 }}>
        <Text variant="paragraph" style={{ fontWeight: '700' }}>
          {title}
        </Text>
        {subtitle ? (
          <Text variant="smallparagraph" color={['blue', '500']}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Button
          onPress={(): void => onChange(value - 1)}
          disabled={value < 1}
          kind="outline"
          size="small"
        >
          <Icon name="minus" />
        </Button>
        <View
          style={{ width: 25, justifyContent: 'center', alignItems: 'center', marginHorizontal: 8 }}
        >
          <Text variant="paragraph" color={['blue', '500']}>
            {String(value)}
          </Text>
        </View>
        <Button onPress={(): void => onChange(value + 1)} kind="outline" size="small">
          <Icon name="plus" />
        </Button>
      </View>
    </View>
  );
};
