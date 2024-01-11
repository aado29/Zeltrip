import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../../shared/styles';
import CButton from '../../shared/components/CButton';
import CInput from '../../shared/components/CInput';

const ForgotPassword = ({ navigation }) => {
    useEffect(() => {
        navigation.setOptions({
            title: '',
            headerLeft: () => <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 20 }}><AntDesign name="left" size={18} color="black" /></TouchableOpacity>,
        });

        return () => {
        };
    }, [navigation]);

    return (
        <View style={{ flex: 1, padding: 16, backgroundColor: 'white', justifyContent: 'space-between' }} >
            <View >
                <View style={{ width: '100%', justifyContent: 'center', marginHorizontal: 0 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 24, color: colors.accent, textAlign: 'left' }}>Olvidé mi contraseña</Text>
                </View>
                <CInput label='Correo electrónico' placeholder="micorreo@correo.com" style={{ marginBottom: 32, alignSelf: 'center' }} />
            </View>
            <CButton title="Enviar correo" style={{ alignSelf: "stretch" }} />
        </View>
    );
};

export default ForgotPassword;
