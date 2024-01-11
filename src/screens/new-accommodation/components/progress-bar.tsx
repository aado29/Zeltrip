import React, { ReactElement } from 'react';
import { View } from 'react-native';
import { useTheme } from '../../../theme';

interface ProgressBarProps {
  steps: number;
  step: number;
}

export const ProgressBar = ({ steps, step }: ProgressBarProps): ReactElement => {
  const { colors } = useTheme();

  return (
    <View style={{ height: 4, width: '100%', backgroundColor: colors.gray['300'] }}>
      <View
        style={{
          height: '100%',
          width: `${step !== 0 ? Math.round((step * 100) / steps) : 0}%`,
          backgroundColor: colors.pink['450'],
          borderTopRightRadius: 2,
          borderBottomRightRadius: 2,
        }}
      />
    </View>
  );
};
