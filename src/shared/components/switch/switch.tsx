import React, { ReactElement } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../theme';

export const Switch = ({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (value: boolean) => void;
}): ReactElement => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={() => onChange(!value)}
      style={{ height: 40, display: 'flex', justifyContent: 'center' }}
    >
      <View
        style={{
          position: 'relative',
          width: 34,
          height: 14,
          borderRadius: 7,
          backgroundColor: colors.pink['950'],
          opacity: value ? 1 : 0.5,
        }}
      >
        <View
          style={{
            position: 'absolute',
            top: -3,
            right: value ? 0 : undefined,
            height: 20,
            width: 20,
            backgroundColor: value ? colors.pink['450'] : 'pink',
            borderRadius: 10,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};
