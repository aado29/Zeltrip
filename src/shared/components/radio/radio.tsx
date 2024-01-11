import React, { ReactElement } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../theme';
import { Text } from '../text';

interface RadioProps {
  label: string;
  value: number | string;
  isSelected: boolean;
  onChange: (value: number | string) => void;
}

export const Radio = ({ label, value, isSelected, onChange }: RadioProps): ReactElement => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity onPress={(): void => onChange(value)}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 12,
          backgroundColor: isSelected ? colors.blue[200] : undefined,
        }}
      >
        <View style={{ marginRight: 8 }}>
          <MaterialIcons
            name={isSelected ? 'radio-button-on' : 'radio-button-off'}
            color={isSelected ? colors.pink[500] : colors.blue[700]}
            size={24}
          />
        </View>
        <Text variant="paragraph" style={{ color: !isSelected ? colors.blue['500'] : undefined }}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
