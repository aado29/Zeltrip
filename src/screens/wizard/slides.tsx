import React from 'react';
import { View, Text, ImageBackground, Image, StyleSheet } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
import { slide1, slide2, slide3, badge1, badge2, badge3, badge4 } from '../../shared/staticImgs';
import CButton from '../../shared/components/CButton';

interface SlideProp {
  onNext: (index: number) => void;
  onSkip: () => void;
}

const firstSlideStyles = StyleSheet.create({
  slideBackgroundImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 16,
  },

  subTitle: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 54,
    fontSize: 16,
  },

  paragraph: {
    color: 'white',
    fontSize: 16,
  },
  btnGhost: {
    marginVertical: 5,
    backgroundColor: 'transparent',
    marginBottom: 30,
  },
  linGrad: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
});

const SecondSlideStyles = StyleSheet.create({
  slideBackgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '90%',
    alignItems: 'center',
    flex: 1,
  },
  linGrad: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  paragraph: {
    color: 'white',
    textAlign: 'center',
    marginHorizontal: 20,
    fontSize: 16,
    marginBottom: 54,
  },

  badge: {
    width: 50,
    margin: 5,
  },
  btnGhost: {
    marginVertical: 5,
    backgroundColor: 'transparent',
    marginBottom: 30,
  },
});

const thirdSlideStyles = StyleSheet.create({
  slideBackgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '90%',
    alignItems: 'center',
    flex: 1,
  },
  contentMain: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  linGrad: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  paragraph: {
    color: 'white',
    textAlign: 'center',
    marginHorizontal: 20,
    fontSize: 16,
    marginBottom: 54,
  },

  badge: {
    width: 50,
    margin: 5,
  },
  btnGhost: {
    marginVertical: 5,
    backgroundColor: 'transparent',
    marginBottom: 30,
  },
});

export const Slide1 = ({ onNext, onSkip }: SlideProp) => {
  return (
    <ImageBackground source={slide1} style={[firstSlideStyles.slideBackgroundImage]}>
      {/* <LinearGradient colors={['transparent', 'black']} style={firstSlideStyles.linGrad} /> */}
      <View
        style={{
          alignItems: 'center',
          width: '100%',
          paddingLeft: 16,
          paddingRight: 16,
        }}
      >
        <Text style={firstSlideStyles.title}>¡Hola!</Text>
        <Text style={firstSlideStyles.paragraph}>Ahora estás en Zeltrip</Text>
        <Text style={firstSlideStyles.subTitle}>¿Qué puedes hacer?</Text>
        <CButton
          title="Siguiente"
          onPress={onNext ? (): void => onNext(1) : undefined}
          style={{ marginBottom: 10, width: '100%' }}
        />
        <CButton title="Saltar" onPress={onSkip} style={firstSlideStyles.btnGhost} />
      </View>
    </ImageBackground>
  );
};

export const Slide2 = ({ onNext, onSkip }: SlideProp) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <ImageBackground source={slide2} style={SecondSlideStyles.slideBackgroundImage} />
      {/* <LinearGradient colors={['transparent', 'black']} style={SecondSlideStyles.linGrad} /> */}
      <View
        style={{
          flex: 1,
          width: '100%',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingLeft: 16,
          paddingRight: 16,
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <Image source={badge1} style={SecondSlideStyles.badge} resizeMode="contain" />
          <Image source={badge2} style={SecondSlideStyles.badge} resizeMode="contain" />
          <Image source={badge3} style={SecondSlideStyles.badge} resizeMode="contain" />
        </View>
        <Text style={[SecondSlideStyles.title]}>Buscar Camping, Glamping y Sitios RV</Text>
        <Text style={SecondSlideStyles.paragraph}>
          En Zeltrip podrás buscar tu destino y alojamiento favorito para que puedas conectarte con
          la naturaleza
        </Text>
        <CButton
          title="Siguiente"
          onPress={onNext ? (): void => onNext(1) : undefined}
          style={{ alignSelf: 'center', marginBottom: 10, width: '100%' }}
        />
        <CButton title="Saltar" onPress={onSkip} style={SecondSlideStyles.btnGhost} />
      </View>
    </View>
  );
};

export const Slide3 = ({ onSkip }: Partial<SlideProp>) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <ImageBackground source={slide3} style={thirdSlideStyles.slideBackgroundImage} />
      {/* <LinearGradient colors={['transparent', 'black']} style={thirdSlideStyles.linGrad} /> */}
      <View style={[thirdSlideStyles.contentMain, { paddingLeft: 16, paddingRight: 16 }]}>
        <View style={{ flexDirection: 'row' }}>
          <Image source={badge4} style={thirdSlideStyles.badge} resizeMode="contain" />
        </View>
        <Text style={[thirdSlideStyles.title]}>Publicar alojamientos</Text>
        <Text style={thirdSlideStyles.paragraph}>
          Además podrás publicar tus alojamientos o sitios para arrendar como Glamping, Camping y
          Sitios RV.
        </Text>
        <CButton title="¡Conéctate con la naturaleza!" onPress={onSkip} style={{ width: '100%' }} />
        <CButton title="" style={thirdSlideStyles.btnGhost} />
      </View>
    </View>
  );
};
