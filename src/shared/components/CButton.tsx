/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Text, TouchableOpacity, Image, ImageSourcePropType, StyleProp } from 'react-native';
import { colors } from '../styles';

interface CButtonProps {
  onPress?: () => void;
  title: string;
  leftIcon?: ImageSourcePropType;
  rightIcon?: ImageSourcePropType;
  style?: StyleProp<any>;
  textStyle?: StyleProp<any>;
  disabled?: boolean;
}

const CButton = ({
  onPress,
  title,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  disabled,
}: CButtonProps): JSX.Element => {
  const styles = [
    {
      flexDirection: 'row',
      backgroundColor: disabled ? colors['primary-disabled'] : colors.primary,
      height: 48,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
    },
    style,
  ];

  return (
    <TouchableOpacity onPress={onPress} style={styles} disabled={disabled}>
      <Image
        source={leftIcon}
        style={{ height: 24, position: 'absolute', left: 0 }}
        resizeMode="contain"
      />
      <Text style={[{ color: 'white', padding: 5, fontSize: 16 }, textStyle]}>{title}</Text>
      <Image
        source={rightIcon}
        style={{ height: 24, position: 'absolute', right: 0 }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default CButton;
