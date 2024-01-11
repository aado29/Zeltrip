import React, { ReactElement } from 'react';
import { View } from 'react-native';
import { Text } from '../../../../../shared/components/text';

export const HostIndicators = ({
  publication,
  responseRate,
  reviews,
}: {
  reviews: number;
  publication: number;
  responseRate: number;
}): ReactElement => {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#C3CBDA',
        borderRadius: 12,
        paddingVertical: 12,
      }}
    >
      <View style={{ width: '33.333%', alignItems: 'center' }}>
        <Text variant="smallparagraph">Evaluaciones</Text>
        <Text variant="paragraph" style={{ fontWeight: '700' }} color="#222D4B">
          {reviews}
        </Text>
      </View>
      <View
        style={{
          width: '33.333%',
          alignItems: 'center',
          borderLeftWidth: 1,
          borderLeftColor: '#C3CBDA',
        }}
      >
        <Text variant="smallparagraph">Publicaciones</Text>
        <Text variant="paragraph" style={{ fontWeight: '700' }} color="#222D4B">
          {publication}
        </Text>
      </View>
      <View
        style={{
          width: '33.333%',
          alignItems: 'center',
          borderLeftWidth: 1,
          borderLeftColor: '#C3CBDA',
        }}
      >
        <Text variant="smallparagraph">Tasa de respuesta</Text>
        <Text variant="paragraph" style={{ fontWeight: '700' }} color="#222D4B">
          {responseRate}%
        </Text>
      </View>
    </View>
  );
};
