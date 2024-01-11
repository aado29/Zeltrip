import React, { ReactElement, ReactNode } from 'react';
import { StyleProp, Text as ReactText, TextStyle } from 'react-native';
import { useTheme } from '../../theme';

type TextVariant = 'heading' | 'subtile' | 'paragraph' | 'smallparagraph';

interface TextProps {
  children?: string[] | ReactElement | ReactNode;
  variant?: TextVariant;
  color?: string[] | string;
  style?: StyleProp<TextStyle>;
}

const getTextStyle = (variant: TextVariant): StyleProp<TextStyle> =>
  ({
    heading: {
      fontSize: 25,
    } as StyleProp<TextStyle>,
    subtile: {
      fontSize: 20,
    } as StyleProp<TextStyle>,
    paragraph: {
      fontSize: 16,
    } as StyleProp<TextStyle>,
    smallparagraph: {
      fontSize: 13,
    } as StyleProp<TextStyle>,
  }[variant]);

export const Text = ({
  children,
  style,
  variant = 'paragraph',
  color = ['blue', '700'],
}: TextProps): JSX.Element => {
  const theme = useTheme();

  const rawColor: string = Array.isArray(color)
    ? color.reduce((acc, c) => acc[c], theme.colors)
    : color;

  const textStyles = [{ color: rawColor }, getTextStyle(variant), style];

  return <ReactText style={textStyles}>{children}</ReactText>;
};
