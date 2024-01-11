/* eslint-disable @typescript-eslint/no-explicit-any */
import { View, Text, StyleProp } from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { colors } from '../styles';

interface PointProps {
  message: string;
  style?: StyleProp<any>;
  bold?: boolean;
  icon?: 'controller-record';
  size?: number;
  color?: string;
  textStyle?: StyleProp<any>;
}

const Point = ({
  message,
  style = {},
  bold = false,
  icon = 'controller-record',
  size = 16,
  color = colors.danger,
  textStyle = {},
}: PointProps): JSX.Element => {
  return (
    <View
      style={[
        { flexDirection: 'row', marginHorizontal: 20, marginBottom: 5, alignItems: 'center' },
        style,
      ]}
    >
      <Entypo name={icon} size={size} color={color} style={{ marginHorizontal: 5 }} />
      <Text style={[{ fontWeight: bold ? 'bold' : null }, textStyle]}>{message}</Text>
    </View>
  );
};

export default Point;
