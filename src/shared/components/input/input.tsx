/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Animated,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
// import { MaskedTextInput } from 'react-native-mask-text';
import { eye, eyeClosed, alert } from '../../staticImgs';
import { Icon } from '../icons';
import { useTheme } from '../../../theme';
import { InputProps, InputSize } from './input.types';
import { getStyles } from './input.styles';

const getHours = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours} : ${minutes}`;
};

const InputTime = ({
  value,
  style,
  onChange,
}: {
  value?: string;
  style?: StyleProp<ViewStyle> & StyleProp<TextStyle>;
  onChange: (hours: string) => void;
}): ReactElement => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = (): void => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = (): void => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date): void => {
    onChange(getHours(date));
    hideDatePicker();
  };

  return (
    <>
      <TouchableOpacity onPress={showDatePicker}>
        <View style={style}>
          <Text
            numberOfLines={1}
            style={
              Array.isArray(style)
                ? [
                    ...style,
                    {
                      paddingHorizontal: 0,
                      height: 'auto',
                    },
                  ]
                : style
            }
          >
            {value}
          </Text>
        </View>
      </TouchableOpacity>
      {/* <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      /> */}
    </>
  );
};

const getAnimation = (
  animatedValue: Animated.Value,
  hasIcon: boolean,
  multiline: boolean,
  size: InputSize = 'md'
) => {
  // eslint-disable-next-line no-nested-ternary
  const initialXTranslation = hasIcon ? 40 : multiline ? 30 : 16;

  return {
    scale: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1.2, 1],
    }),
    translateY: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [size === 'lg' ? 16 : 13, -10],
    }),
    translateX: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [initialXTranslation, 12],
    }),
  };
};

export const Input = ({
  overwriteStyles,
  label,
  startIcon,
  endIcon,
  leftIcon,
  onChangeText,
  placeholder,
  message,
  error = false,
  type = 'text',
  size,
  mask,
  ...restProps
}: InputProps) => {
  const [animatedValue] = useState(new Animated.Value(0));
  const [isAnimationDone, setIsAnimationDone] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [text, setText] = useState(restProps.value ?? '');
  const [isSecure, setIsSecure] = useState(true);
  const theme = useTheme();

  const {
    rootStyles,
    startIconWrapperStyles,
    endIconWrapperStyles,
    labelStyles,
    inputStyles,
    messageStyles,
  } = getStyles(theme, !!startIcon, !!endIcon, error, size);

  const { scale, translateY, translateX } = useMemo(
    () => getAnimation(animatedValue, !!startIcon, !!restProps.multiline, size),
    [animatedValue, startIcon, size, restProps]
  );

  const handleChangeText = useCallback(
    (currentText: string): void => {
      setText(currentText);

      if (onChangeText) {
        onChangeText(currentText);
      }
    },
    [onChangeText]
  );

  const focusInput = useCallback(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setIsAnimationDone(true);
    });
  }, [animatedValue]);

  const blurInput = useCallback(() => {
    if (text !== '') {
      return;
    }

    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setIsAnimationDone(false);
    });
  }, [animatedValue, text]);

  const handleFocus = () => {
    setIsInputFocused(true);
    focusInput();
  };

  const handleBlur = () => {
    setIsInputFocused(false);
    blurInput();
  };

  useEffect(() => {
    if (text !== '') {
      focusInput();
    } else if (!isInputFocused) {
      blurInput();
    }
  }, [text, isInputFocused, focusInput, blurInput]);

  useEffect(() => {
    const value = restProps.value ?? '';
    handleChangeText(value, value);
  }, [restProps.value, handleChangeText]);

  return (
    <View style={[rootStyles, overwriteStyles?.rootStyles]}>
      {startIcon ? (
        <View style={startIconWrapperStyles}>
          <Icon name={startIcon} size={24} />
        </View>
      ) : null}

      {label ? (
        <Animated.Text
          style={[
            labelStyles,
            overwriteStyles?.labelStyles,
            { transform: [{ scale }, { translateY }, { translateX }] },
          ]}
        >
          {label}
        </Animated.Text>
      ) : null}
      {type === 'time' ? (
        <InputTime
          style={[inputStyles, overwriteStyles?.inputStyles]}
          onChange={handleChangeText}
          {...restProps}
        />
      ) : null}
      {['mask', 'custom', 'currency'].includes(type) ? (
        <></>
        // <MaskedTextInput
        //   mask={mask}
        //   onFocus={handleFocus}
        //   onBlur={handleBlur}
        //   onChangeText={handleChangeText}
        //   style={[inputStyles, overwriteStyles?.inputStyles]}
        //   placeholder={isAnimationDone ? placeholder : ''}
        //   {...restProps}
        // />
      ) : null}
      {!['mask', 'custom', 'currency', 'time'].includes(type) ? (
        <TextInput
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={handleChangeText}
          style={[inputStyles, overwriteStyles?.inputStyles]}
          secureTextEntry={type === 'password' && isSecure}
          placeholder={isAnimationDone ? placeholder : ''}
          {...restProps}
        />
      ) : null}
      <Text style={[messageStyles, overwriteStyles?.messageStyles]}>{message}</Text>

      {endIcon ? (
        <View style={endIconWrapperStyles}>
          <Icon name={endIcon} size={24} />
        </View>
      ) : null}

      {!error && type === 'password' ? (
        <TouchableOpacity
          onPress={() => setIsSecure(!isSecure)}
          style={{ position: 'absolute', right: 0, top: '30%' }}
        >
          <Image source={isSecure ? eye : eyeClosed} style={{ height: 20 }} resizeMode="contain" />
        </TouchableOpacity>
      ) : null}

      {!error && leftIcon ? (
        <TouchableOpacity style={{ position: 'absolute', right: 0, top: '30%' }}>
          {leftIcon && <Image source={leftIcon} style={{ height: 20 }} resizeMode="contain" />}
        </TouchableOpacity>
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
