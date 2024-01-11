import React, { ReactElement } from 'react';
import { View } from 'react-native';
import { Icon, IconName } from '../../../../../shared/components/icons';
import { Text } from '../../../../../shared/components/text';

export const List = ({
  items,
  title,
}: {
  title: string;
  items: { icon?: IconName; title: string; subtitle?: string }[];
}): ReactElement => {
  return (
    <View style={{ paddingHorizontal: 16 }}>
      <Text variant="paragraph" color="#222D4B" style={{ fontWeight: '700', marginBottom: 16 }}>
        {title}
      </Text>

      {items.map(({ icon, title: name, subtitle }) => (
        <View
          key={`${icon}-${name}`}
          style={{ alignItems: 'center', flexDirection: 'row', minHeight: 56, paddingVertical: 12 }}
        >
          {icon ? (
            <View style={{ marginRight: 12 }}>
              <Icon name={icon} />
            </View>
          ) : null}
          <View style={{ flexShrink: 1 }}>
            <Text variant="paragraph" style={{ fontWeight: '700' }} color="#222D4B">
              {name}
            </Text>
            {subtitle ? (
              <Text variant="smallparagraph" color="#222D4B">
                {subtitle}
              </Text>
            ) : null}
          </View>
        </View>
      ))}
    </View>
  );
};
