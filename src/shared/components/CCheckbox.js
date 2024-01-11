import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors } from '../styles';
// import { RadioButton } from 'react-native-paper';

const CCheckbox = ({ label, checked, onPress, error, style, textStyle, }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[{ flexDirection: 'row', alignItems: 'center', height: 47, borderWidth: checked ? 0.6 : 0, borderColor: error ? colors.danger : colors.accent, borderRadius: 8, width: '90%' }, style]}>
            {/* <RadioButton
                value="checked"
                color={colors.primary}
                uncheckedColor={colors.secondary}
                status={checked ? 'checked' : 'unchecked'}
                onPress={onPress}
            /> */}
            <Text style={[{ fontSize: 16, color: colors.accent }, textStyle]}>{label}</Text>
        </TouchableOpacity>
    );
};

export default CCheckbox;
