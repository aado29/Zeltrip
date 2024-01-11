import { MaterialIcons } from '@expo/vector-icons';
import React, { ReactElement } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../theme';
import { Icon, IconName } from '../icons';
import { Text } from '../text';

export const Checkbox = ({
  icon,
  label,
  value,
  isSelected,
  hintText,
  onChange,
}: {
  icon: IconName;
  label: string;
  value: string | number;
  isSelected: boolean;
  hintText?: string;
  onChange: (value: string | number) => void;
}): ReactElement => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={(): void => onChange(value)}
      accessible
      accessibilityLabel={label}
      accessibilityHint={hintText}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 16,
          backgroundColor: isSelected ? colors.blue[200] : undefined,
        }}
      >
        <Icon name={icon} size={24} isActive={isSelected} />
        <View style={{ flex: 1, paddingHorizontal: 8 }}>
          <Text variant="paragraph">{label}</Text>
        </View>
        <MaterialIcons
          name={isSelected ? 'check-box' : 'check-box-outline-blank'}
          color={isSelected ? colors.pink[500] : colors.blue[700]}
          size={24}
        />
      </View>
    </TouchableOpacity>
  );
};
