import { AuthNavigationProp } from '@/config/navigation/type';
import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';

// import Swiper from 'react-native-swiper';
import { colors } from '../../shared/styles';
import { Slide1, Slide2, Slide3 } from './slides';

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  wrapper: {
    backgroundColor: 'white',
    height: '100%',
  },
  slide: {
    height: '100%',
  },
  slideBackgroundImage: {
    width: '100%',
    height: '60%',
    flex: 1,
  },
  paginationStyle: {
    bottom: 160,
  },
  activeDotStyle: {},
});

const WizardScreen = ({ navigation }: { navigation: AuthNavigationProp }): JSX.Element => {
  const swiper = useRef<Swiper>(null);

  const handleSkip = () => {
    navigation.navigate('Register');
  };

  const handleNext = (index: number): void => {
    swiper?.current?.scrollBy(index);
  };

  return (
    // <Swiper
    //   ref={swiper}
    //   loadMinimal
    //   style={styles.wrapper}
    //   paginationStyle={styles.paginationStyle}
    //   autoplay={false}
    //   loop={false}
    //   dotColor={colors.secondary}
    //   activeDotStyle={styles.activeDotStyle}
    //   activeDotColor="white"
    // >
    //   <Slide1 onNext={handleNext} onSkip={handleSkip} />
    //   <Slide2 onNext={handleNext} onSkip={handleSkip} />
      <Slide3 onSkip={handleSkip} />
    // </Swiper>
  );
};

export default WizardScreen;
