import React, { ReactElement } from 'react';
import { Dimensions, View } from 'react-native';
import { Text } from '../../../../../shared/components/text';
import { Icon, IconName } from '../../../../../shared/components/icons';

const deviceWidth = Dimensions.get('screen').width;

export const BoxWrapper = ({
  children,
  title,
}: {
  title: string;
  children: ReactElement[] | ReactElement;
}): ReactElement => {
  return (
    <>
      <Text
        variant="paragraph"
        style={{ fontWeight: '700', marginBottom: 16, paddingHorizontal: 16 }}
      >
        {title}
      </Text>
      <View
        style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8, paddingHorizontal: 8 }}
      >
        {children}
      </View>
    </>
  );
};

export const Box = ({
  content,
  icon,
  title,
}: {
  icon?: IconName;
  title?: string;
  content: string | number;
}): ReactElement => {
  return (
    <View style={{ width: deviceWidth / 2 - 8, paddingHorizontal: 8, marginBottom: 16 }}>
      <View
        style={{
          borderWidth: 1,
          borderColor: '#C3CBDA',
          borderRadius: 8,
          padding: 8,
        }}
      >
        {icon && (
          <View style={{ marginBottom: 4 }}>
            <Icon name={icon} color="#405885" />
          </View>
        )}
        {title ? <Text variant="smallparagraph">{title}</Text> : null}
        <Text variant="paragraph" style={{ fontWeight: '700' }} color="#222D4B">
          {content}
        </Text>
      </View>
    </View>
  );
};
