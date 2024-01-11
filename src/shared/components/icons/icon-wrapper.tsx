import React, { ReactElement } from 'react';
import { View } from 'react-native';
import { Icon, IconProps } from '.';
import { useTheme } from '../../../theme';

type size = 'md' | 'lg';

interface IconWrapperProps extends Omit<IconProps, 'size'> {
  size?: size;
}

export const IconWrapper = ({
  name,
  isActive = false,
  size = 'md',
}: IconWrapperProps): ReactElement => {
  const { colors, borderRadius } = useTheme();

  const sizes: Record<size, { wrap: number; icon: IconProps['size'] }> = {
    md: {
      wrap: 40,
      icon: 24,
    },
    lg: {
      wrap: 64,
      icon: 48,
    },
  };

  const s = sizes[size];

  return (
    <View
      style={{
        width: s.wrap,
        height: s.wrap,
        borderRadius: borderRadius.sm,
        backgroundColor: colors.gray['300'],
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon name={name} size={s.icon} isActive={isActive} />
    </View>
  );
};

export default IconWrapper;
