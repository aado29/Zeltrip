import { View } from 'react-native';
import React, { ReactElement } from 'react';
import { Text } from '../../../../../shared/components/text';

export const MainBox = ({
  cancellationType,
  serviceType,
}: {
  cancellationType: string;
  serviceType: string;
}): ReactElement => {
  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#CFCFE2',
        borderRadius: 12,
        height: 60,
      }}
    >
      <View
        style={{
          width: '50%',
          alignItems: 'center',
          borderRightWidth: 1,
          borderRightColor: '#C3CBDA',
        }}
      >
        <Text variant="smallparagraph">Privacidad del sitio</Text>
        <Text variant="paragraph" style={{ fontWeight: '700' }}>
          {serviceType}
        </Text>
      </View>
      <View style={{ width: '50%', alignItems: 'center' }}>
        <Text variant="smallparagraph">Tipo de cancelación</Text>
        <Text variant="paragraph" style={{ fontWeight: '700' }}>
          {cancellationType}
        </Text>
      </View>
    </View>
  );
};
