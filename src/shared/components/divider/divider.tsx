import React, { ReactElement } from 'react';
import { View } from 'react-native';

export const Divider = (): ReactElement => {
  return (
    <View
      style={{
        borderBottomWidth: 4,
        borderBottomColor: '#CFCFE2',
        opacity: 0.4,
        marginVertical: 8,
      }}
    />
  );
};
