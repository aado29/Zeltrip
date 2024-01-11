import React, { ReactElement, useMemo } from 'react';
import { StyleProp, TextStyle, View } from 'react-native';
import { useTheme } from '../../../theme';
import { Icon, IconName } from '../icons';
import { Text } from '../text';
import { Switch } from './switch';

export const SwitchLayout = ({
  icon,
  title,
  subtitle,
  value,
  onChange,
}: {
  icon?: IconName;
  title: string;
  subtitle?: string;
  value: boolean;
  onChange: (value: boolean) => void;
}): ReactElement => {
  const { colors } = useTheme();

  const titleStyle = useMemo(
    () =>
      ({
        fontWeight: '700',
        color: colors.blue[value ? 700 : 500],
      } as StyleProp<TextStyle>),
    [colors, value]
  );

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,
        backgroundColor: value ? colors.blue['200'] : undefined,
        paddingHorizontal: 16,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', flexGrow: 1 }}>
        {icon ? (
          <View style={{ paddingRight: 8 }}>
            <Icon name={icon} isActive={value} />
          </View>
        ) : null}
        <View>
          <Text variant="paragraph" style={titleStyle} color={['blue', '500']}>
            {title}
          </Text>
          {subtitle ? (
            <Text variant="smallparagraph" color={['blue', '500']}>
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>
      <View style={{ flexShrink: 0 }}>
        <Switch value={value} onChange={onChange} />
      </View>
    </View>
  );
};
