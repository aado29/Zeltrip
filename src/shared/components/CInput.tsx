/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Animated,
  StyleProp,
  ImageSourcePropType,
} from 'react-native';
// import { MaskedTextInput, MaskedTextInputProps } from 'react-native-mask-text';
import { colors } from '../styles';
import { eye, eyeClosed, alert } from '../staticImgs';

type InputType = 'mask' | 'password' | 'text';

interface CInputProps {
  label?: string;
  style?: StyleProp<any>;
  leftIcon?: ImageSourcePropType;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  message?: string;
  messageColor?: string;
  error?: boolean;
  mask?: string;
  type?: InputType;
  inputStyle?: StyleProp<any>;
  labelStyle?: StyleProp<any>;
}

const getAnimation = (animatedValue: Animated.Value) => ({
  scale: animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1],
  }),
  translateY: animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [14, -12],
  }),
  translateX: animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [12, 12],
  }),
});

const CInput = ({
  style,
  label,
  leftIcon,
  onChangeText,
  placeholder,
  message,
  messageColor = colors.danger,
  error,
  type,
  mask,
  inputStyle,
  labelStyle,
  ...rest
// }: Partial<MaskedTextInputProps> & Partial<TextInput> & CInputProps) => {
}: Partial<TextInput> & CInputProps) => {
  const [animatedValue] = useState(new Animated.Value(0));
  const [isDone, setIsDone] = useState(false);
  const [text, setText] = useState('');
  const [isSecure, setIsSecure] = useState(true);
  const { scale, translateY, translateX } = useMemo(
    () => getAnimation(animatedValue),
    [animatedValue]
  );

  useEffect(() => {
    if (text.length) {
      animatedValue.setValue(1);
    }
  }, [animatedValue, text]);

  const onFocus = () => {
    if (text.length) {
      return;
    }

    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setIsDone(true);
    });
  };

  const onBlur = () => {
    if (text.length) {
      return;
    }

    setIsDone(false);

    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    });
  };

  const handleChangeText = (currentText: string): void => {
    setText(currentText);
    animatedValue.setValue(1);

    if (onChangeText) {
      onChangeText(currentText);
    }
  };

  return (
    <View
      style={[
        {
          borderWidth: 1,
          borderColor: error ? colors.danger : colors.light,
          borderRadius: 8,
          width: '100%',
          marginBottom: 32,
        },
        style,
      ]}
    >
      <Animated.Text
        style={[
          {
            fontSize: 16,
            color: colors.accent,
            backgroundColor: 'white',
            paddingHorizontal: 5,
            position: 'absolute',
            left: -5,
            top: 0,
          },
          labelStyle,
          { transform: [{ scale }, { translateY }, { translateX }] },
        ]}
      >
        {label}
      </Animated.Text>
      {type === 'mask' ? (
        <></>
        // <MaskedTextInput
        //   mask={mask}
        //   onFocus={onFocus}
        //   onBlur={onBlur}
        //   onChangeText={handleChangeText}
        //   style={[{ height: 47, paddingHorizontal: 16 }, inputStyle]}
        //   placeholder={isDone ? placeholder : ''}
        //   {...rest}
        // />
      ) : (
        <TextInput
          onFocus={onFocus}
          onBlur={onBlur}
          onChangeText={handleChangeText}
          style={[{ height: 47, paddingHorizontal: 16 }, inputStyle]}
          secureTextEntry={type === 'password' && isSecure}
          placeholder={isDone ? placeholder : ''}
          {...rest}
        />
      )}
      <Text
        style={[
          {
            fontSize: 12,
            color: messageColor,
            backgroundColor: 'white',
            paddingHorizontal: 0,
            position: 'absolute',
            left: 10,
            bottom: -20,
          },
          labelStyle,
        ]}
      >
        {message}
      </Text>

      {!error && type === 'password' ? (
        <TouchableOpacity
          onPress={() => setIsSecure(!isSecure)}
          style={{ position: 'absolute', right: 0, top: '30%' }}
        >
          <Image source={isSecure ? eye : eyeClosed} style={{ height: 20 }} resizeMode="contain" />
        </TouchableOpacity>
      ) : null}

      {!error && leftIcon ? (
        <View style={{ position: 'absolute', right: 0, top: '30%' }}>
          <Image source={leftIcon} style={{ height: 20 }} resizeMode="contain" />
        </View>
      ) : null}

      {error ? (
        <Image
          source={alert}
          style={{ height: 20, position: 'absolute', right: 10, top: '30%' }}
          resizeMode="contain"
        />
      ) : null}
    </View>
  );
};

export default CInput;
