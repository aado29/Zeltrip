import React, { ReactElement } from 'react';
import { View } from 'react-native';

export const Divider = ({ size = 'md' }: { size?: 'md' | 'lg' }): ReactElement => {
  const styles = {
    md: { borderBottomWidth: 1, borderColor: '#CFCFE2', marginVertical: 24 },
    lg: { borderBottomWidth: 4, borderColor: '#C3CBDA', marginVertical: 24, opacity: 0.4 },
  }[size];

  return <View style={styles} />;
};
