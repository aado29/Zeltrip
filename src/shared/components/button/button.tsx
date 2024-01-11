/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement } from 'react';
import { Text, TouchableOpacity, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Theme, useTheme } from '../../../theme';

type KindButton = 'transparent' | 'primary' | 'secondary' | 'outline';
type SizeButton = 'small' | 'medium' | 'large';

interface ButtonProps {
  onPress?: () => void;
  kind?: KindButton;
  size?: SizeButton;
  children: string | ReactElement;
  rootStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  startEnhancer?: ReactElement;
}

const getRootStyles = (theme: Theme, kind: KindButton, isDisabled = false): StyleProp<ViewStyle> =>
  ({
    transparent: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    } as StyleProp<ViewStyle>,
    primary: {
      backgroundColor: !isDisabled ? theme.colors.pink['500'] : theme.colors.gray['250'],
      borderColor: !isDisabled ? theme.colors.pink['500'] : theme.colors.gray['250'],
    } as StyleProp<ViewStyle>,
    secondary: {
      backgroundColor: theme.colors.white,
      borderColor: theme.colors.white,
    } as StyleProp<ViewStyle>,
    outline: {
      backgroundColor: 'transparent',
      borderColor: theme.colors.blue[500],
    } as StyleProp<ViewStyle>,
  }[kind]);

const getTextStyles = (theme: Theme, kind: KindButton, isDisabled = false): StyleProp<ViewStyle> =>
  ({
    transparent: {
      color: theme.colors.white,
    } as StyleProp<ViewStyle>,
    primary: {
      color: !isDisabled ? theme.colors.white : theme.colors.blue['600'],
    } as StyleProp<ViewStyle>,
    secondary: {
      color: theme.colors.blue[700],
    } as StyleProp<ViewStyle>,
    outline: {
      color: theme.colors.blue[500],
    } as StyleProp<ViewStyle>,
  }[kind]);

const buttonSizes: Record<SizeButton, StyleProp<ViewStyle>> = {
  small: {
    height: 36,
    paddingHorizontal: 4,
  },
  medium: {
    height: 48,
    paddingHorizontal: 6,
  },
  large: {
    height: 56,
    paddingHorizontal: 8,
  },
};

export const Button = ({
  onPress,
  kind = 'primary',
  size = 'medium',
  children,
  rootStyle,
  textStyle,
  disabled,
  startEnhancer,
}: ButtonProps): JSX.Element => {
  const theme = useTheme();

  const buttonStyles: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: theme.borderRadius.md,
      borderWidth: 1,
    },
    buttonSizes[size],
    getRootStyles(theme, kind, disabled),
  ];

  const textButtonStyles: StyleProp<TextStyle> = [
    {
      color: 'white',
      fontSize: 16,
      paddingHorizontal: 10,
    },
    getTextStyles(theme, kind, disabled),
  ];

  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyles, rootStyle]} disabled={disabled}>
      {startEnhancer}
      {typeof children === 'string' ? (
        <Text style={[textButtonStyles, textStyle]}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};
