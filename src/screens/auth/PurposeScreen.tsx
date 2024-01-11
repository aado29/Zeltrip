import { View, Text, Image, ImageBackground, ScrollView, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../../shared/styles';
import CButton from '../../shared/components/CButton';
import { purposeBg, info } from '../../shared/staticImgs';
// import CCheckbox from '../../shared/components/CCheckbox';
import CSwitch from '../../shared/components/CSwitch';
import Store from '../../services/store';

const PurposeScreen = () => {
  const [purpose, setPurpose] = useState('arrendatario');
  const [isNotification, setIsNotification] = useState(false);

  const onSubmit = async () => {
    const user = Store.getUser();
    console.log('update', user);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView
        contentContainerStyle={{ backgroundColor: 'white', justifyContent: 'space-between' }}
      >
        <View>
          <ImageBackground
            source={purposeBg}
            style={{
              height: 250,
              width: '100%',
              overflow: 'hidden',
              borderBottomLeftRadius: 12,
              borderBottomRightRadius: 12,
            }}
          />
          <View
            style={{
              width: '80%',
              justifyContent: 'center',
              marginHorizontal: 20,
              marginVertical: 14,
            }}
          >
            <Text
              style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 24, color: colors.accent }}
            >
              Antes de comenzar, ¿Qué te gustaria hacer en Zeltrip?
            </Text>
          </View>
          {/* <CCheckbox
            label="Sólo arrendar alojamientos"
            checked={purpose === 'arrendatario'}
            onPress={() => setPurpose('arrendatario')}
            style={{ alignSelf: 'center', marginBottom: 14 }}
          />
          <CCheckbox
            label="Quiero ofrecer alojamientos"
            checked={purpose === 'arrendador'}
            onPress={() => setPurpose('arrendador')}
            style={{ alignSelf: 'center', marginBottom: 14 }}
          /> */}
        </View>
        <View style={{ borderTopWidth: 2, borderColor: colors.light, padding: 16 }}>
          {/* <CSwitch
            label="¿Quieres activar las notificaciones?"
            checked={isNotification}
            onPress={() => setIsNotification(!isNotification)}
            style={{ alignSelf: 'center', marginVertical: 20 }}
          /> */}
          <View style={{ flexDirection: 'row', width: '80%', marginBottom: 24 }}>
            <Image source={info} resizeMode="contain" style={{ height: 30, marginTop: 5 }} />
            <Text style={{ color: colors.accent, fontSize: 16 }}>
              Al activar notificaciones recibiras información importante como detalles del proceso
              de llegada o la actividad de tu cuenta.
            </Text>
          </View>
          <CButton
            title="Finalizar"
            onPress={onSubmit}
            style={{ alignSelf: 'center', marginBottom: 10, width: '100%' }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PurposeScreen;
