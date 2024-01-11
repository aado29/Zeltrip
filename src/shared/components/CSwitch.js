import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors } from '../styles';
import { Switch } from './switch';
// import { Switch } from 'react-native-paper';

const CSwitch = ({ label, checked, position = 'right', onPress, error, style, textStyle, }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 47, borderColor: error ? colors.danger : colors.accent, borderRadius: 8, width: '90%' }, style]}>
      <Text style={[{ fontSize: 16, color: colors.accent }, textStyle]}>{label}</Text>
      <Switch value={checked} onValueChange={onPress} color={colors.primary} thumbColor={checked ? colors.primary : '#DBC6D1'} />
    </TouchableOpacity>
  );
};

export default CSwitch;


