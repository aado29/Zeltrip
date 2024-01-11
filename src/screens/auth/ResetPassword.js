import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../../shared/styles';
import CButton from '../../shared/components/CButton';
import CInput from '../../shared/components/CInput';

const ResetPassword = () => {
    useEffect(() => {
        navigation.setOptions({
            title: '',
            // headerLeft: () => <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 20 }}><AntDesign name="left" size={18} color="black" /></TouchableOpacity>,
        });

        return () => {
        };
    }, [navigation]);

    return (
        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'space-between' }} >
            <View >
                <View style={{ width: '90%', justifyContent: 'center', marginHorizontal: 20 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 24, color: colors.accent, textAlign: 'justify' }}>Restablecer contraseña</Text>
                </View>
                <CInput label='Contraseña' type="password" placeholder="*************" style={{ marginBottom: 32, alignSelf: 'center' }} />
                <CInput label='Repetir contraseña' type="password" placeholder="*************" style={{ marginBottom: 32, alignSelf: 'center' }} />
            </View>
            <CButton title="Enviar correo" style={{ alignSelf: "center" }} />
        </View>
    );
};

export default ResetPassword;
