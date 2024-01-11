import React, { ReactElement } from 'react';
import { View } from 'react-native';
import { Icon } from '../../../../../shared/components/icons';
import { Text } from '../../../../../shared/components/text';

export const Rating = ({ rating, reviews }: { rating: number; reviews: number }): ReactElement => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 4,
      }}
    >
      <Icon name="start" color="#ABAE08" size={20} />
      <Text variant="paragraph" style={{ fontWeight: '700', marginLeft: 4 }}>
        {rating.toFixed(1)}
      </Text>
      <Text variant="paragraph">({reviews} reseñas)</Text>
    </View>
  );
};
