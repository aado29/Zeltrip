import React, { useEffect, useState, useMemo } from 'react';
import { StyleSheet, Animated, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface SplashScreenProps {
  onSplashFinished: () => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

const getAnimation = (animatedValue: Animated.Value) => ({
  opacity: animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  }),

  scale: animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [4, 1],
  }),
});

const SplashScreen = ({ onSplashFinished }: SplashScreenProps): JSX.Element => {
  const [animatedValue] = useState(new Animated.Value(0));
  const { scale, opacity } = useMemo(() => getAnimation(animatedValue), [animatedValue]);

  useEffect(() => {
    let timeout: NodeJS.Timer;

    Animated.spring(animatedValue, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start(() => {
      timeout = setTimeout(() => {
        onSplashFinished();
      }, 2000);
    });

    return () => {
      clearTimeout(timeout);
    };
  }, [animatedValue, onSplashFinished]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity, transform: [{ scale }] }}>
        <Svg
          width="93"
          height="113"
          viewBox="0 0 93 113" // Has to be the same of the original svg file
        >
          <Path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M30.312 63a23.01 23.01 0 0 1-6.948-16.507c0-12.765 10.364-23.13 23.129-23.13s23.13 10.365 23.13 23.13A23.01 23.01 0 0 1 62.672 63l-6.214-6.213a14.254 14.254 0 0 0 4.374-10.294c0-7.915-6.425-14.34-14.34-14.34s-14.34 6.425-14.34 14.34c0 4.04 1.675 7.692 4.374 10.294L30.312 63Z"
            fill="#E4017E"
          />
          <Path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="m13.616 79.364 32.874 32.874 32.874-32.874c18.155-18.155 18.155-47.591 0-65.747h-.001c-18.155-18.156-47.59-18.156-65.746 0-18.156 18.156-18.156 47.592 0 65.747Zm45.31 8.008L46.49 74.935 34.053 87.372l-7.843-7.844 20.28-20.28 20.28 20.28-7.843 7.844Zm14.059-14.059L46.49 46.818 19.995 73.313l-.164-.164c-14.723-14.723-14.723-38.593 0-53.317h.001c14.723-14.724 38.593-14.724 53.316 0 14.724 14.724 14.724 38.594 0 53.317l-.163.164Z"
            fill="#232448"
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;
