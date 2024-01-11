import React, { ReactElement } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Icon, IconName } from '../../../../../shared/components/icons';
import { Text } from '../../../../../shared/components/text';

export const Tag = ({
  name,
  icon,
  overwriteStyles,
}: {
  name: string;
  icon?: IconName;
  overwriteStyles?: {
    rootStyles?: StyleProp<ViewStyle>;
    iconStyles?: { color: string };
  };
}): ReactElement => {
  return (
    <View
      style={{
        ...overwriteStyles?.rootStyles,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: overwriteStyles?.rootStyles
          ? overwriteStyles.rootStyles.backgroundColor
          : '#CDF1F3',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 100,
        width: 'auto',
      }}
    >
      {icon ? (
        <View style={{ marginRight: 4 }}>
          <Icon name={icon} color={overwriteStyles?.iconStyles?.color ?? '#405885'} size={20} />
        </View>
      ) : null}
      <Text variant="smallparagraph">{name}</Text>
    </View>
  );
};
