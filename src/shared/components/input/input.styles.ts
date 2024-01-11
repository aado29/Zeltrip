import { StyleSheet } from 'react-native';
import { Theme } from '../../../theme';
import { InputProps, InputSize } from './input.types';
import { colors } from '../../styles';

const sizes: Record<InputSize, { height: number }> = {
  md: {
    height: 48,
  },
  lg: {
    height: 56,
  },
};

export const getStyles = (
  theme: Theme,
  startIcon: boolean,
  endIcon: boolean,
  error: boolean,
  size: InputProps['size'] = 'md'
) => {
  const height = sizes[size]?.height;

  return StyleSheet.create({
    rootStyles: {
      borderWidth: 1,
      borderColor: error ? colors.danger : theme.colors.gray['100'],
      borderRadius: theme.borderRadius.md,
      width: '100%',
      marginBottom: 16,
    },
    startIconWrapperStyles: {
      position: 'absolute',
      left: 0,
      top: (height - 2) / 2,
      transform: [{ translateY: -12 }],
      marginLeft: 16,
      zIndex: 9999999,
    },
    endIconWrapperStyles: {
      position: 'absolute',
      right: 0,
      top: (height - 2) / 2,
      transform: [{ translateY: -12 }],
      marginRight: 16,
      zIndex: 9999999,
    },
    labelStyles: {
      fontSize: 13,
      color: theme.colors.blue['500'],
      backgroundColor: 'white',
      paddingHorizontal: 0,
      position: 'absolute',
      left: 0,
      top: 0,
    },
    inputStyles: {
      flexDirection: 'row',
      alignItems: 'center',
      height: height - 2,
      paddingHorizontal: 16,
      paddingLeft: startIcon ? 48 : undefined,
      paddingRight: endIcon ? 48 : undefined,
      fontSize: 16,
      color: theme.colors.blue['800'],
    },
    messageStyles: {
      fontSize: 12,
      color: error ? colors.danger : theme.colors.blue['500'],
      backgroundColor: 'white',
      paddingHorizontal: 0,
      position: 'absolute',
      left: 0,
      bottom: -20,
    },
  });
};
